import React from "react";
import { Bar as VXBar } from "@visx/shape";

function Bar({ width, height, x, y }) {
  return (
    <VXBar
        key={`Key: ${key}`}                        
        x={x}
        y={y}
        width={width}
        height={height}
        fill="rgba(160, 116, 196, 0.69)"
        bottom={0}
    />
  );
}

export default Bar;

