import React from 'react'

import { config, useSpring, animated } from '@react-spring/web'
import { useGloballyConsistentColors } from '../../hooks/useClicks'

export const Number = ({ value }: IAnimatedNumberProps) => {
    const colors = useGloballyConsistentColors()
    
    const { number } = useSpring({
      reset: true,
      reverse: false,
      from: { number: value-10 },
      number: value,
      delay: 50,
      config: config.molasses,
      onRest: () => console.log('done')
    })
  
    return (
        <animated.div 
            style={{ 
                color: colors.funkyText, 
                fontSize: 24, 
                fontWeight: 'lighter', 
                fontStyle: 'italics', 
                backgroundColor: 'transparent',
                boxShadow: `2px 2px 4px ${colors.funky}` 
            }}
        >
            {number.to((n: number) => n.toFixed(2))}
        </animated.div>
    );
}