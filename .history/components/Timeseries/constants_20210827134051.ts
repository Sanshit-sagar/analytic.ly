export const AXIS_COLOR_DARK = '#000'
export const AXIS_COLOR_LIGHT = '#fff'

export const AXIS_BOTTOM_TICK_LABEL_PROPS = ({ darkMode }) => {
    return ({
        textAnchor: 'middle' as const,
        fontFamily: 'Arial',
        fontSize: 10,
        fill: darkMode ? AXIS_COLOR_LIGHT
    });
};

export const AXIS_LEFT_TICK_LABEL_PROPS = {
    dx: '-0.25em',
    dy: '0.25em',
    fontFamily: 'Arial',
    fontSize: 10,
    textAnchor: 'end' as const,
    fill: AXIS_COLOR
};