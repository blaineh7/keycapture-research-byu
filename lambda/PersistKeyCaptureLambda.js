/**
 * Created by Blaine Hamilton on 2/24/2017.
 * This is the AWS Lambda Node.js code  Runtime is Node.js 4.3 and Handler is index.handler
 *
 */

'use strict';

console.log('Loading function');

const doc = require('dynamodb-doc');
const aws = require('aws-sdk');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });
const dynamo = new doc.DynamoDB();


/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    //var b64string = JSON.parse(event.body).Item.Id;
    var item = JSON.stringify(JSON.parse(event.body).Item);


    //var buf = new Buffer(b64string.replace(/bwh5/g, '\r\n'), 'base64');

    //dynamo.putItem(JSON.parse(event.body), done);
    console.log('Received event:', JSON.stringify(event, null, 2));
    var params = {
        Bucket : "is590-keycapture-data",
        Key :  JSON.parse(event.body).Key,
        Body : item
    };
    s3.putObject(params, done);

    function test (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    }

};
