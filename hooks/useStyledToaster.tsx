// import React from 'react'

import { 
    useGloballyConsistentColors 
} from './useColors'
import {
    CheckCircledIcon,
    CrossCircledIcon
} from '@radix-ui/react-icons'

export const useStyledToaster = () => {
    const colors = useGloballyConsistentColors()

    return { 
        style: { 
            minWidth: '350px', 
            maxWidth: '425px',
            color: colors.text, 
            background: colors.accent, 
            border: `2px solid ${colors.border}`, 
            borderRadius: 5,
            '&:hover': { 
                backgroundColor: colors.accentHover, 
                borderColor: colors.border3
            },
            '&:focus': {
                backgroundColor: colors.accentPressed, 
                borderColor: colors.funky 
            }
        }, 
        success: { 
            duration: 10000, 
            icon: <CheckCircledIcon />,
            iconTheme: {
                primary: 'green',
                secondary: colors.text,
            },
        },
        error: {
            duration: 10000,
            icon: <CrossCircledIcon />,
            iconTheme: {
                primary: 'red',
                secondary: colors.text,
            },
        }
    }
}