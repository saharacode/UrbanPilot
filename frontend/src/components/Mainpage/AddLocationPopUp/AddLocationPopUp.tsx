import React from 'react';
import Popup from 'reactjs-popup';
import './Popup.css';

type Props = {
}

function AddLocationPopUp(props:Props) {
    return (
        <div>
            <Popup trigger={<button>Add location</button>}>
                <div className="popupStyle">
                    <h3>Add a new Location</h3>
                    <div>
                        <form>
                            <div>
                                <label>Name:</label>
                                <input type={"text"} />
                            </div>
                            <div>
                                <label>Description:</label>
                                <input type={"text"}/>
                            </div>
                            <button type={"submit"}>Add location</button>
                        </form>
                    </div>
                </div>
            </Popup>
        </div>
    );
}

export default AddLocationPopUp;