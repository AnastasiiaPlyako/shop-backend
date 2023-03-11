const COMMON_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

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