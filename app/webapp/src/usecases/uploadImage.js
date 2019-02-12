import shortid from 'shortid'
import Config from '../AWS';

const AWS = require('aws-sdk');

export const upload = async (base64: string, frameType: string) => {
  const s3 = new AWS.S3();
  const buf = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  const id = shortid();
  console.log("Uploading image with tag", frameType);
  const data = {
    Bucket: Config.FOTOBUCKET_NAME,
    Key: `uploads/${id}`,
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/png',
    Tagging: "frameType=" + frameType
  };
  await s3.putObject(data).promise()
  return Promise.resolve(id)
};