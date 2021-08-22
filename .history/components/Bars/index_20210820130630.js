import React, { useState, useEffect, useMemo, useRef } from 'react'
import Loading from '../Loading'
import { useUniques } from '../../lib/utils'

const DEFAULT_MARGIN  = {
    top: 25, bottom: 25, left: 25, right: 25
};


const CustomChart = ({ 
    height, 
    width,
    margin={DEFAULT_MARGIN}
}) => {

    const { uniques, loading, error } = useUniques(); 


    if(error) return <p> error! </p>
    if(width < 10) return null;

    return (
        <>
        {loading ? <Loading /> : <Text> {JSON.stringify(uniques)} </Text> }
        </>
    );
};


export default CustomChart