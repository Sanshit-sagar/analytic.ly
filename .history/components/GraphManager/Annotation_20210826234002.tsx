



const XAxisLabelAnnotation = () => {

    return (
        <animated.g style={{ opacity: 0.7 }}>
    <Annotation
        x={width - 75}
        y={height - 75}
        dx={50}
        dy={25}
            >
                <Label
                    // showAnchorLine
                    // anchorLineStroke="rgba(255,255,25
                    showBackground={false}
                    title={'TIME'}
                    subtitle={''}
                    fontColor="rgba(250,255,200,0.75)"
                    width={100}
                    horizontalAnchor={'middle'}
                    backgroundPadding={{
                        left: 0,
                        right: 8,
                        top: 0,
                        bottom: 10
                    }}
                />
            </Annotation>
        </animated.g>
    )
}