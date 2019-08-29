import React from 'react';
import {Container} from './styles.js'
import Login from './login'
import {ThemeProvider} from 'styled-components'

function App() {
  return (
    <ThemeProvider theme={{mode: 'dark'}} >
      <Container >
          <Login />
      </Container>
    </ThemeProvider>
  );
}

export default App;
