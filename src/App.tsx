import React from 'react';
import './App.scss';
import {Password} from "./components/Password/Password";
import {Container} from "@mui/material";
import './App.scss'

function App() {
    return (
        <div className='main'>
            <Container style={{display: 'flex', justifyContent: 'center'}}>
                <Password/>
                test3
            </Container>
        </div>
    );
}



export default App;
