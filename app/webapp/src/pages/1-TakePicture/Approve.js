import React from 'react';
import { CamContainer, Container, Icon} from "../Ui";
import s from 'styled-components'
import {Button} from "../../Button";

type Props = {
  image: string;
  onAbort: Function;
  onApprove: Function;
}
export const Approve = class extends React.Component<Props> {

  render() {
    return <Container>
          <CamContainer>
            <ImagePreview width="500px" src={this.props.image} />
            <Iconbar>
              <Button type={"YES"} onClick={this.props.onApprove}>
                <span className={"icon_check"} />
              </Button>
              <Button type={"NO"} onClick={this.props.onAbort}>
                <span className={"icon_close"} />
              </Button>
            </Iconbar>
          </CamContainer>
    </Container>
  }
}


const ImagePreview = s.img`
  width: 100%;
  height: 100%;
`;

const Iconbar = s.div`
  position: absolute;
  right: 0;
  height: 200px;
  width: 100px;
  display: flex;
  flex-direction: column;
`