package de.openknowledge.usecase;

import de.openknowledge.core.frame.FrameRepository;
import de.openknowledge.core.frame.FrameType;
import de.openknowledge.core.image.FileKey;
import de.openknowledge.core.image.ImageRepository;
import de.openknowledge.core.status.StatusEmitter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.imageio.ImageIO;
import javax.inject.Inject;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Optional;

public class RenderFrame {

    private static final Logger LOG = LoggerFactory.getLogger(RenderFrame.class);

    private static final String PROCESSED_FOLDER_NAME = "processed";

    public static final int TARGET_WIDTH = 1543;
    public static final int TARGET_HEIGHT = 1042;

    ImageRepository repository;
    FrameRepository frameRepository;
    StatusEmitter emitter;

    @Inject
    public RenderFrame(ImageRepository repository, FrameRepository frameRepository, StatusEmitter iotDataClient) {
        this.emitter = iotDataClient;
        this.repository = repository;
        this.frameRepository = frameRepository;
    }

    public void execute(FileKey fileKey) {
        LOG.info("Starting usecase");
        try {
            byte[] imageBytes = repository.receive(fileKey);
            InputStream is = new BufferedInputStream(new ByteArrayInputStream(imageBytes));
            BufferedImage thePerson = ImageIO.read(is);
            LOG.info("Normalizeing Image");
            FrameType frameType = frameRepository.getType(fileKey);
            byte[] frameBytes = frameRepository.getFrameData(frameType);

            LOG.info("Loading Frame" + frameType.name());
            InputStream frameIs = new BufferedInputStream(new ByteArrayInputStream(frameBytes));
            BufferedImage frame = ImageIO.read(frameIs);

            // Draw on Image
            Graphics2D g2d = thePerson.createGraphics();
            g2d.drawImage(frame, 0, 0, TARGET_WIDTH, TARGET_HEIGHT, null);
            g2d.setRenderingHint(RenderingHints.KEY_FRACTIONALMETRICS,
                    RenderingHints.VALUE_FRACTIONALMETRICS_ON);
            g2d.setPaint(new Color(16, 100, 147));
            g2d.setFont(new Font("sans-serif", Font.BOLD, 50));
            g2d.dispose();
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(thePerson, "jpg", baos);
            baos.flush();
            byte[] imageInByte = baos.toByteArray();
            baos.close();
            LOG.info("Writing File");
            repository.write(PROCESSED_FOLDER_NAME, fileKey
                    .toFileName()
                    .clearSuffix(),
                imageInByte, Optional.empty());
            LOG.info("Deleting source File");
            repository.delete(fileKey);
            LOG.info("Publishing request");
            emitter.onFinish(fileKey, "render");
        } catch (Exception e) {
            LOG.error("Error Rendering Image", e);
        }
    }
}
