import type {AWS} from '@serverless/typescript';

import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';

const serverlessConfiguration: AWS = {
    service: 'import-service',
    frameworkVersion: '3',
    useDotenv: true,
    plugins: ['serverless-esbuild'],
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        region: 'eu-west-1',
        stage: 'dev',
        profile: 'anastasia',
        iamRoleStatements: [{
            Action: ['s3:ListBucket', 's3:GetObject', 's3:PutObject',  's3:PutObjectAcl', 's3:DeleteObject', 's3:*',],
            Effect: 'Allow',
            Resource: ['arn:aws:s3:::node-aws-s3-plyako', 'arn:aws:s3:::node-aws-s3-plyako/*'],
        }, {
            Effect: 'Allow',
            Action: ['sqs: *', 'sqs:SendMessage'],
            Resource: ['arn:aws:sqs:eu-west-1:680288204760:catalogItemsQueue']
        }
        ],
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            BUCKET: '${env:BUCKET}',
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
            SQS_URL: 'https://sqs.eu-west-1.amazonaws.com/680288204760/catalogItemsQueue',
        },
    },
    functions: { importProductsFile, importFileParser },
    package: {individually: true},
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
