import AWS from 'aws-sdk';
import Config from '../AWS'

export const showFinishedImage = (imageid: string) => {
  const s3 = new AWS.S3();
  return s3.getSignedUrl('getObject', {
      Bucket: Config.FOTOBUCKET_NAME,
    Key: "processed/" + imageid,
    Expires: 604800,
  });
}