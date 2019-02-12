import React from 'react';

const ImageContext = React.createContext();

export const ImageProvider = class extends React.Component<any, any> {
  state = {
    image: "",
    imageid: ""
  };
  setImage = (image: string) => this.setState({ image });
  setImageId = (imageid: string) => this.setState({imageid: imageid});
  render = () => (
    <ImageContext.Provider value={
      { setImage: this.setImage,
        image: this.state.image,
        setImageId: this.setImageId,
        imageid: this.state.imageid
      }}>
      {this.props.children}
    </ImageContext.Provider>
  );
};

export const withImageContext = (Comp: any) =>
  class extends React.Component<any> {
    render() {
      return (
        <ImageContext.Consumer>
          {(value) => (
            <Comp {...this.props} {...value} />
          )}
        </ImageContext.Consumer>
      );
    }
  };