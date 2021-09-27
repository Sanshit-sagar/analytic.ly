import React from 'react'
import { styled, CSS, StitchesVariants } from '../stitches.config'
import type * as Polymorphic from '@radix-ui/react-polymorphic'
import { 
    red, 
    crimson, 
    pink, 
    purple, 
    cyan, 
    indigo, 
    green, 
    blue, 
    gold, 
    bronze, 
    slate, 
    violet, 
    teal, 
    lime, 
    yellow, 
    orange 
} from '@radix-ui/colors'

const DEFAULT_TAG = 'span';

export const StyledText = styled(DEFAULT_TAG, {

  margin: '0',
  lineHeight: '1',
  fontWeight: 200,
  display: 'block',
  fontVariantNumeric: 'tabular-nums',

  variants: {
    size: {
      '1': {
        fontSize: '$1',
      },
      '2': {
        fontSize: '$2',
      },
      '3': {
        fontSize: '$3',
      },
      '4': {
        fontSize: '$4',
      },
      '5': {
        fontSize: '$5',
        letterSpacing: '-.015em',
      },
      '6': {
        fontSize: '$6',
        letterSpacing: '-.016em',
      },
      '7': {
        fontSize: '$7',
        letterSpacing: '-.031em',
        textIndent: '-.005em',
      },
      '8': {
        fontSize: '$8',
        letterSpacing: '-.034em',
        textIndent: '-.018em',
      },
      '9': {
        fontSize: '$9',
        letterSpacing: '-.055em',
        textIndent: '-.025em',
      },
    },
    variant: {
      red: {
        color: red.red11,
      },
      crimson: {
        color: crimson.crimson11,
      },
      pink: {
        color: pink.pink11,
      },
      purple: {
        color: purple.purple11,
      },
      violet: {
        color: violet.violet11,
      },
      indigo: {
        color: indigo.indigo11,
      },
      blue: {
        color: blue.blue11,
      },
      cyan: {
        color: cyan.cyan11,
      },
      teal: {
        color: teal.teal11,
      },
      green: {
        color: green.green11,
      },
      lime: {
        color: lime.lime11,
      },
      yellow: {
        color: yellow.yellow11,
      },
      orange: {
        color: orange.orange11,
      },
      gold: {
        color: gold.gold11,
      },
      bronze: {
        color: bronze.bronze11,
      },
      gray: {
        color: slate.slate11,
      },
      contrast: {
        color: '$hiContrast',
      },
    },
    gradient: {
      true: {
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    },
  },
  compoundVariants: [
    {
      variant: 'bronze',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $bronze11, $bronze9)',
      },
    },
    {
      variant: 'blue',
      gradient: 'true',
      css: {
        background: `linear-gradient(to right, ${blue.blue11}, ${blue.blue12})`,
      },
    },
    {
      variant: 'contrast',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $hiContrast, $gray12)',
      },
    },
  ],
    defaultVariants: {
        size: '1',
        variant: 'contrast',
    },
});

type TextCSSProp = { css?: CSS };

// TODO: Remove omit fix when this is merged https://github.com/modulz/stitches/issues/421
type TextVariants = Omit<StitchesVariants<typeof StyledText>, 'size'>;
type TextOwnProps = TextCSSProp & TextVariants & { size?: any };

type TextComponent = Polymorphic.ForwardRefComponent<typeof DEFAULT_TAG, TextOwnProps>;

export const Text = React.forwardRef((props, forwardedRef) => {
  return <StyledText {...props} ref={forwardedRef} />;
}) as TextComponent;

Text.toString = () => `.${StyledText.className}`;