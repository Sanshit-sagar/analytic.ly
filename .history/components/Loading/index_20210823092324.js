import { useProgressBar } from '@react-aria/progress'

function ProgressBar(props) {
    let {
      label,
      showValueLabel = !!label,
      value,
      minValue = 0,
      maxValue = 100
    } = props;
    let {progressBarProps, labelProps} = useProgressBar(props);
  
    // Calculate the width of the progress bar as a percentage
    let percentage = (value - minValue) / (maxValue - minValue);
    let barWidth = `${Math.round(percentage * 100)}%`;
  
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

function 