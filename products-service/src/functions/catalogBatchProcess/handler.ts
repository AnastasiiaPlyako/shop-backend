import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

import { formatInternalError } from '@error/index';

const catalogBatchProcess = async (event) => {
    try {
        if (event?.Records?.length) {
            const data = event?.Records?.map(({ body }) => body);
            const sns = new SNSClient({ region: 'eu-west-1' });
            const params = {
                Message: data.join(', \n'),
                TopicArn: process.env.SNS_ARN
            };
            await sns.send(new PublishCommand (params));
        }
    } catch (e) {
        return formatInternalError();
    }
};

export const main = catalogBatchProcess;
