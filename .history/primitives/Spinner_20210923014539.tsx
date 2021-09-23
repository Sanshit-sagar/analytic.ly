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