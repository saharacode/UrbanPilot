import React from 'react';
import './App.css';
import HelloWorldComponent from "./components/helloWorldComponent/HelloWorldComponent";
import UrbanPilotLogo from './images/UrbanPilotLogo.png';

function App() {
  return (
    <div className="App">
        <div>
            <img src={UrbanPilotLogo} alt={"UrbanPilotLogo"} style={{width: '10%'}}/>
            <h3>Discover. Share. Conquer the urban jungle.</h3>
            <HelloWorldComponent/>
        </div>

    </div>
  );
}

export default App;
