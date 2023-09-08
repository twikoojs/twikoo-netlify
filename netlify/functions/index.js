/**
 * https://docs.netlify.com/functions/create/?fn-language=js
 */
exports.handler = async function (event, context) {
  // event {
  //   "path": "Path parameter (original URL encoding)",
  //   "httpMethod": "Incoming request’s method name",
  //   "headers": {Incoming request headers},
  //   "queryStringParameters": {Query string parameters},
  //   "body": "A JSON string of the request payload",
  //   "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encoded"
  // }

  // return {
  //   "isBase64Encoded": true|false,
  //   "statusCode": httpStatusCode,
  //   "headers": { "headerName": "headerValue", ... },
  //   "multiValueHeaders": { "headerName": ["headerValue", "headerValue2", ...], ... },
  //   "body": "..."
  // }
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World", event, context }),
  };
};
