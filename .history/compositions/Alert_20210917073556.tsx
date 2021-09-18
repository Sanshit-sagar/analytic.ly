import React from 'react';
import { styled, keyframes } from '@stitches/react';
import { violet, blackA, red, mauve } from '@radix-ui/colors';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel
} from '../primitives/A'
// Exports
const AlertDialog = Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogContent = StyledContent;
const AlertDialogTitle = StyledTitle;
const AlertDialogDescription = StyledDescription;
const AlertDialogAction = AlertDialogPrimitive.Action;
const AlertDialogCancel = AlertDialogPrimitive.Cancel;

// Your app...
const Flex = styled('div', { display: 'flex' });

const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,

  variants: {
    variant: {
      violet: {
        backgroundColor: 'white',
        color: violet.violet11,
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        '&:hover': { backgroundColor: mauve.mauve3 },
        '&:focus': { boxShadow: `0 0 0 2px black` },
      },
      red: {
        backgroundColor: red.red4,
        color: red.red11,
        '&:hover': { backgroundColor: red.red5 },
        '&:focus': { boxShadow: `0 0 0 2px ${red.red7}` },
      },
      mauve: {
        backgroundColor: mauve.mauve4,
        color: mauve.mauve11,
        '&:hover': { backgroundColor: mauve.mauve5 },
        '&:focus': { boxShadow: `0 0 0 2px ${mauve.mauve7}` },
      },
    },
  },

  defaultVariants: {
    variant: 'violet',
  },
});

const AlertDialogDemo = () => (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button>
                Delete account
            </Button>
        </AlertDialogTrigger>

        <AlertDialogContent >
            <AlertDialogTitle>
                Are you absolutely sure?
            </AlertDialogTitle>

            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data
                from our servers.
            </AlertDialogDescription>

            <Flex css={{ jc: 'flex-end' }}>
                <AlertDialogCancel asChild>
                    <Button 
                        variant="accent" 
                        css={{ marginRight: 25 }}
                    >
                      Cancel
                    </Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                    <Button variant="accent">
                        Yes, delete account
                    </Button>
                </AlertDialogAction>
            </Flex>
        </AlertDialogContent>
    </AlertDialog>
);

export default AlertDialogDemo;
