import React, {useState} from "react";
import './Incrementor.css';

function Incrementor(props) {
    const [incrementValue, setIncrementValue] = useState(5); 

    function handleIncrementChange({target}) {
        setIncrementValue(target.value);
    }

    function handleIncrement() {
        props.changeIntervalProgress(incrementValue);
    }

    function handleDecrement() {
        props.changeIntervalProgress(-incrementValue)
    }

    return (
        <div className="Incrementor">
            <p className="increment-button flex-item">-</p>
            <div className="increment-value flex-item">
                <input 
                    type="number" 
                    onChange={handleIncrementChange}
                    id="incrementInput" 
                    placeholder={incrementValue}
                    value={incrementValue}
                />
                <label htmlFor="incrementInput">km</label>
            </div>
            <p className="increment-button flex-item">+</p>
        </div>
    );
}

export default Incrementor;