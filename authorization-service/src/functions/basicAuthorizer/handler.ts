import { middyfy } from '@libs/lambda';

const TYPE_EFFECT = {
  ALLOW: 'allow',
  DENY: 'deny'
}

const generatePolicyDocument = (effect, resource) =>
    (
        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Action": "execute-api:Invoke",
                    "Effect": effect,
                    "Resource": resource
                }
            ]
        }
    )

const generateResponse = (principalId, effect, methodArn) => ({
    principalId,
    policyDocument: generatePolicyDocument(effect, methodArn)
})

const basicAuthorizer = async (event) => {
  console.log('Event', event)
  const { methodArn, authorizationToken } = event;
  const principalId = 'test';
  const token = authorizationToken?.split(" ")[1];
  const isAuthorized = token === process.env.AUTH_TOKEN;
  const response = isAuthorized
      ? generateResponse(principalId, TYPE_EFFECT.ALLOW, methodArn)
      : generateResponse(principalId, TYPE_EFFECT.DENY, methodArn);
  console.log('response', JSON.stringify(response));
  return response;
};

export const main = middyfy(basicAuthorizer);
