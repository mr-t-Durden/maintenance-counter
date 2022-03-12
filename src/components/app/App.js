import './App.css';
import React, {useState} from 'react';
import logo from '../../img/b40720e431d141939b3a39363b49659b.png';
import Incrementor from '../incrementor/Incrementor';

function App() {
  const [intervals, setIntervals] = useState([
    {
      id: 1,
      name: 'Oil bicycle chain',
      currentValue: 0,
      totalValue: 300,
      active: true,
      complete: false
    }
  ]);

  function changeActiveIntervalsProgress(changeValue) {
    const activeIntervals = intervals.filter( 
      interval => interval.active 
    );

    activeIntervals.forEach( 
      interval => interval.currentValue += changeValue
    );
  }

  return (
    <div className='box'>
      <header>
        <img className="logo" src={logo} alt="Maintenance Counter logo" />
      </header>
      <main>
        {/* <MaintenanceIntervals /> */}
        <Incrementor 
          changeIntervalProgress={changeActiveIntervalsProgress} 
        />
      </main>
      <footer>
        Impressum ...
      </footer>
    </div>
  );
}

export default App;
