import './App.css';
import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import logo from '../../img/b40720e431d141939b3a39363b49659b.png';
import Incrementor from '../incrementor/Incrementor';
import MaintenanceIntervals from '../maintenanceintervals/MaintenanceIntervals';
import AddInterval from '../addinterval/AddInterval';

function App() {
  const [intervals, setIntervals] = useState([
    {
      id: uuidv4(),
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

  function addInterval(newInterval) {
    newInterval.id = uuidv4();
    intervals.push(newInterval);
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
        <div className='intervals-area'>
          <MaintenanceIntervals 
            intervals={intervals}
            resetIntervalProgress={resetIntervalProgress}
            removeInterval={removeInterval}
            toggleActive={toggleActive}
          />
          <AddInterval 
            addInterval={addInterval}
          />
        </div>
      </main>
      <footer>
        <p>Impressum ...</p>
      </footer>
    </div>
  );
}

export default App;
