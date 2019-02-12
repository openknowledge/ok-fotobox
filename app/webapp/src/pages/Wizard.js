import React from 'react';
import {PickFrame} from "./2-PickFrame/PickFrame";
import Terms from "./0-Terms/Terms";
import {TakePicture} from "./1-TakePicture/TakePicture";
import {Status} from "./3-Status/Status";
import {Share} from "./4-Share/Share";

class Wizard extends React.Component {
  state = {
    step: 0,
    frameType: "pink"
  };
  nextStep = () => this.setState(oldState => ({ step: oldState.step + 1 }));
  setFrame = frameId => () => this.setState({frameType: frameId});
  reset = () => {
    this.setState({ step: 0 })
  };

  renderStep = () => {
    switch (this.state.step) {
      case 0: return <Terms nextStep={this.nextStep} />;
      case 1: return null; //<TakePicture nextStep={this.nextStep} />;
      case 2: return <PickFrame nextStep={this.nextStep} setFrame={this.setFrame} frameType={this.state.frameType}/>;
      case 3: return <Status nextStep={this.nextStep} frameType={this.state.frameType} />;
      case 4: return <Share reset={this.reset} nextStep={this.nextStep} />;
      default: return <div>There is no step for {this.state.step}</div>
    }
  };
  render = () => <React.Fragment>
    <TakePicture nextStep={this.nextStep} hidden={this.state.step !== 1}/>
    {this.renderStep()}
  </React.Fragment>
}

export { Wizard }