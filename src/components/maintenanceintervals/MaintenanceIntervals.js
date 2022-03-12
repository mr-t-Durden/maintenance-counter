import React from "react";
import './MaintenanceIntervals.css';

function MaintenanceIntervals(props) {
    return (
        <div className="MaintenanceIntervals">
            {
                props.intervals.map(
                    (interval) => {
                        return <MaintenanceBar 
                            interval={interval}
                            onRemove={props.removeInterval}
                            onClick={props.toggleActive}
                            onDone={props.resetIntervalProgress}
                        />;
                    }
                )
            }
        </div>
    );
}

export default MaintenanceIntervals;