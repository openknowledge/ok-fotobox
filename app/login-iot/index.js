const v4 = require('aws-signature-v4');
const crypto = require('crypto');
const sdk = require('aws-sdk');

exports.handler = (event, context, callback) => {
    const iot = new sdk.Iot();
    console.log("Starting login");

    iot.describeEndpoint({
        endpointType: "iot:Data-ATS"
    }, function(err, data) {
      if (err) console.log(err, err.stack);
      else console.log("Received endpoint", data);

        // TODO: SEE https://stackoverflow.com/questions/51516052/mqtt-connection-gives-403-for-aws-iot-pre-signed-url
      const { AWS_SESSION_TOKEN } = process.env;

      delete process.env['AWS_SESSION_TOKEN'];
      const endpoint = data.endpointAddress;
      console.log("Endpoint is", endpoint);
      if (!endpoint) throw new Error("Data has no endpoint address");
      //  method,
        //   host,
        //   path,
        //   service,
        //   payload,
        //   options
      const url = v4.createPresignedURL(
        'GET',
        endpoint.toLowerCase(),
        '/mqtt',
        'iotdevicegateway',
        '',
        {
          'key': process.env.IOT_ACCESS_KEY,
          'secret': process.env.IOT_SECRET_KEY,
          'protocol': 'wss',
          'region': process.env.IOT_AWS_REGION,
        }
      );

      process.env['AWS_SESSION_TOKEN'] = AWS_SESSION_TOKEN;


        const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        },
        body: {url: url},
      };

      callback(null, response);
    });
}