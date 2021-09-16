import React from 'react' 
import { useMeter, AriaMeterProps } from '@react-aria/meter'


export const Meter = (props: AriaMeterProps) => {
    let = props;

    let {meterProps, labelProps} = useMeter(props);
  
    // Calculate the width of the progress bar as a percentage
    let percentage = (value - minValue) / (maxValue - minValue);
    let barWidth = `${Math.round(percentage * 100)}%`;
  
    return (
        <div {...meterProps} style={{width: 200}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              {label && <span {...labelProps}> {label} </span>}
              {showValueLabel && <span> {meterProps['aria-valuetext']} </span>}
            </div>

            <div style={{height: 10, background: 'gray'}}>
                <div style={{width: barWidth, height: 10, background: 'green'}} />
            </div>
        </div>
    );
}