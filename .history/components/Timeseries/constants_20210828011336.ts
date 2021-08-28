export const AXIS_COLOR_DARK = '#000'
export const AXIS_COLOR_LIGHT = '#fff'
export const AXIS_COLOR = '#000'

export const getThemedBottomAxis = ({ darkMode }: { darkMode: boolean }) => {
    return ({
        textAnchor: 'middle' as const,
        fontFamily: 'Arial',
        fontSize: 10,
        fill: !darkMode ? AXIS_COLOR_LIGHT : AXIS_COLOR_DARK
    });
};

export const AXIS_BOTTOM_TICK_LABEL_PROPS = {
    textAnchor: 'middle' as const,
    fontFamily: 'Arial',
    fontSize: 10,
};

export const AXIS_LEFT_TICK_LABEL_PROPS = {
    dx: '-0.25em',
    dy: '0.25em',
    fontFamily: 'Arial',
    fontSize: 10,
    textAnchor: 'end' as const,
};