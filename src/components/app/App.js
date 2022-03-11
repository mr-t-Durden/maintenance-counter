import './App.css';
import React from 'react';
import logo from '../../img/b40720e431d141939b3a39363b49659b.png';
import Incrementor from '../incrementor/Incrementor';

function App() {
  return (
    <div className='box'>
      <header>
        <img className="logo" src={logo} alt="Maintenance Counter logo" />
      </header>
      <main>
        {/* <MaintenanceIntervals /> */}
        <Incrementor />
      </main>
      <footer>
        Impressum ...
      </footer>
    </div>
  );
}

export default App;
