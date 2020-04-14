import React, {Component} from 'react';
import AppToolbar from "./components/UI/Toolbar/AppToolbar";

import Routes from "./Routes";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

class App extends Component {
  render() {
    return (
      <>
        <CssBaseline/>
        <AppToolbar/>

        <Container maxWidth="xl">
          <Routes/>
        </Container>
      </>
    );
  }
}

export default App;