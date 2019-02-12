import React from 'react';
import {login} from "../../usecases/login";
import {Approve} from "./Approve";
import {withImageContext} from "../ImageContext";
import UserCam from 'react-webcam'
import {CamContainer, CameraIcon, Container} from "../Ui";
import styled from 'styled-components';
import {Button} from "../../Button";

export const TakePicture = withImageContext(class extends React.Component {
  state = {
    approveNeeded: false,
    countdown: null
  }
  componentDidMount = async () => login()
  takePictureComplete = () => {
    this.props.nextStep()

    const datastr = this.props.image;
    const search = "base64,"

    const uploadString = datastr.substring(datastr.indexOf(search) + search.length);
    this.setState({approveNeeded: false});
    console.log(uploadString);
  }
  setRef = (webcam) => this.webcam = webcam;
  startCountdown = () => this.state.countdown === null ? this.countdown(5) : null;
  countdown = (secondsLeft) => {
    this.setState({countdown: secondsLeft});
    if (secondsLeft === 0) {
      this.setState({countdown: null})
      this.capture();
    } else {
      setTimeout(() => {
        this.countdown((secondsLeft - 1));
      }, 1000)
    }
  }
  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.props.setImage(imageSrc)
    setTimeout(() => {
      this.setState({approveNeeded: true})
    }, 10);
  };

  render() {
    return <Container style={this.props.hidden ? {display: 'none'} : {}}>
        {this.state.showMessage ? null : <React.Fragment>
          {this.state.countdown ? <Countdown>{this.state.countdown}</Countdown> : null}
          <CamContainer>
            <UserCam
              style={{
                left: '-230px',
                zIndex: 99,
                display: this.state.approveNeeded ? 'none' : 'flex'
              }}
              audio={false}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                width: 1748,
                height: 1181,
                facingMode: 'user',
              }}
            />
            {this.state.approveNeeded ? <React.Fragment>
              <img src={this.props.image} style={{
                left: '-230px',
                zIndex: 99
              }} />
              <Iconbar>
                <Button type={"YES"} onClick={this.takePictureComplete}>
                  <span className={"icon_check"} />
                </Button>
                <Button type={"NO"} onClick={() => this.setState({approveNeeded: false})}>
                  <span className={"icon_close"} />
               </Button>
              </Iconbar>
            </React.Fragment> : null}
          </CamContainer>
          {!this.state.showMessage && !this.state.approveNeeded && this.state.countdown == null ?
            <CameraIcon onClick={this.startCountdown}>
              <span className="icon_camera_alt"/>
            </CameraIcon>
            : null}
        </React.Fragment>}
      </Container>
  }
})

const Countdown = styled.span`
  position: absolute;
  font-size:  120px;
  font-weight: 500;
  color: white;
  z-index: 1999;
  left: 50%;
`;

const Iconbar = styled.div`
  position: absolute;
  left: 1110px;
  height: 500px;
  width: 100px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  z-index: 999;
`

const ImagePreview = styled.img`
  position: relative;
  width: 1290px;
  height: 900px;
  object-fit: scale-down;
`;


