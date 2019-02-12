import Config from '../AWS';
const AWS = require('aws-sdk');

export const login = () => {
  AWS.config.update({
    region: "eu-central-1",
    accessKey: Config.ACCESS_KEY,
    secretAccessKey: Config.SECRET_KEY,
    credentials: {
      accessKeyId: Config.ACCESS_KEY,
      secretAccessKey: Config.SECRET_KEY,
    }
  })
}