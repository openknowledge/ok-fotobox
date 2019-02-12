package de.openknowledge.core;

import de.openknowledge.core.image.FileKey;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class FileKeyTest {

    @Test
    public void toFileName() {
        FileKey key = new FileKey("uploads/sven.jpeg");
        assertThat(key.toFileName()).isEqualTo(new FileKey("sven.jpeg"));
    }

    @Test
    public void withSuffix() {
        FileKey key = new FileKey("uploads/sven.jpeg");
        assertThat(key.withSuffix("png")).isEqualTo(new FileKey("uploads/sven.png"));
    }

    @Test
    public void toFileNameWithSuffix() {
        FileKey key = new FileKey("uploads/sven.jpeg");
        assertThat(key.toFileName().withSuffix("png")).isEqualTo(new FileKey("sven.png"));
    }

    @Test
    public void cleanSuffix() {
        FileKey key = new FileKey("uploads/sven.jpeg");
        assertThat(key.toFileName().clearSuffix()).isEqualTo(new FileKey("sven"));

    }

}

