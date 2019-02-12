package de.openknowledge.entrypoint;

import static de.openknowledge.entrypoint.S3EntryPoint.forNotification;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.S3Event;
import de.openknowledge.core.image.FileKey;
import de.openknowledge.environment.aws.AWSComponent;
import de.openknowledge.environment.aws.DaggerAWSComponent;
import de.openknowledge.usecase.ResizeImage;

public class ResizeImageMain implements RequestHandler<S3Event, Object> {
  @Override
  public Object handleRequest(S3Event s3Event, Context context) {
    AWSComponent build = DaggerAWSComponent
        .builder()
        .build();
    ResizeImage usecase = build.getResizeImage();
    forNotification(s3Event, record -> usecase.execute(new FileKey(record.getS3().getObject().getKey()))).handle();
    return null;
  }
}
