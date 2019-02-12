import React from 'react';
import {Container} from "../Ui";
import s from 'styled-components';
import {withImageContext} from "../ImageContext";
import {FrameButton, FrameButtonGroup} from "./FrameButton";
import {frames, toUrl} from '../../usecases/listFrames';
import {theme} from "../../theme";

const PickFrame = withImageContext(class PickFrame extends React.Component {
  confirm = () => this.props.nextStep();
  render = () => <Container>
      <CameraImage src={this.props.image} />
      <FrameOnImage
        src={toUrl(this.props.frameType)}/>
      <FrameButtonGroup>
        {frames().map(frame => <FrameButton active={this.props.frameType === frame} frameUrl={toUrl(frame)}
                                            onClick={this.props.setFrame(frame)}/>)}
      </FrameButtonGroup>
      <NextButton onClick={this.confirm}>Weiter</NextButton>
  </Container>
});

const CameraImage = s.img`
  left: -100px;
  top: 0px;
  zIndex: 99;
  position: absolute;
  width: 1280px;
  height: 720px;
`;

const FrameOnImage = s.img`
   position: absolute;
   width: 1290px;
   height: 850px;
   left: -5px;
   z-index: 999;
`

const NextButton = s.button`
  position: absolute;
  z-index: 9999;
  right: 0px;
  bottom: 360px;
  height: 100px;
  width: 200px;
  background: ${theme.primaryColor};
  outline: none;
  border: 0;
  font-size: 40px;
  color: white;
`;


export {PickFrame}