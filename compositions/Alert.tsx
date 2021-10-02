import React from 'react';

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogButton,
    AlertDialogActionsRow
} from '../primitives/AlertDialog'

import { Separator } from '../primitives/Separator'

interface AlertProps {
    trigger: React.ReactNode; 
    title: string; 
    description?: string | undefined; 
    content: React.ReactNode;
    cancelText: string | undefined;
    confirmText: string | undefined;
    handleCancel: () => void; 
    handleConfirm: () => void;
}; 

export type ActionType = 'cancel' | 'confirm'

export const Alert = ({
    trigger,
    title,
    description = '',
    content,
    cancelText = 'Cancel',
    confirmText = 'Confirm',
    handleCancel,
    handleConfirm
}: AlertProps) => (
    <AlertDialog props={[]}>
        <AlertDialogTrigger asChild>
            <AlertDialogButton>
                {trigger}
            </AlertDialogButton>
        </AlertDialogTrigger>
        <AlertDialogContent>

            <AlertDialogTitle> 
                {title} 
            </AlertDialogTitle>
            <AlertDialogDescription> 
                {description} 
            </AlertDialogDescription>
            
            <Separator orientation='horizontal' />

            <> {content} </> 

            <AlertDialogActionsRow>
                <AlertDialogCancel asChild>
                    <AlertDialogButton 
                        variant='cancel'
                        onClick={handleCancel}
                    >
                        {cancelText}
                    </AlertDialogButton>
                </AlertDialogCancel>
                
                <AlertDialogAction asChild>
                    <AlertDialogButton 
                        variant='accent' 
                        onClick={handleConfirm}
                    >
                        {confirmText}
                    </AlertDialogButton>
                </AlertDialogAction>
            </AlertDialogActionsRow> 

        </AlertDialogContent>
    </AlertDialog>
);