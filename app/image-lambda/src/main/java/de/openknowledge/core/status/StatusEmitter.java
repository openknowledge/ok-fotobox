package de.openknowledge.core.status;

import de.openknowledge.core.image.FileKey;

public interface StatusEmitter {
    void onFinish(FileKey key, String state);
}
