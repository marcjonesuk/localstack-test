'use strict';
// comment out this line for better performance
// on my dev machine the end-to-end response time goes from ~3000ms to ~700ms
// let awscdk = require('aws-sdk')
// console.log('starting up')

// *** On the host machine (Macbook pro OSX) ***

// time docker exec -e AWS_LAMBDA_EVENT_BODY="$AWS_LAMBDA_EVENT_BODY" -e LOCALSTACK_HOSTNAME="$LOCALSTACK_HOSTNAME" -e _HANDLER="$_HANDLER" -e AWS_LAMBDA_FUNCTION_TIMEOUT="$AWS_LAMBDA_FUNCTION_TIMEOUT" -e AWS_LAMBDA_FUNCTION_NAME="$AWS_LAMBDA_FUNCTION_NAME" -e AWS_LAMBDA_FUNCTION_VERSION="$AWS_LAMBDA_FUNCTION_VERSION" -e AWS_LAMBDA_FUNCTION_INVOKED_ARN="$AWS_LAMBDA_FUNCTION_INVOKED_ARN" -e NODE_TLS_REJECT_UNAUTHORIZED="$NODE_TLS_REJECT_UNAUTHORIZED" -e _LAMBDA_SERVER_PORT="$_LAMBDA_SERVER_PORT" localstack_lambda_arn_aws_lambda_us-east-1_000000000000_function_test-local-hello /var/rapid/init --bootstrap /var/runtime/bootstrap --enable-msg-logs handler.hello
// 2020-08-06T10:39:35.291Z	undefined	INFO	starting up
// START RequestId: bed7a41a-e45b-180d-d190-64eb096e8c9c Version: $LATEST
// 2020-08-06T10:39:35.302Z	bed7a41a-e45b-180d-d190-64eb096e8c9c	INFO	here is some logging
// END RequestId: bed7a41a-e45b-180d-d190-64eb096e8c9c
// REPORT RequestId: bed7a41a-e45b-180d-d190-64eb096e8c9c	Init Duration: 300000.00 ms	Duration: 7.49 ms	Billed Duration: 100 ms	Memory Size: 1536 MB	Max Memory Used: 53 MB	

// {"statusCode":200,"body":"{\n  \"message\": \"Go Serverless v1.0! Your function executed successfully!\",\n  \"input\": {}\n}"}
// docker exec -e AWS_LAMBDA_EVENT_BODY="$AWS_LAMBDA_EVENT_BODY" -e  -e  -e  -e   0.04s user 0.03s system 2% cpu 2.170 total

// *** Inside the lambda container: ***

// bash-4.2$ time /var/rapid/init --bootstrap /var/runtime/bootstrap --enable-msg-logs handler.hello
// 2020-08-06T10:36:57.613Z	undefined	INFO	starting up
// START RequestId: ff997fe4-cfb5-127b-4e0a-4853d7c57eeb Version: $LATEST
// 2020-08-06T10:36:57.625Z	ff997fe4-cfb5-127b-4e0a-4853d7c57eeb	INFO	here is some logging
// END RequestId: ff997fe4-cfb5-127b-4e0a-4853d7c57eeb
// REPORT RequestId: ff997fe4-cfb5-127b-4e0a-4853d7c57eeb	Init Duration: 6000.00 ms	Duration: 8.23 ms	Billed Duration: 100 ms	Memory Size: 1536 MB	Max Memory Used: 54 MB	

// {"statusCode":200,"body":"{\n  \"message\": \"Go Serverless v1.0! Your function executed successfully!\",\n  \"input\": {\n    \"path\": \"/test\",\n    \"headers\": {\n      \"Remote-Addr\": \"172.18.0.1\",\n      \"User-Agent\": \"PostmanRuntime/7.26.2\",\n      \"Accept\": \"*/*\",\n      \"Postman-Token\": \"f33b2078-ff25-4c55-a7fe-b4e38828ac54\",\n      \"Host\": \"localhost:4567\",\n      \"Accept-Encoding\": \"gzip, deflate, br\",\n      \"Connection\": \"keep-alive\",\n      \"X-Forwarded-For\": \"172.18.0.1, localhost:4567\"\n    },\n    \"multiValueHeaders\": {\n      \"Remote-Addr\": [\n        \"172.18.0.1\"\n      ],\n      \"User-Agent\": [\n        \"PostmanRuntime/7.26.2\"\n      ],\n      \"Accept\": [\n        \"*/*\"\n      ],\n      \"Postman-Token\": [\n        \"f33b2078-ff25-4c55-a7fe-b4e38828ac54\"\n      ],\n      \"Host\": [\n        \"localhost:4567\"\n      ],\n      \"Accept-Encoding\": [\n        \"gzip, deflate, br\"\n      ],\n      \"Connection\": [\n        \"keep-alive\"\n      ],\n      \"X-Forwarded-For\": [\n        \"172.18.0.1, localhost:4567\"\n      ]\n    },\n    \"pathParameters\": {\n      \"proxy\": \"test\"\n    },\n    \"body\": \"\",\n    \"isBase64Encoded\": false,\n    \"resource\": \"/restapis/1e597uz45u/local/_user_request_/test\",\n    \"httpMethod\": \"GET\",\n    \"queryStringParameters\": {},\n    \"multiValueQueryStringParameters\": {},\n    \"requestContext\": {\n      \"path\": \"/local/test\",\n      \"accountId\": \"000000000000\",\n      \"resourceId\": \"8qsdh0gpuw\",\n      \"stage\": \"local\",\n      \"identity\": {\n        \"accountId\": \"000000000000\",\n        \"sourceIp\": \"172.18.0.1\",\n        \"userAgent\": \"PostmanRuntime/7.26.2\"\n      },\n      \"httpMethod\": \"GET\",\n      \"protocol\": \"HTTP/1.1\",\n      \"requestTime\": \"2020-08-06 10:24:42.867747\",\n      \"requestTimeEpoch\": 1596709482867\n    },\n    \"stageVariables\": {}\n  }\n}"}

// real	0m0.438s
// user	0m0.007s
// sys	0m0.032s

module.exports.hello = async event => {
  console.log('here is some logging')
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!!!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
