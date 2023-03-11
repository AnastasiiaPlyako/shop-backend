import * as AWS from 'aws-sdk';

import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {formatJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';
import {formatInternalError} from '@error/index';

import schema from './schema';
import { sendMessageSQS } from './utils/index';
import csv from "csv-parser";

const importFileParser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    try {
        const s3 = new AWS.S3({region: process.env.REGION});
        const bucketName = process.env.BUCKET;
        for (const record of event.Records) {
            const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));
            const params = {
                Bucket: bucketName,
                Key: key
            }
            const s3Stream = s3.getObject(params).createReadStream();
            await s3Stream
                .pipe(csv())
                .on('data', async (data) => {
                    await sendMessageSQS(data);
                })
                .on('error', (e) => {
                    console.log(e);
                })
            await s3.copyObject({
                Bucket: bucketName,
                CopySource: bucketName + '/' + record.s3.object.key,
                Key: record.s3.object.key.replace('uploaded', 'parsed')
            }).promise();

            await s3
                .deleteObject({ Bucket: bucketName, Key: key })
                .promise();
        }
        return formatJSONResponse();
    } catch (e) {
        return formatInternalError();
    }
};

export const main = middyfy(importFileParser);
