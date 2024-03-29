import React from 'react';
import { StyledText } from './Text';
import { StitchesVariants, CSS } from '../stitches.config';
import {mergeProps} from '@react-aria/utils'

import * as Polymorphic from '@radix-ui/react-polymorphic';

const DEFAULT_TAG = 'h1';

type TextSizeVariants = Pick<StitchesVariants<typeof StyledText>, 'size'>;

type HeadingCSSProp = { css?: CSS };
type HeadingSizeVariants = '1' | '2' | '3' | '4';
type HeadingVariants = { size?: HeadingSizeVariants } & Omit<StitchesVariants<typeof StyledText>,'size'>;
type HeadingOwnProps = HeadingCSSProp & HeadingVariants;
type HeadingComponent = Polymorphic.ForwardRefComponent<typeof DEFAULT_TAG, HeadingOwnProps>;

export const Heading = React.forwardRef((props, forwardedRef) => {

  const { size = '1', ...textProps } = props;
  const textSize: Record<HeadingSizeVariants, TextSizeVariants['size']> = {
    1: { '@initial': '4', '@bp2': '5' },
    2: { '@initial': '6', '@bp2': '7' },
    3: { '@initial': '7', '@bp2': '8' },
    4: { '@initial': '8', '@bp2': '9' },
  }
  const textCss: Record<HeadingSizeVariants, CSS> = {
    1: { fontWeight: 500, lineHeight: '20px', '@bp2': { lineHeight: '23px' } },
    2: { fontWeight: 500, lineHeight: '25px', '@bp2': { lineHeight: '30px' } },
    3: { fontWeight: 500, lineHeight: '33px', '@bp2': { lineHeight: '41px' } },
    4: { fontWeight: 500, lineHeight: '35px', '@bp2': { lineHeight: '55px' } },
  }

  return (
    <StyledText
        {...textProps}
        as={DEFAULT_TAG}
        ref={forwardedRef}
        size={textSize[size]}
        css={{
            ...(mergeProps(textCss[size], props) as any),
            fontVariantNumeric: 'proportional-nums',
            color: '$funkyText',
            display: 'flex',
            fd: 'row', 
            jc: 'flex-start', 
            ai: 'center', 
            gap: '$2'
        }}
    />
  );
}) as HeadingComponent;