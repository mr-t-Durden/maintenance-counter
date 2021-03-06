import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import logo from '../../img/b40720e431d141939b3a39363b49659b.png';
import Incrementor from '../incrementor/Incrementor';
import MaintenanceIntervals from '../maintenanceintervals/MaintenanceIntervals';
import AddInterval from '../addinterval/AddInterval';
import Storage from '../../util/LocalStorage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultIntervals = [
  {
    id: uuidv4(),
    name: 'Oil bicycle chain',
    currentValue: 0,
    totalValue: 300,
    active: true
  },
  {
    id: uuidv4(),
    name: 'Clean bicycle chain',
    currentValue: 0,
    totalValue: 900,
    active: true
  },
  {
    id: uuidv4(),
    name: 'shop maintenance',
    currentValue: 0,
    totalValue: 2000,
    active: true
  }
];

function App() {
  const [intervals, setIntervals] = useState( () => {
    return Storage.loadIntervals() || defaultIntervals;
    // return defaultIntervals;
  });
  const [progressChange, setProgressChange] = useState(0);
  const newIntervalKey = useRef(undefined);

  const raiseBlockingHint = () => toast.info(<p> Deactivation/Activation of intervals blocked! <br /> Wait a moment! </p>, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    });

    const raiseErrorHint = (message) => toast.error(message, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      });

  function removeInterval(intervalId) {
    setIntervals( (prevIntervals) => {
      return prevIntervals.filter( 
        interval => interval.id !== intervalId
      )
    });
  }

  function toggleActive(intervalId) {
    if ( progressChange ) {
      raiseBlockingHint(); 
      return;
    }

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

    newIntervalKey.current = intervals.length;
    setIntervals( (prevIntervals) => {return [...prevIntervals, newInterval]});
  }

  function changeProgressChange(changeValue) {
    setProgressChange((prevChange) => {
      return  prevChange + changeValue;
    });
  }

  function raiseErrorToast(message) {
    raiseErrorHint(message);
  }

  useEffect( ()  => {
    Storage.saveIntervals(intervals);
  }, [intervals]);

  useEffect( () => {
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

    const showChangeTimeout = setTimeout(() => {
      changeActiveIntervalsProgress(progressChange);
      setProgressChange(0);
    }, 3000)
    return () => clearTimeout(showChangeTimeout);
  }, [progressChange, intervals]);

  return (
    <div className='box'>
      <ToastContainer />
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
            newIntervalKey={newIntervalKey.current}
          />
          <AddInterval 
            addInterval={addInterval}
            raiseErrorToast={raiseErrorToast}
          />
        </div>
      </main>
      <footer>
        <p className='loveline'>Made with ?????? in Germany</p>
        <p>background image ?? <a href="https://www.freeimages.com/de/photographer/Marcl5-51783" target='_blank' rel="noreferrer">FreeImages.com/Marcl5</a></p>
        <p>logo designed with ?? <a href="https://de.freelogodesign.org/" target='_blank' rel="noreferrer">FREE LOGO DESIGN</a></p>
        <p>icons from ?? <a href="https://fontawesome.com/" target='_blank' rel="noreferrer">Font Awesome</a></p>
      </footer>
    </div>
  );
}

export default App;
