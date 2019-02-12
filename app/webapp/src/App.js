import React, {Component} from 'react';
import {ImageProvider} from "./pages/ImageContext";
import {Wizard} from "./pages/Wizard";


class App extends Component {

  state = {
    settings: false
  }

  render = () => <ImageProvider>
    <Wizard />
  </ImageProvider>
}


export default App;
