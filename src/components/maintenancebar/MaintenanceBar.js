import React, {useState, useEffect} from "react";
import './MaintenanceBar.css';

const activeStyle = { border: '3px solid #6BD8FF' };
const deactiveStyle = { border: '1px solid #9E5B13' };

const incompleteStyle = { display: 'none' };
const completeStyle = { display: 'block' };

function MaintenanceBar(props) {
    const [complete, setComplete] = useState(false);
    const [specificProgressChange, setSpecificProgressChange] = useState( () => {
        return getSpecificProgressChange(props.progressChange, props.interval);
    });

    function getSpecificProgressChange(globalProgressChange, interval) {
        const newProgressValue = globalProgressChange + interval.currentValue;

        if( !props.interval.active ) return 0;
        if( complete ) return 0;
        
        if (newProgressValue > interval.totalValue) {
            return interval.totalValue - interval.currentValue;
        }
        if (newProgressValue < 0) {
            return interval.currentValue;
        }
        return globalProgressChange;
    }

    function checkCompleteStatus(interval) {
        return interval.currentValue >= interval.totalValue;
    }

    function updateProgressBar() {
        const currentMaintenanceBar = document.getElementById(props.interval.id);
        const currentProgressFill = currentMaintenanceBar.querySelector('.progress-bar').querySelector('.progress-fill');
        const currentPercentage = (props.interval.currentValue/props.interval.totalValue)*100;
        
        currentProgressFill.style.width = `${currentPercentage}%`;
        
        if( complete ) {
            currentProgressFill.style.backgroundColor = '#EB9E4B';
        } else {
            currentProgressFill.style.backgroundColor = '#237D9E';
        }
    }

    function updateProgressBarChange() {
        const currentMaintenanceBar = document.getElementById(props.interval.id);
        const currentProgressChange = currentMaintenanceBar.querySelector('.progress-bar').querySelector('.progress-change');
        const currentChangePercentage = (specificProgressChange/props.interval.totalValue)*100;

        // reset progressChange style
        currentProgressChange.style.border = 'none';
        currentProgressChange.style.width = '0';
        currentProgressChange.style.left = '0';

        if (currentChangePercentage < 0) {
            currentProgressChange.style.width = `${-currentChangePercentage}%`;
            currentProgressChange.style.left = `${currentChangePercentage}%`;
            currentProgressChange.style.borderRight = '2px solid #EB9E4B';
        } else if (currentChangePercentage > 0) {
            currentProgressChange.style.width = `${currentChangePercentage}%`;
            currentProgressChange.style.borderLeft = '2px solid #EB9E4B';
        } 
    }

    function getChangeValueString(changeValue) {
        if ( changeValue === 0 ) return ('');
        if ( changeValue > 0 ) return (<span className='change-value-number'> + {changeValue}</span>);
        return (<span className='change-value-number'> - {Math.abs(changeValue)}</span>);
    }

    function getProgressNumberString(changeValue, currentValue, totalValue) {
        return (
            <p className="progress-number">
                {currentValue}{getChangeValueString(changeValue)} / {totalValue} km
            </p>
        );
    }

    useEffect( () => {
        setComplete( checkCompleteStatus(props.interval) );
        setSpecificProgressChange(getSpecificProgressChange(props.progressChange, props.interval));
        updateProgressBar();
        updateProgressBarChange();
    } );
    
    function handleProgressBarClick() {
        props.toggleActive(props.interval.id);
    }

    function handleDeleteClick() {
        props.removeInterval(props.interval.id);
    }

    function handleDoneChecked() {
        props.resetIntervalProgress(props.interval.id);
    }

    return (
        <div className="MaintenanceBar" id={props.interval.id}>
            <div 
                className="delete-button" 
                title="Remove Interval"
                onClick={handleDeleteClick}
            >
                <p>x</p>
            </div>
            <div className="progress-bar" 
                title="Activate/Deactivate Interval" 
                onClick={handleProgressBarClick}
                style={props.interval.active ? activeStyle : deactiveStyle}
            >
                <div className="progress">
                    <div className="progress-fill"></div>
                    <p className="interval-name">
                        {props.interval.name}
                    </p>
                    <div className="progress-change"></div>
                    {getProgressNumberString(
                        specificProgressChange,
                        props.interval.currentValue,
                        props.interval.totalValue
                    )}
                </div>
            </div>
            <div 
                className="done-checkbox"
                style={complete ? completeStyle : incompleteStyle}
            >
                <input 
                    type="checkbox" 
                    value={props.interval.complete}
                    onClick={handleDoneChecked}
                />
            </div>
        </div>
    );
}

export default MaintenanceBar;