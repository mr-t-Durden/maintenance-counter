import React, { useState } from "react";
import './AddInterval.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

const addButtonStyle = {
    color: '#EB9E4B',
    fontSize: '2rem',
    margin: '5px',
    cursor: 'pointer'
};

function AddInterval(props) {
    const [open, setOpen] = useState(false);
    
    return (
        <div className="AddInterval">
            <FontAwesomeIcon 
                icon={solid('circle-plus')} 
                size='3x' 
                style={addButtonStyle}
                title='Add new Interval'
            />
            <form action="">
                <h2 className="form-header">New Interval</h2>
                <div className="form-item">
                    <label htmlFor="newName">name:</label>
                    <input id='newName' type="text"/>
                </div>
                <div className="form-item">
                    <label htmlFor="newTotal">total (km):</label>
                    <input id='newTotal' type="number"/>
                </div>
                <input type="submit" title="Add Interval" value='Add'/>
            </form>
        </div>
    );
}

export default AddInterval;