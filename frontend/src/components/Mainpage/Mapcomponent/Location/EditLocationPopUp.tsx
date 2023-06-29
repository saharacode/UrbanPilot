import React from 'react';
import Popup from "reactjs-popup";

type Props = {}

function EditLocationPopUp(props:Props) {
    return (
        <div>
            <Popup trigger={<button>Edit</button>}>
                <div className="popupStyle">
                    <h3>testedit</h3>
                </div>
            </Popup>
        </div>
    );
}

export default EditLocationPopUp;