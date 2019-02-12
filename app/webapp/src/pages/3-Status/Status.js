import React from 'react';
import {withImageContext} from "../ImageContext";
import {upload} from "../../usecases/uploadImage";
import {initialize} from "../../iot";

import s from 'styled-components'
import {theme} from "../../theme";
import {Button} from "../../Button";

type TStatus = {
  imageid: string;
  done: string;
}

export const Status = withImageContext(class extends React.Component {

  state = {
    status: []
  }

  componentDidMount = async () => {
    try {
      const client = await initialize();
      client.on('message', (topic, message) => {
        const enc = new TextDecoder("utf-8");
        console.log("Raw msg", message);
        const msg: TStatus = JSON.parse(enc.decode(message));
        console.log("Received message", message);
        this.setState({status: [...this.state.status, msg.done]})
      });
      const id = await upload(this.props.image, this.props.frameType)
      console.log(this.props);
      this.props.setImageId(id);
      console.log("Setting image id", id, this.props);
      this.setState({status: [...this.state.status, 'uploaded']})
    } catch (e) {
      console.log("Error", e);
      this.setState({error: 'Could not establish connection to AWS. Check your Internet Connection'})
    }
  }

  isDone = (status: string) => {
    return this.state.status.indexOf(status) !== -1;
  }

  allStepsDone = () => {
    return this.state.status.length > 3;
  }

  nextStep = () => {
    this.props.history.push("/share")
  }

  render = () => {
    return <Container>
      <Content>
        <Headline>Bitte warten!</Headline>
        <InfoText>Es dauert nur wenige Sekunden, bis dein Bild vorbereitet ist</InfoText>
        {this.state.error ? <h1 style={{color: "red"}}>Keine Verbindung zum Internet!</h1> : null}
        <HSplit>
          <Dots>
            <StatusDot done={this.isDone("uploaded")} text={"Dein Bild wird hochgeladen"}/>
            <StatusDot done={this.isDone("resized")} text={"Dein Bild wird Skaliert"}/>
            <StatusDot done={this.isDone("render")} text={"Dein Bild wird gerendert"}/>
            <StatusDot done={this.isDone("render")} text={"Bild teilen oder Drucken"} last={true}/>
          </Dots>
        </HSplit>
        {this.allStepsDone() ? <ButtonLayout>
          <Button onClick={this.props.nextStep}>
            <span className="icon_check"/>
          </Button>
        </ButtonLayout> : null}
      </Content>
    </Container>
  }
});

const ButtonLayout = s.div`
  display: flex;
  justify-content: center;
`;

const Headline = s.h2`
  font-size: 30px;
`;

const InfoText = s.p`
font-size: 20px;
`

const Container = s.div`
  display: flex;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Content = s.div`
  display: flex;
  flex-direction: column;
  width: 960px;
`

const HSplit = s.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const StatusDot = (props) => <div style={{
  borderLeft: !props.last ? `2px solid ${props.done ? theme.successColor : 'grey'}` : 'none',
  height: "50px",
  position: "relative",
  boxSizing: "border-box",
  display: "flex"
}}>
  <Dot done={props.done}/> {props.text}
</div>

const Dot = s.div`
  border-radius: 50%;
  background: ${props => props.done ? theme.successColor : 'grey'};
  ${props => props.error ? 'background: red' : ''};
  position: relative;
  top: 0;
  left: -10px;
  width: 20px;
  height: 20px;
`

const Dots = s.div`
  padding: 50px;
`
