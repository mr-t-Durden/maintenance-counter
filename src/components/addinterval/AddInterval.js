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
        if ( !target.value.match(/\w+/) ) {
            setNewName('');
        } else {
            setNewName(target.value);
        }
    }

    function handleNewTotalInputChange({target}) {
        if ( !target.value.match(/\d+/) ) {
            setNewTotal(0);
        } else {
            setNewTotal(parseInt(target.value));
        }
    }

    function handleNewIntervalFormSubmit(event) {
        event.preventDefault();
        if( newName === '' ) {
            props.raiseErrorToast(<p>Name input error! <br/> interval name must be a non-empty string! </p>);
            return;
        }
        if( newTotal === 0 ) {
            props.raiseErrorToast(<p>Interval total error! <br/> Interval total must a non-zero intege! </p>);
            return;
        }
        props.addInterval(newName, newTotal);
        setOpen(false);
        setNewName('');
        setNewTotal(0);
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
                        pattern="\w+"
                        title="name of the new Interval (non-empty string)"
                    />
                </div>
                <div className="form-item">
                    <label htmlFor="newTotal">total (km):</label>
                    <input 
                        id='newTotal' 
                        type="number"
                        value={newTotal}
                        onChange={handleNewTotalInputChange}
                        pattern='[1-9]{1}|\d{2,}'
                        title="total amount of km for the new interval (non-zero, positive integer)"
                    />
                </div>
                <input type="submit" title='Add new Interval' value='Add'/>
            </form>
        </div>
    );
}

export default AddInterval;