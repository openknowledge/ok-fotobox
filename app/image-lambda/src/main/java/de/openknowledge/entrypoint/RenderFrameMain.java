package de.openknowledge.entrypoint;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.S3Event;
import de.openknowledge.environment.aws.AWSComponent;
import de.openknowledge.core.image.FileKey;
import de.openknowledge.environment.aws.DaggerAWSComponent;
import de.openknowledge.usecase.RenderFrame;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static de.openknowledge.entrypoint.S3EntryPoint.forNotification;

public class RenderFrameMain implements RequestHandler<S3Event, Object> {

    private static final Logger LOG = LoggerFactory.getLogger(RenderFrameMain.class);

    @Override
    public Object handleRequest(S3Event s3Event, Context context) {
        LOG.info("Starting Lambda");
        AWSComponent build = DaggerAWSComponent
                .builder()
                .build();
        RenderFrame usecase = build.getRenderTextToImage();
        forNotification(s3Event, record -> usecase.execute(new FileKey(record.getS3().getObject().getKey()))).handle();
        return null;
    }
}
