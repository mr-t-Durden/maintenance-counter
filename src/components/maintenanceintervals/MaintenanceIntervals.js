import React from "react";
import MaintenanceBar from "../maintenancebar/MaintenanceBar";
import { motion, AnimatePresence } from 'framer-motion';

function MaintenanceIntervals(props) {
    return (
        <div className="MaintenanceIntervals">
            <AnimatePresence>
                {props.intervals.map(
                        (interval, i) => {
                            return <ListItem key={interval.id}>
                                    <MaintenanceBar 
                                        interval={interval}
                                        progressChange={props.progressChange}
                                        removeInterval={props.removeInterval}
                                        toggleActive={props.toggleActive}
                                        resetIntervalProgress={props.resetIntervalProgress}
                                    />
                                </ListItem>
                        }
                    )
                }
            </AnimatePresence>
        </div>
    );
}

function ListItem({children}){    
    const animations = {
        layout: true,
        transition: { ease: "easeOut", duration: .5 },
        initial: {scale: 0},
        animate: {scale: 1},
        exit: {scale: 0}
    };
    return <motion.div {...animations} >{children}</motion.div>;
}

export default MaintenanceIntervals;