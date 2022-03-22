import './App.css';
import React, {useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import logo from '../../img/b40720e431d141939b3a39363b49659b.png';
import Incrementor from '../incrementor/Incrementor';
import MaintenanceIntervals from '../maintenanceintervals/MaintenanceIntervals';
import AddInterval from '../addinterval/AddInterval';
import Storage from '../../util/LocalStorage';

const defaultIntervals = [
  {
    id: uuidv4(),
    name: 'Oil bicycle chain',
    currentValue: 0,
    totalValue: 300,
    active: true
  }
];

function App() {
  const [intervals, setIntervals] = useState( () => {
    return Storage.loadIntervals() || defaultIntervals;
  });
  const [progressChange, setProgressChange] = useState(0);

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
    if ( progressChange ) return;

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

  function addInterval(newName, newTotal) {
    const newInterval = {
      id: uuidv4(),
      name: newName,
      currentValue: 0,
      totalValue: newTotal,
      active: true
    }

    setIntervals( (prevIntervals) => {return [...prevIntervals, newInterval]});
  }

  function changeProgressChange(changeValue) {
    setProgressChange((prevChange) => {
      return  prevChange + changeValue;
    });
  }

  useEffect( ()  => {
    Storage.saveIntervals(intervals);
  }, [intervals]);

  useEffect( () => {
    const showChangeTimeout = setTimeout(() => {
      changeActiveIntervalsProgress(progressChange);
      setProgressChange(0);
    }, 3000)
    return () => clearTimeout(showChangeTimeout);
  }, [progressChange]);

  return (
    <div className='box'>
      <header>
        <img className="logo" src={logo} alt="Maintenance Counter logo" />
      </header>
      <main>
        <Incrementor 
          changeIntervalProgress={changeProgressChange} 
        />
        <div className='intervals-area'>
          <MaintenanceIntervals 
            intervals={intervals}
            progressChange={progressChange}
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
