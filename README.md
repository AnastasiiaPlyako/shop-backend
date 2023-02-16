## Result of 4 task
### Links:
- Get list product: https://8trzhm6k2m.execute-api.eu-west-1.amazonaws.com/dev/product
- Get product by id: https://8trzhm6k2m.execute-api.eu-west-1.amazonaws.com/dev/product/{productId}
- Create product: https://8trzhm6k2m.execute-api.eu-west-1.amazonaws.com/dev/products
- Frontend: https://ddrt9h3m47iz9.cloudfront.net


- [x] Task 4.1 is implemented
- [x] Task 4.2 is implemented lambda links are provided and returns data
- [x] Task 4.3 is implemented lambda links are provided and products is stored in DB
- [x]  Your own Frontend application is integrated with Product Service (/products API) and products from Product Service are represented on Frontend. Link to a working Frontend application is provided for cross-check reviewer.

Optional:
- [x]  POST /products lambda functions returns error 400 status code if product data is invalid
- [x]  All lambdas return error 500 status code on any error (DB connection, any unhandled error in code)
- [x]  All lambdas do console.log for each incoming requests and their arguments

## Result of 3 task
### What was done?
- Created 2 lambda function: getProductsList and getProductsById.
- Integrated backend with frontend for list of product.
- Added swagger
- Handled error

### Link to Product Service API
Link to Product Service API
- https://8trzhm6k2m.execute-api.eu-west-1.amazonaws.com/dev/product
- https://8trzhm6k2m.execute-api.eu-west-1.amazonaws.com/dev/product/{productId}

### Link to FE PR (YOUR OWN REPOSITORY) -
- https://github.com/AnastasiiaPlyako/shop-cloudfront/pull/2
- CloudFront URL: https://ddrt9h3m47iz9.cloudfront.net

### Swagger
- https://jhi83qurc3.execute-api.eu-west-1.amazonaws.com/swagger

## The idea of shop
The idea of the online store is to collect attractions from different countries in one place.
