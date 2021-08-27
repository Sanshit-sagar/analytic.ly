// import { green } from '@radix-ui/colors'

export const AXIS_COLOR = '#FFF'

export const AXIS_BOTTOM_TICK_LABEL_PROPS = {
    textAnchor: 'middle' as const,
    fontFamily: 'Arial',
    fontSize: 10,
    fill: axisColor,
};

export const AXIS_LEFT_TICK_LABEL_PROPS = {
    dx: '-0.25em',
  dy: '0.25em',
  fontFamily: 'Arial',
  fontSize: 10,
  textAnchor: 'end' as const,
  fill: axisColor,
}