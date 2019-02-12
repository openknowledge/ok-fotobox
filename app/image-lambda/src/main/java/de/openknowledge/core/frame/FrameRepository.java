package de.openknowledge.core.frame;

import de.openknowledge.core.image.FileKey;

public interface FrameRepository {
    byte[] getFrameData(FrameType frameIdentifier);
    FrameType getType(FileKey key);
}
