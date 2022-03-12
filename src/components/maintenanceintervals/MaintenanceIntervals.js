import React from "react";
import './MaintenanceIntervals.css';
import MaintenanceBar from "../maintenancebar/MaintenanceBar";

function MaintenanceIntervals(props) {
    return (
        <div className="MaintenanceIntervals">
            {
                props.intervals.map(
                    (interval) => {
                        return <MaintenanceBar 
                            interval={interval}
                            removeInterval={props.removeInterval}
                            toggleActive={props.toggleActive}
                            resetIntervalProgress={props.resetIntervalProgress}
                        />;
                    }
                )
            }
        </div>
    );
}

export default MaintenanceIntervals;