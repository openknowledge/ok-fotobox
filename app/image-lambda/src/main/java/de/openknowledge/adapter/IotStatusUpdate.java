package de.openknowledge.adapter;

import com.amazonaws.services.iotdata.AWSIotDataClient;
import com.amazonaws.services.iotdata.model.PublishRequest;
import de.openknowledge.core.image.FileKey;
import de.openknowledge.core.status.StatusEmitter;

import java.nio.ByteBuffer;

public class IotStatusUpdate implements StatusEmitter {

  AWSIotDataClient iotDataClient;

  public IotStatusUpdate(AWSIotDataClient iotDataClient) {
    this.iotDataClient = iotDataClient;
  }

  @Override
  public void onFinish(FileKey fileKey, String state) {
    this.iotDataClient.publish(
        new PublishRequest()
            .withTopic("message")
            .withPayload(ByteBuffer.wrap(("{"
                + "\"imageid\":" + "\"" + fileKey.toFileName() + "\"" + ","
                + "\"done\":" + "\"" + state + "\""
                + "}").getBytes())
            )
            .withQos(0)
    );
  }
}
