import React, { useEffect } from 'react'
import { useProgressBar } from '@react-aria/progress'
import { useGloballyConsistentColors } from '../../hooks/useColors'

function ProgressBar(props: any) {
    let {
      label,
      showValueLabel = !!label,
      value,
      minValue = 0,
      maxValue = 100
    } = props;
    let {progressBarProps, labelProps} = useProgressBar(props);
  
    
    let percentage = (value - minValue) / (maxValue - minValue)
    let barWidth = `${Math.round(percentage * 100)}%`
  
    return (
        <div {...progressBarProps} style={{width: 200}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {label && <span {...labelProps}>{label}</span>}
                {showValueLabel && <span>{progressBarProps['aria-valuetext']}</span>}
            </div>
            <div style={{height: 10, background: 'gray'}}>
                <div style={{width: barWidth, height: 10, background: 'orange'}} />
            </div>
        </div>
    );
}

const Spinner = () => {
    const colors = useGloballyConsistentColors()
    const [value, setValue] = React.useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => (v === 9 ? 0 : v + 1));
        }, 5000);
    }, []);

    
    let {progressBarProps} = useProgressBar({
      isIndeterminate: true,
      'aria-label': 'Loading...'
    });
  
    let center = 16;
    let strokeWidth = 4;
    let r = 16 - strokeWidth;
    let c = 2 * r * Math.PI;
    let offset = c - (1 / 4) * c;
  
    return (
        <svg
            {...progressBarProps}
            width={32}
            height={32}
            viewBox="0 0 32 32"
            fill="none"
            strokeWidth={strokeWidth}
        >
            <circle role="presentation" cx={center} cy={center} r={r} stroke="gray" />
            <circle
                role="presentation"
                cx={center}
                cy={center}
                r={r}
                stroke={colors[value]}
                strokeDasharray={c}
                strokeDashoffset={offset}>
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    begin="0s"
                    dur="1s"
                    from="0 16 16"
                    to="360 16 16"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    );
}

type LoadingType = 'spinner' | 'bar'

interface LoadingProps {
    isIndeterminate?: boolean; 
    value?: number; 
    type?: LoadingType;
}

export const Loading = ({ isIndeterminate = true, value = 100, type }: LoadingProps) => {

    const label = 'Loading...'
    const loadingValue = value && !isIndeterminate ? value : 100

    if(!type || type==='spinner') return <Spinner /> 
    if(isIndeterminate) return <ProgressBar label={label} value={loadingValue} />
    return <ProgressBar label={label} isIndeterminate={true} />           
}