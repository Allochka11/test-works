import React from 'react';
import './App.scss';
import {PasswordCheck} from "./components/PasswordCheck";
import {Container} from "@mui/material";
import './App.scss'

function App() {
  return (
      <div className='main'>
        <Container style={{display: 'flex', justifyContent: 'center'}}>
          <PasswordCheck/>
        </Container>
      </div>
        );
}

export default App;
