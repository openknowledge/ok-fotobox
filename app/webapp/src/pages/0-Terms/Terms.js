import React from 'react';
import s from 'styled-components';
import {Button} from "../../Button";
import {Container, Modal} from "../Ui";

export default (props) => <Container>
  <Modal>
    <Content>
      <h3>DEINE ZUSTIMMUNG IST NOTWENDIG</h3>
      <p>
        Die Application unserer Serverless Fotobox lädt dein Foto in die Amazon Cloud (AWS).
        Dein Bild wird dort weiterverarbeitet und zum Druck auf unserem Fotodrucker am Messestand bereitgestellt.
        Nach dem Druck bzw. bei vorzeitigem Abbruch des Vorgangs, wird dein Foto gelöscht.
      </p>
      <p>
        Bist du damit einverstanden?
      </p>
      <ButtonSection>
        <Button onClick={props.nextStep}><span className="icon_check"/></Button>
      </ButtonSection>
    </Content>
  </Modal>
</Container>

const Content = s.div`
  width: 50%;
  background: white;
  padding: 1rem;
  border-radius: 5px;
  color: #737373;
  line-height: 150%;
`;
const ButtonSection = s.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;