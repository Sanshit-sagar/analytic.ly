

 const colorScale: ScaleOrdinal<number, number, never> = scaleOrdinal({
    domain: keys,
    range: ['rgba(255,200,200,1.0)', '#fff', '#667', 'rgba(255,100,100,1.0)', 'hsl(252, 56%, 57%)']
})

const patternScale: ScaleOrdinal<number, number, never> = scaleOrdinal({
    domain: keys,
    range: ['mustard', 'cherry', 'navy', 'transparent', 'transparent', 'transparent', 'transparent']
})
