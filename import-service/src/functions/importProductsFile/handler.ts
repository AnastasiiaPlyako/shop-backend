import * as AWS from 'aws-sdk';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { CONTENT_TYPE, EXPIRES, TYPE_OPERATION, UPLOADED_PATH } from "@functions/importProductsFile/const";
import { formatInternalError } from '@error/index';

import schema from './schema';

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    const s3 = new AWS.S3({ region: process.env.REGION });
    const bucketName = process.env.BUCKET;
    try {
        const { name } = event.queryStringParameters;
        const params = {
            Bucket: bucketName,
            Key: UPLOADED_PATH + name,
            Expires: EXPIRES,
            ContentType: CONTENT_TYPE
        }
        const result = s3.getSignedUrl(TYPE_OPERATION, params);
        return formatJSONResponse(result)
    } catch (e) {
      return formatInternalError();
    }
};

export const main = middyfy(importProductsFile);
