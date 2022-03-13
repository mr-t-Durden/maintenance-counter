import React, {useState, useEffect} from "react";
import './MaintenanceBar.css';

const activeStyle = { border: '3px solid #6BD8FF' };
const deactiveStyle = { border: '1px solid #9E5B13' };

const incompleteStyle = { display: 'none' };
const completeStyle = { display: 'block' };

function MaintenanceBar(props) {
    const [complete, setComplete] = useState(false);

    function checkCompleteStatus(interval) {
        return interval.currentValue >= interval.totalValue;
    }

    useEffect( () => {
        setComplete( checkCompleteStatus(props.interval) );
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
        <div className="MaintenanceBar">
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
                    <p className="progress-number">
                        {props.interval.currentValue} / {props.interval.totalValue} km
                    </p>
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