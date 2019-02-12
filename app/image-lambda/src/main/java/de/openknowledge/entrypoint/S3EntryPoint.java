package de.openknowledge.entrypoint;

import com.amazonaws.services.lambda.runtime.events.S3Event;
import com.amazonaws.services.s3.event.S3EventNotification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class S3EntryPoint {

    private static final Logger LOG = LoggerFactory.getLogger(S3EntryPoint.class);

    S3Event event;
    S3EntryHandler handler;

    public S3EntryPoint(S3Event event, S3EntryHandler handler) {
        this.event = event;
        this.handler = handler;
    }

    public void handle() {
        event.getRecords().forEach(event -> {
            LOG.info("Working on S3 Object {} in Bucket",
                    event.getS3().getObject().getKey(),
                    event.getS3().getBucket().getName()
            );
            LOG.info("Executing usecase...");
            handler.onRecord(event);
        });
    }

    public static interface S3EntryHandler {
        void onRecord(S3EventNotification.S3EventNotificationRecord record);
    }

    public static S3EntryPoint forNotification(S3Event event, S3EntryHandler handler) {
        return new S3EntryPoint(event, handler);
    }

}
