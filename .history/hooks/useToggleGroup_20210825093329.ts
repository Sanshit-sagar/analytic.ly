import React from 'react' 
import { useConstant } from '..'

export interface UseOptionalControlledStateProps<Value> {
    controlledValue?: Value;
    initialValue?: Value;
    onChange?(value: Value): void;
}
  
export type UseOptionalControlledStateResponse<Value> = [Value | undefined, (value: Value) => void];







