import { middyfy } from '@libs/lambda';
import {formatJSONResponse, ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import { products } from '@mock/index';

import schema from './schema';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  return formatJSONResponse(products);
};

export const main = middyfy(getProductsList);
