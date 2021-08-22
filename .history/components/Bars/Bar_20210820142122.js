import React from "react";
import { Bar as VxBar } from "@visx/shape";

function VxBar({ key, width, height, x, y }) {
  return (
    <Bar    
        key={`label-${key}`}                
        x={x}
        y={y}
        width={width}
        height={height}
    />
  );
}

export default VxBar;

