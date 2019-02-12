package de.openknowledge.environment.aws;

public class LambdaConfiguration {

    private String region;
    private String bucketName;
    private String iotEndpoint;

    public LambdaConfiguration(String region, String bucketName, String iotEndpoint) {
        this.region = region;
        this.bucketName = bucketName;
        this.iotEndpoint = iotEndpoint;
    }

    public String getRegion() {
        return region;
    }

    public String getBucketName() {
        return bucketName;
    }

    public String getIotEndpoint() {
        return iotEndpoint;
    }
}
