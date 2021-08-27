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

function Spinner() {
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
        strokeWidth={strokeWidth}>
        <circle role="presentation" cx={center} cy={center} r={r} stroke="gray" />
        <circle
          role="presentation"
          cx={center}
          cy={center}
          r={r}
          stroke="orange"
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