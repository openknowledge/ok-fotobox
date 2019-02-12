package de.openknowledge.adapter;

import de.openknowledge.core.frame.FrameRepository;
import de.openknowledge.core.frame.FrameType;
import de.openknowledge.core.image.FileKey;
import de.openknowledge.core.image.ImageRepository;
import org.apache.commons.io.IOUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.util.Optional;

/**
 * This class is for testing purposes only
 */
public class LocalFileSystemProvider implements FrameRepository {
    @Override
    public byte[] getFrameData(FrameType frameIdentifier) {
        try {
            return IOUtils.toByteArray(Thread.currentThread().getContextClassLoader().getResource("frames/pink.png"));
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    public FrameType getType(FileKey key) {
        return FrameType.PINK;
    }
}
