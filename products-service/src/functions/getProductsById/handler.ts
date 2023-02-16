import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import {formatJSONResponse, formatNotFoundError} from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { products } from '@mock/index';

import schema from './schema';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    if (event.pathParameters && event.pathParameters.productId) {
      const { productId } = event.pathParameters;
      const findProducts = products.filter((el) => el.id === productId);

      if (!findProducts.length) {
        return formatNotFoundError('This product not found')
      }

      return formatJSONResponse(findProducts);
    }
  } catch (e) {
    return formatNotFoundError('Something went wrong')
  }
};

export const main = middyfy(getProductsById);
