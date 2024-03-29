import type { AWS } from '@serverless/typescript';

import getProductsList from '@functions/getProductsList';
import getProductsById from '@functions/getProductsById';
import createProduct from '@functions/createProduct';
import catalogBatchProcess from "@functions/catalogBatchProcess";

const serverlessConfiguration: AWS = {
    service: 'products-service',
    useDotenv: true,
    frameworkVersion: '3',
    plugins: ['serverless-auto-swagger', 'serverless-esbuild'],
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        region: 'eu-west-1',
        stage: 'dev',
        profile: 'anastasia',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
            TABLE_NAME: '${env:TABLE_NAME}',
            TABLE_NAME_QUANTITY: '${env:TABLE_NAME_QUANTITY}',
            SQS_URL: { 'Ref': 'SQSQueue' },
            SNS_ARN: { 'Ref': 'SNSTopic' }
        },
        iamRoleStatements: [
            {
                Effect: 'Allow',
                Action: ['sqs: *'],
                Resource: [{ "Fn::GetAtt": [ "SQSQueue", "Arn" ] }]
            },
            {
                Effect: 'Allow',
                Action: ['sns: *', 'sns:Publish'],
                Resource:  { 'Ref': 'SNSTopic' }
            }
        ]
    },
    resources: {
        Resources: {
            SQSQueue: {
                Type: "AWS::SQS::Queue",
                Properties: { QueueName: 'catalogItemsQueue' }
            },
            SNSTopic: {
                Type: "AWS::SNS::Topic",
                Properties: { TopicName: 'catalogItemsSNSTopic', DisplayName: 'catalogItemsSNSTopic' }
            },
            SNSSubscription: {
                Type: "AWS::SNS::Subscription",
                Properties: {
                    Endpoint: 'anastasia_plyako@epam.com',
                    Protocol: 'email',
                    TopicArn: { 'Ref': 'SNSTopic' }
                }
            }
        }
    },
    functions: { getProductsList, getProductsById, createProduct, catalogBatchProcess },
    package: { individually: true },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node14',
            define: {'require.resolve': undefined},
            platform: 'node',
            concurrency: 10,
        },
    },
};

module.exports = serverlessConfiguration;
