import React from "react";
import { Bar as VxBar } from "@visx/shape";

function Bar({ key, width, height, x, y }) {
  return (
    <VxBar    
        key={`label-${key}`}                
        x={x}
        y={y}
        width={width}
        height={height}
    />
  );
}

export default Bar;

