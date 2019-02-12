package de.openknowledge.core.image;

import java.util.Objects;

/**
 * Unique key of a file. Should be the unique file name of the S3 Bucket.
 */
public class FileKey {

    String value;

    public FileKey(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return value;
    }

    public FileKey toFileName() {
        String[] split = getValue().split("/");
        return new FileKey(split[split.length-1]);
    }

    public FileKey withSuffix(String ending) {
        if(getValue().lastIndexOf(".") != -1) {
          String fileName = getValue().substring(0, getValue().lastIndexOf("."));
          return new FileKey(fileName + "." + ending);
        }
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FileKey fileKey = (FileKey) o;
        return Objects.equals(value, fileKey.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }

    public FileKey clearSuffix() {
        int index = getValue().lastIndexOf(".");
        if(index == -1) {
            return this;
        }
        return new FileKey(getValue().substring(0, index));
    }
}
