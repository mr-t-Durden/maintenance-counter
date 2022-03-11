import React, {useState} from "react";
import './Incrementor.css';

function Incrementor(props) {
    const [currentIncrement, setCurrentIncrement] = useState(5); 

    function handleIncrementChange() {

    }

    function handleIncrement() {

    }

    function handleDecrement() {
        
    }

    return (
        <div className="Incrementor">
            <p className="increment-button flex-item">-</p>
            <div className="increment-value flex-item">
                <input 
                    type="number" 
                    onChange={handleIncrementChange}
                    id="incrementInput" 
                    placeholder={currentIncrement}
                    value={currentIncrement}
                />
                <label htmlFor="incrementInput">km</label>
            </div>
            <p className="increment-button flex-item">+</p>
        </div>
    );
}

export default Incrementor;