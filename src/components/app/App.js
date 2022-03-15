import './App.css';
import React, {useState} from 'react';
import logo from '../../img/b40720e431d141939b3a39363b49659b.png';
import Incrementor from '../incrementor/Incrementor';
import MaintenanceIntervals from '../maintenanceintervals/MaintenanceIntervals';

function App() {
  const [intervals, setIntervals] = useState([
    {
      id: 1,
      name: 'Oil bicycle chain',
      currentValue: 0,
      totalValue: 300,
      active: true
    }
  ]);

  function changeActiveIntervalsProgress(changeValue) {
    setIntervals( 
      intervals.map(
        (interval) => {
                if(interval.active) {
                  if((interval.currentValue + changeValue) < 0){
                    console.log('negative Progress!');
                    interval.currentValue = 0;
                  } else {
                    interval.currentValue += changeValue;
                  }
                }
                return interval;  
              }
      )
    );
  }

  function removeInterval(intervalId) {
    setIntervals(
      intervals.filter(
        interval => interval.id !== intervalId
      )
    );
  }

  function toggleActive(intervalId) {
    setIntervals( 
      intervals.map(
        (interval) => {
            if(interval.id === intervalId) {
              interval.active = !interval.active;
            }
            return interval;  
          }
      )
    );
  }

  function resetIntervalProgress(intervalId) {
    setIntervals(
      intervals.map(
        (interval) => {
          if(interval.id === intervalId) {
            interval.currentValue = 0;
          }  
          return interval;
        }
      )
    );
  }


  return (
    <div className='box'>
      <header>
        <img className="logo" src={logo} alt="Maintenance Counter logo" />
      </header>
      <main>
        <Incrementor 
          changeIntervalProgress={changeActiveIntervalsProgress} 
        />
        <MaintenanceIntervals 
          intervals={intervals}
          resetIntervalProgress={resetIntervalProgress}
          removeInterval={removeInterval}
          toggleActive={toggleActive}
        />
      </main>
      <footer>
        Impressum ...
      </footer>
    </div>
  );
}

export default App;
