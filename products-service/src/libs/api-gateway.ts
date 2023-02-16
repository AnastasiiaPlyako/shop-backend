import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export type TResponseProduct = {
  description: string;
  id: string;
  price: number;
  title: string;
}

const COMMON_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

export const formatJSONResponse = (response: TResponseProduct[]) => {
  return {
    statusCode: 200,
    headers: COMMON_HEADERS,
    body: JSON.stringify(response)
  }
}

export const formatNotFoundError = (textError: string) => {
  return {
    statusCode: 404,
    headers: COMMON_HEADERS,
    body: JSON.stringify({ message: textError })
  }
}

export const formatInternalError = () => {
  return {
    statusCode: 500,
    headers: COMMON_HEADERS,
    body: JSON.stringify({ message: 'Internal error' })
  }
}

export const formatBadRequest = () => {
  return {
    statusCode: 400,
    headers: COMMON_HEADERS,
    body: JSON.stringify({ message: 'Bad request' })
  }
}