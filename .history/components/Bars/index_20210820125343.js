import React, { useState, useEffect, useMemo, useRef } 
import Loading from '../Loading'
import { useUniques } from '../convince'

const DEFAULT_MARGIN  = {
    top: 25, bottom: 25, left: 25, right: 25
};


const Chart = ({ 
    height, 
    width 
}) => {

    const { uniques, loading, error } = useUniques(); 


    if(width < 10) return null;

    return (
        <>
        {loading ? <Loading /> : <Text> {JSON.stringify(uniques)} </Text> }
        </>
    );
};

export default Chart