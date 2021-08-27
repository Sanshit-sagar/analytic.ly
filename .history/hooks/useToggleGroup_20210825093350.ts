import React from 'react' 
import { useConstant } from './useConstant' 

  
export type UseOptionalControlledStateResponse<Value> = [Value | undefined, (value: Value) => void];

export interface UseOptionalControlledStateProps<Value> {
    controlledValue?: Value;
    initialValue?: Value;
    onChange?(value: Value): void;
}





