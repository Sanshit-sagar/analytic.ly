import React from "react";
import { Bar } from "@visx/shape";

function Bar({ key, width, height, x, y }) {
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

export default Bar;

