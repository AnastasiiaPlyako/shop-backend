import * as AWS from 'aws-sdk';

import { createFullProducts } from '@functions/utils';
import { middyfy } from '@libs/lambda';
import { ValidatedEventAPIGatewayProxyEvent, formatJSONResponse } from '@libs/api-gateway';
import { formatInternalError } from '@error/index';
import schema from './schema';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    try {
        console.log(event);
        const dynamo = new AWS.DynamoDB.DocumentClient();

        // todo - another way to make join
        const scanResultProduct = await dynamo.scan({
            TableName: process.env.TABLE_NAME
        }).promise();

        const scanResultStock = await dynamo.scan({
            TableName: process.env.TABLE_NAME_QUANTITY,
        }).promise();

        const fullInfoProducts = createFullProducts(scanResultProduct.Items, scanResultStock.Items);
        return formatJSONResponse(fullInfoProducts);
    } catch (e) {
        return formatInternalError();
    }
};

export const main = middyfy(getProductsList);
