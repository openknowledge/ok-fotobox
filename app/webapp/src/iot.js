import mqtt from 'mqtt';
import {fetchUrl} from "./connect";

export const initialize = async () => {
  const url = await fetchUrl();
  console.log("Connect MQTT using", url);
  const client = mqtt.connect(url, {});
  client.on('connect', () => {
    console.log("Connected");
    client.subscribe('message')
  })

  client.on('close', () => {
    console.log('Connection to AWS IoT Broker closed');
    client.end();
  });

  return client;
}