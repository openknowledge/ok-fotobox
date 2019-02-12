package de.openknowledge.environment.aws;

import com.amazonaws.regions.Region;
import com.amazonaws.services.iotdata.AWSIotDataClient;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import dagger.Module;
import dagger.Provides;
import de.openknowledge.adapter.IotStatusUpdate;
import de.openknowledge.adapter.S3FileProvider;
import de.openknowledge.core.frame.FrameRepository;
import de.openknowledge.core.image.ImageRepository;
import de.openknowledge.core.status.StatusEmitter;

import javax.inject.Singleton;

import static com.amazonaws.regions.Regions.*;

@Module
public class AWSDeploymentBindings {


    @Provides
    @Singleton
    public S3FileProvider fileProvider(AmazonS3 s3, LambdaConfiguration configuration) {
        return new S3FileProvider(s3, configuration);
    }
    @Provides
    @Singleton
    public ImageRepository imageRepository(S3FileProvider s3) {
        return s3;
    }

    @Provides
    @Singleton
    public AmazonS3 s3Client() {
        return AmazonS3ClientBuilder.standard()
                .withRegion("eu-central-1")
                .build();
    }

    @Provides
    @Singleton
    public LambdaConfiguration configuration() {
        return new LambdaConfiguration("eu-central-1",
            System.getenv("BUCKET_NAME"),
            System.getenv("IOT_URL")
        );
    }

    @Provides
    @Singleton
    public AWSIotDataClient iotDataClient(LambdaConfiguration configuration) {
        AWSIotDataClient client = new AWSIotDataClient();
        client.setEndpoint(configuration.getIotEndpoint());
        client.setRegion(Region.getRegion(EU_CENTRAL_1));
        return client;
    }

    @Provides
    @Singleton
    StatusEmitter emitter(AWSIotDataClient c) {
        return new IotStatusUpdate(c);
    }

    @Provides
    @Singleton
    FrameRepository frameRepository(S3FileProvider s3FileProvider) {
        return s3FileProvider;
    }
}
