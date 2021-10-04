import React from 'react'

import { useAtomValue } from 'jotai/utils'
import { suggestedSlugAtom } from './Slug/SlugTab'

import { 
    ReloadIcon,
    GlobeIcon, 
    ThickArrowLeftIcon, 
    ThickArrowRightIcon, 
    ClipboardCopyIcon
} from '@radix-ui/react-icons'

import { Flex } from '../../primitives/Flex'
import { Tooltip } from '../../primitives/Tooltip'
import { IconButton } from '../../primitives/IconButton'
import {
    Toolbar,
    ToolbarLink,
    ToolbarTextBox,
    ToolbarSeparator,
    ToolbarButtonGroup
} from '../../primitives/Toolbar'

import { HoverCard } from '../../compositions/HoverCard'
import { ToolbarIconButton } from '../../compositions/IconButton'

import { FullUrl } from './data'
import { Submit } from './Submit'
import { OpenGraphResults } from '../SidePanel/OpenGraph'

import toast from 'react-hot-toast'

const sanitize = (txt: string) => txt.length >= 20 ? `...${txt.substring(txt.length - 20)}` : txt

const OpenGraph = () => (
    <HoverCard 
        trigger={
            <IconButton size='2' variant='ghost'>
                <GlobeIcon />
            </IconButton>
        }
        content={<OpenGraphResults />}
    />
)

const 

const UndoRedoReset = () => {
    const handleUndo = (_event: React.MouseEvent<HTMLButtonElement>) => toast.success('Undoing')
    const handleRedo = (_event: React.MouseEvent<HTMLButtonElement>) => toast.success('Redoing')
    const handleReset = (_event:  React.MouseEvent<HTMLButtonElement>) => toast.success('Resetting')

    return (
        <>
            <ToolbarIconButton 
                icon={<ThickArrowLeftIcon />} 
                label={'Undo'} 
                onClick={handleUndo}
            /> 
            <ToolbarIconButton 
                icon={<ThickArrowRightIcon />} 
                label={'Redo'} 
                onClick={handleRedo}
            />
             <ToolbarIconButton 
                icon={<ReloadIcon />} 
                label={'Reset'} 
                onClick={handleReset}
            />
        </>
    )
}

const Actions = () => (
    <ToolbarButtonGroup>
        <OpenGraph /> 
        <UndoRedoReset /> 
    </ToolbarButtonGroup>
)

const SuggestedSlug = () => {
    const [isCopied, setIsCopied] = React.useState(false)
    let suggestion = useAtomValue(suggestedSlugAtom)

    const handleCopyToClipboard = () => {
        setIsCopied(true)
        toast(`Copied ${suggestion} to clipboard`)
    }

    return (
        <ToolbarTextBox>
            <Tooltip content={`Your site can be reached @ ${suggestion}`}>
                <ToolbarLink> {sanitize(suggestion)} </ToolbarLink>
            </Tooltip>
            <Tooltip content={isCopied ? `${suggestion} is already copied to clipboard` : `Copy ${suggestion} to clipboard?`}>
                <Flex css={{ mb: '$2', cursor: 'copy' }}>
                    <ToolbarIconButton
                        icon={<ClipboardCopyIcon />}
                        label={'Copy to Clipboard'}
                        onClick={handleCopyToClipboard}
                    />
                </Flex> 
            </Tooltip>
        </ToolbarTextBox>
    )
}

export const SubmissionUrl = () => (
    <Toolbar>
        <Actions />
        <ToolbarSeparator /> 
        <SuggestedSlug /> 
        <ToolbarSeparator /> 
        <FullUrl /> 
        <Submit /> 
    </Toolbar>
);

