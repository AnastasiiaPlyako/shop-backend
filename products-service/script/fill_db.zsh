aws dynamodb put-item \
    --table-name products  \
    --item \
        '{"description": {"S": "Kninkali is a georgian dumplings. It is made of twisted knobs of dough, stuffed with meat and spices"}, "id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a1"}, "price": {"N": "15"}, "title": {"S": "Khinkali. Georgia"}}'

aws dynamodb put-item \
    --table-name products  \
    --item \
        '{"description": {"S": "Keychain in the form of the main symbol of Paris - the Eiffel Tower"}, "id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a3"}, "price": {"N": "23"}, "title": {"S": "Eiffel tower keychain. France"}}'

aws dynamodb put-item \
    --table-name products  \
    --item \
        '{"description": {"S": "The red double-decker bus is a symbol of London."}, "id": {"S": "7567ec4b-b10c-48c5-9345-fc73348a80a1"}, "price": {"N": "15"}, "title": {"S": "Model of bus. England"}}'

aws dynamodb put-item \
    --table-name products  \
    --item \
        '{"description": {"S": "Collectible and not very beer glasses can often be found in German stores."}, "id": {"S": "7567ec4b-b10c-48c5-9445-fc73c48a80a2"}, "price": {"N": "23"}, "title": {"S": "Beer mug. Germany"}}'

aws dynamodb put-item \
    --table-name products  \
    --item \
        '{"description": {"S": "This is sweets with the image of Mozart. It consist from marzipan, nougat and dark chocolate."}, "id": {"S": "7567ec4b-b10c-45c5-9345-fc73c48a80a1"}, "price": {"N": "15"}, "title": {"S": "Mozartkugel. Austria"}}'

aws dynamodb put-item \
    --table-name stocks  \
    --item \
        '{"product_id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80aa"}, "count": {"N": "1"}}'

aws dynamodb put-item \
    --table-name stocks  \
    --item \
        '{"product_id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a1"}, "count": {"N": "2"}}'

aws dynamodb put-item \
    --table-name stocks  \
    --item \
        '{"product_id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a3"}, "count": {"N": "3"}}'

aws dynamodb put-item \
    --table-name stocks  \
    --item \
        '{"product_id": {"S": "7567ec4b-b10c-48c5-9345-fc73348a80a1"}, "count": {"N": "4"}}'

aws dynamodb put-item \
    --table-name stocks  \
    --item \
        '{"product_id": {"S": "7567ec4b-b10c-48c5-9445-fc73c48a80a2"}, "count": {"N": "5"}}'

aws dynamodb put-item \
    --table-name stocks  \
    --item \
        '{"product_id": {"S": "7567ec4b-b10c-45c5-9345-fc73c48a80a1"}, "count": {"N": "6"}}'
