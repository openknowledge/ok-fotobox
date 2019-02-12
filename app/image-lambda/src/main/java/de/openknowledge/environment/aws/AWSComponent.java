package de.openknowledge.environment.aws;

import dagger.Component;
import de.openknowledge.usecase.RenderFrame;
import de.openknowledge.usecase.ResizeImage;

import javax.inject.Singleton;

@Component(modules = {
        AWSDeploymentBindings.class
})
@Singleton
public interface AWSComponent {
    RenderFrame getRenderTextToImage();
    ResizeImage getResizeImage();
}
