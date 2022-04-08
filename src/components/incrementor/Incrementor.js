import React, {useState} from "react";
import './Incrementor.css';
import '../general.css';

function Incrementor(props) {
    const [incrementValue, setIncrementValue] = useState(5); 

    function handleIncrementChange({target}) {
        if ( !target.value.match(/\d+/) ) {
            setIncrementValue(0);
        } else {
            const incrementNumber = parseInt(target.value);
            setIncrementValue(incrementNumber);
            target.value=incrementNumber;
        }
    }

    function handleIncrement() {
        props.changeIntervalProgress(incrementValue);
    }

    function handleDecrement() {
        props.changeIntervalProgress(-incrementValue)
    }

    return (
        <div className="Incrementor">
            <p 
                className="increment-button flex-item button" 
                onClick={handleDecrement}
                title="decrement active intervals"
            >-</p>
            <div className="increment-value flex-item">
                <input 
                    type="number" 
                    onChange={handleIncrementChange}
                    id="incrementInput" 
                    placeholder={incrementValue}
                    value={incrementValue}
                    title="value to increment/decrement active intervals progress (positive integer)"
                />
                <label htmlFor="incrementInput">km</label>
            </div>
            <p 
                className="increment-button flex-item button" 
                onClick={handleIncrement}
                title="increment active intervals"
            >+</p>
        </div>
    );
}

export default Incrementor;