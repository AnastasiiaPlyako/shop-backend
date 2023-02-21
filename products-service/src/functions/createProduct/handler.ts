import * as AWS from 'aws-sdk';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { TResponseProduct, formatJSONResponse } from '@libs/api-gateway';
import { formatBadRequest, formatInternalError } from '@error/index';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const dynamo = new AWS.DynamoDB.DocumentClient();

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    try {
        console.log(event);
        try {
            await dynamo.put({
                TableName: process.env.TABLE_NAME,
                Item: event.body,
            }).promise();
            return formatJSONResponse([event.body as TResponseProduct]);
        } catch (e) {
            return formatBadRequest();
        }
    } catch (e) {
        return formatInternalError();
    }
};

export const main = middyfy(createProduct);
