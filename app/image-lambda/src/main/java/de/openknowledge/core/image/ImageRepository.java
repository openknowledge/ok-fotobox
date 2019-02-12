package de.openknowledge.core.image;

import java.util.Optional;

public interface ImageRepository {
    byte[] receive(FileKey key);
    void write(String folder, FileKey newKey, byte[] imageBytes, Optional<String> frameType);
    void delete(FileKey key);
}
