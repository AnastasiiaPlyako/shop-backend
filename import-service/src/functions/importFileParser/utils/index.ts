import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { formatInternalError } from '@error/index';

export const sendMessageSQS = async (products) => {
    try {
        const sqs = new SQSClient({ region: "eu-west-1" });
        const command = new SendMessageCommand({
            QueueUrl: process.env.SQS_URL,
            MessageBody: JSON.stringify(products),
        })
        await sqs.send(command);
    } catch (e) {
        return formatInternalError();
    }
}