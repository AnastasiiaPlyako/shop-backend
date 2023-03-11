import * as AWS from 'aws-sdk';

import { middyfy } from '@libs/lambda';
import { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatInternalError } from '@error/index';
import schema from './schema';

const catalogBatchProcess: ValidatedEventAPIGatewayProxyEvent <typeof schema> = async (event) => {
    try {
        if (event?.Records?.length) {
            const data = event?.Records?.map(({ body }) => body);
            const sns = new AWS.SNS({
                region: 'eu-west-1'
            })
            const params = {
                Message: data.join(', \n'),
                TopicArn: process.env.SNS_ARN
            };
            await sns.publish(params).promise()
        }
    } catch (e) {
        return formatInternalError();
    }
};

export const main = middyfy(catalogBatchProcess);
