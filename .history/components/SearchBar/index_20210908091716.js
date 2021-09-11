function SearchField(props) {
    let {label} = props;
    let state = useSearchFieldState(props);
    let ref = React.useRef();
    let {labelProps, inputProps, clearButtonProps} = useSearchField(
      props,
      state,
      ref
    );
    let {buttonProps} = useButton(clearButtonProps);
  
    return (
      <div className="search-field">
        <label {...labelProps}>{label}</label>
        <div>
          <input {...inputProps} ref={ref} />
          {state.value !== '' && <button {...buttonProps}>❎</button>}
        </div>
      </div>
    );
  }
  