import { render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import './MaintenanceBar.css';

const activeStyle = { border: '3px solid #6BD8FF' }

function MaintenanceBar(props) {
    
    function handleProgressBarClick(e) {
        props.toggleActive(props.interval.id);
    }

    function renderActive() {
        return props.interval.active ? activeStyle : {};
    }

    return (
        <div className="MaintenanceBar">
            <div className="delete-button" title="Remove Interval">
                <p>x</p>
            </div>
            <div className="progress-bar" 
                title="Activate/Deactivate Interval" 
                onClick={handleProgressBarClick}
                style={renderActive()}
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
            <div className="done-checkbox">
                <input type="checkbox" value={props.interval.complete}/>
            </div>
        </div>
    );
}

export default MaintenanceBar;