package de.openknowledge.adapter;

import static java.util.Collections.singletonList;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.GetObjectTaggingRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.ObjectTagging;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.Tag;
import de.openknowledge.core.frame.FrameRepository;
import de.openknowledge.core.frame.FrameType;
import de.openknowledge.core.image.FileKey;
import de.openknowledge.core.image.ImageRepository;
import de.openknowledge.environment.aws.LambdaConfiguration;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Optional;

public class S3FileProvider implements ImageRepository, FrameRepository {
    private static final Logger LOG = LoggerFactory.getLogger(S3FileProvider.class);

    AmazonS3 client;
    LambdaConfiguration configuration;

    @Inject
    public S3FileProvider(AmazonS3 client, LambdaConfiguration configuration) {
        this.client = client;
        this.configuration = configuration;
    }

    @Override
    public byte[] receive(FileKey key) {
        LOG.info("Receiving File {} from bucket {}", key, configuration.getBucketName());
        S3Object object = this.client.getObject(configuration.getBucketName(), key.getValue());
        try {
            return IOUtils.toByteArray(object.getObjectContent());
        } catch (IOException e) {
            LOG.error("Error Receiving File from S3 {}", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public void write(String folder, FileKey newKey, byte[] imageBytes, Optional<String> frameType) {
        ByteArrayInputStream inputStream = new ByteArrayInputStream(imageBytes);
        String newObjectKey = folder + "/" + newKey;
        ObjectMetadata meta = new ObjectMetadata();
        meta.setContentType("image/jpg");
        PutObjectRequest request = new PutObjectRequest(configuration.getBucketName(), newObjectKey, inputStream, meta);
        frameType.ifPresent(type -> {
          ObjectTagging tagging = new ObjectTagging(singletonList(new Tag("frameType", type)));
          request.setTagging(tagging);
        });
        LOG.info("Writing File {} to Bucket {}", folder + "/" + newKey, configuration.getBucketName());
        client.putObject(request);
    }

    @Override
    public void delete(FileKey key) {
        DeleteObjectRequest request = new DeleteObjectRequest(
                this.configuration.getBucketName(),
                key.getValue()
        );
        this.client.deleteObject(request);
    }

    @Override
    public byte[] getFrameData(FrameType frameIdentifier) {
        try {
            return IOUtils.toByteArray(Thread.currentThread().getContextClassLoader().getResource("frames/" + frameIdentifier.name().toLowerCase() + ".png"));
        } catch (IOException e) {
            LOG.error("Could not find frame " + frameIdentifier + ". Does your files' name equal any FrameType#name and ends on .png?");
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    public FrameType getType(FileKey key) {
        GetObjectTaggingRequest getObjectTaggingRequest = new GetObjectTaggingRequest(configuration.getBucketName(), key.getValue());
        return client.getObjectTagging(getObjectTaggingRequest)
                .getTagSet()
                .stream()
                .filter(tag -> tag.getKey().equalsIgnoreCase("frameType"))
                .map(val -> nameToType(val.getValue()))
                .findFirst().orElse(FrameType.UNKNOWN);
    }

    private FrameType nameToType(String name) {
        switch (name.toLowerCase()) {
            case "pink":
                return FrameType.PINK;
            case "blue":
                return FrameType.BLUE;
            default:
                return FrameType.UNKNOWN;

        }
    }
}
