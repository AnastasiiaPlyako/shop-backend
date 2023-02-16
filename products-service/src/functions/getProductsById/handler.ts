import * as AWS from 'aws-sdk';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatInternalError, formatJSONResponse, formatNotFoundError, TResponseProduct } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { createFullProducts } from '@functions/utils';

import schema from './schema';

const dynamo = new AWS.DynamoDB.DocumentClient();

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    try {
        console.log(event);
        if (event.pathParameters && event.pathParameters.productId) {
            const {productId} = event.pathParameters;

            const queryResultProduct = await dynamo.query({
                TableName: process.env.TABLE_NAME,
                KeyConditionExpression: 'id = :id',
                ExpressionAttributeValues: {':id': productId}
            }).promise();

            const queryResultStock = await dynamo.query({
                TableName: process.env.TABLE_NAME_QUANTITY,
                KeyConditionExpression: 'product_id = :product_id',
                ExpressionAttributeValues: {':product_id': productId}
            }).promise();

            if (!queryResultProduct.Items.length) {
                return formatNotFoundError('This product not found')
            }

            const fullInfoProducts = createFullProducts(queryResultProduct.Items, queryResultStock.Items);
            return formatJSONResponse(fullInfoProducts as TResponseProduct[]);
        }
    } catch (e) {
        return formatInternalError();
    }
};

export const main = middyfy(getProductsById);
