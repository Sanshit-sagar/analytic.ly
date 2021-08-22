import React, { useState, useEffect, useMemo, useRef } 

const DEFAULT_MARGIN  = {
    top: 25, bottom: 25, left: 25, right: 25
};


const Chart = ({ 
    height, 
    width 
}) => {


    if(width < 10) return null;

    return (
        <svg height={height} width={width}>
        
        </svg>
    );
};

export default Chart