// @flow
import React from 'react'
import {withImageContext} from "../ImageContext";
import {ButtonLayout, Container} from "../Ui";
import {Button} from "../../Button";
import s from 'styled-components';
import {PrintDialog} from "./PrintDialog";
import {PrintingDialog} from './PrintingDialog'
import {showFinishedImage} from "../../usecases/showFinishedImage";
import {printImage} from "../../usecases/printImage";


export const Share = withImageContext(class extends React.Component {

  state = {
    imageUrl: "",
    printDialog: false,
    printing: false,
    error: ""
  }

  componentDidMount() {
    const imageUrl = showFinishedImage(this.props.imageid);
    console.log("imagerl", imageUrl)
    this.setState({
      imageUrl
    })
    console.log("Image id is", this.props.imageid);
  }

  printDialog = () => this.setState({printDialog: true});
  print = (amount) => async () => {
    await printImage(this.state.imageUrl).catch((e) => {
      console.log("ERROR:", e);
      this.setState({error: "Der Drucker ist nicht erreichbar"})
    });
    this.setState({printing: true});
    setTimeout(() => {
      this.props.reset();
    }, 15000)
  }
  closeDialog = () => this.setState({printDialog: false});

  render() {
    return <Container>
      {this.state.printDialog && !this.state.printing ?
        <PrintDialog print={this.print} close={this.closeDialog}/> : null}
      {this.state.printing || this.state.error ? <PrintingDialog error={this.state.error}/> : null}
      <ImagePreview src={this.state.imageUrl} alt={""}/>
      <ButtonLayout>
        <Button onClick={this.print(1)}>
          <span className="icon_printer"/>
        </Button>
        <Button onClick={this.props.reset}>
          <span className="icon_close"/>
        </Button>
      </ButtonLayout>
    </Container>
  }
});



const ImagePreview = s.img`
  position: absolute;
  top: 0;
  width: 1290px;
  height: 820px;
`;