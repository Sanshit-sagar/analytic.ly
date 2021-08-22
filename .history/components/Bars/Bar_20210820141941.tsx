import React from "react";
import { Bar } from "@visx/shape";

function Bar({ width, height, x, y }) {
  return (
    <Bar                    
        x={x}
        y={y}
        width={width}
        height={height}
        fill="rgba(160, 116, 196, 0.69)"
    />
  );
}

export default Bar;

