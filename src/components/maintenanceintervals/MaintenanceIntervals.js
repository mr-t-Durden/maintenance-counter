import React from "react";
import MaintenanceBar from "../maintenancebar/MaintenanceBar";

function MaintenanceIntervals(props) {
    return (
        <div className="MaintenanceIntervals">
            {
                props.intervals.map(
                    (interval, i) => {
                        return <MaintenanceBar 
                            key={i}
                            interval={interval}
                            progressChange={props.progressChange}
                            removeInterval={props.removeInterval}
                            toggleActive={props.toggleActive}
                            resetIntervalProgress={props.resetIntervalProgress}
                            new={i === props.newIntervalKey}
                        />;
                    }
                )
            }
        </div>
    );
}

export default MaintenanceIntervals;