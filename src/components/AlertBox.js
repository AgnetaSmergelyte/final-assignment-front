import React from 'react';

const AlertBox = ({alert, setAlert}) => {
    return (
        <div className="alert">
            <div className="p10 d-flex f-col a-center g10">
                <p className="mb-10">{alert}</p>
                <button className="btn-send" onClick={() => setAlert(null)}>OK</button>
            </div>
        </div>
    );
};

export default AlertBox;