import React, { useState, useEffect } from 'react';


const ControlPanel = ({ updateEndpoint }) => {
    const items = [
        { id: 0, name: '1min', urlvalue: '/1/mins'},
        { id: 1, name: '10min', urlvalue: '/10/mins'},
        { id: 2, name: '30min', urlvalue: '/30/mins'},
        { id: 3, name: '6hour', urlvalue: '/6/hours'},
        { id: 4, name: '24hour', urlvalue: '/24/hours'},
        { id: 5, name: '30hour', urlvalue: '/30/hours'},
        { id: 6, name: '36hour', urlvalue: '/36/hours'},
        { id: 7, name: '48hour', urlvalue: '/48/hours'},
    ]

    const handleClick = (e) => {
        let urlvalue = items[e.currentTarget.value].urlvalue
        let newString = `/api/clicks/recents${urlvalue}`;
        updateEndpoint(newString)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            {items.map((item, index) => {
                return (
                    <button 
                        value={index}
                        type="button" 
                        onClick={handleClick}
                        style={{ backgroundColor: 'white', color: 'black', border: 'thin solid black', borderRadius:'5px', padding: '5px 2.5px'}}
                    > 
                        {item.name} 
                    </button>
                );
            })}
        </div>
    )
}

export default ControlPanel