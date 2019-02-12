package de.openknowledge.usecase;

import static java.awt.RenderingHints.*;
import static java.awt.RenderingHints.KEY_FRACTIONALMETRICS;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

import javax.imageio.ImageIO;
import javax.inject.Inject;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.openknowledge.core.frame.FrameRepository;
import de.openknowledge.core.frame.FrameType;
import de.openknowledge.core.image.FileKey;
import de.openknowledge.core.image.ImageRepository;
import de.openknowledge.core.status.StatusEmitter;

@Named
public class ResizeImage {

  public static final int FRAME_OFFSET = -126;
  private static final String RESIZED_FOLDER_NAME = "resized";

  private static final Logger LOG = LoggerFactory.getLogger(ResizeImage.class);

  public static final int TARGET_WIDTH = 1543;
  public static final int TARGET_HEIGHT = 1042;

  public static final int IMAGE_WIDTH = 1543;
  public static final int IMAGE_HEIGHT = 867;

  public static final int FIX_FOV_TABLET = -126;

  private StatusEmitter emitter;
  private ImageRepository imageRepository;
  private FrameRepository frameRepository;

  @Inject
  public ResizeImage(StatusEmitter emitter, ImageRepository imageRepository, FrameRepository frameRepository) {
    this.imageRepository = imageRepository;
    this.emitter = emitter;
    this.frameRepository = frameRepository;
  }

  public void execute(FileKey fileKey) {
    LOG.info("Resizing image " + fileKey);
    try {
      this.emitter.onFinish(fileKey, "uploaded");
      byte[] imageBytes = imageRepository.receive(fileKey);
      InputStream is = new BufferedInputStream(new ByteArrayInputStream(imageBytes));
      BufferedImage thePerson = ImageIO.read(is);
      BufferedImage scaledCanvas = new BufferedImage(TARGET_WIDTH, TARGET_HEIGHT, BufferedImage.TYPE_3BYTE_BGR);
      FrameType frameType = frameRepository.getType(fileKey);

      Graphics2D g2d = scaledCanvas.createGraphics();
      g2d.setPaint(Color.CYAN);
      g2d.setBackground(Color.blue);
      g2d.fillRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
      g2d.drawImage(thePerson, FIX_FOV_TABLET, 0, IMAGE_WIDTH, IMAGE_HEIGHT, null);
      g2d.setRenderingHint(KEY_FRACTIONALMETRICS, VALUE_FRACTIONALMETRICS_ON);
      g2d.dispose();

      ByteArrayOutputStream baos = new ByteArrayOutputStream();
      ImageIO.write(scaledCanvas, "jpg", baos);
      baos.flush();
      byte[] imageInByte = baos.toByteArray();
      baos.close();
      LOG.info("Writing File {}", fileKey);
      imageRepository.write(RESIZED_FOLDER_NAME, fileKey
          .toFileName()
          .clearSuffix(), imageInByte,
          Optional.of(frameType.name())
          );

      LOG.info("Deleting source File");
      imageRepository.delete(fileKey);
      this.emitter.onFinish(fileKey, "resized");
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
