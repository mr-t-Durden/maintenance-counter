import React, { useState, useEffect } from "react";
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
    const [ newName, setNewName ] = useState('');
    const [ newTotal, setNewTotal ] = useState(0);

    useEffect( ()  => {
        const addIntervalForm = document.getElementsByClassName('AddInterval')[0].querySelector('form');
        if (open) {
            addIntervalForm.style.display = 'block';
        } else {
            addIntervalForm.style.display = 'none';
        }
    }, [open]);

    function handleAddButtonClick() {
        setOpen((prev) => {return !prev});
        
    }

    function handleNewNameInputChange({target}) {
        setNewName(target.value);
    }

    function handleNewTotalInputChange({target}) {
        setNewTotal(parseInt(target.value));
    }

    function handleNewIntervalFormSubmit(event) {
        event.preventDefault();
        props.addInterval(newName, newTotal);
        setOpen(false);
    }
    
    return (
        <div className="AddInterval">
            <FontAwesomeIcon 
                id="plusButton"
                icon={solid('circle-plus')} 
                size='3x' 
                style={addButtonStyle}
                title='Add new Interval'
                onClick={handleAddButtonClick}
            />
            <form onSubmit={handleNewIntervalFormSubmit}>
                <h2 className="form-header">New Interval</h2>
                <div className="form-item">
                    <label htmlFor="newName">name:</label>
                    <input 
                        id='newName' 
                        type="text"
                        value={newName}
                        onChange={handleNewNameInputChange}
                    />
                </div>
                <div className="form-item">
                    <label htmlFor="newTotal">total (km):</label>
                    <input 
                        id='newTotal' 
                        type="number"
                        value={newTotal}
                        onChange={handleNewTotalInputChange}
                    />
                </div>
                <input type="submit" title='Add new Interval' value='Add'/>
            </form>
        </div>
    );
}

export default AddInterval;