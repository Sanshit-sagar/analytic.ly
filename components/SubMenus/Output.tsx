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

import { Tooltip } from '../../primitives/Tooltip'
import { IconButton } from '../../primitives/IconButton'
import {
    Toolbar,
    ToolbarLink,
    ToolbarTextBox,
    ToolbarSeparator as TBAR,
    ToolbarButtonGroup as Group,
} from '../../primitives/Toolbar'

import { HoverCard } from '../../compositions/HoverCard'
import { ToolbarIconButton } from '../../compositions/IconButton'

import { FullUrl } from './data'
import { Submit } from './Submit'
import { OpenGraphResults } from '../SidePanel/OpenGraph'
import { useCopyToClipboard } from '../../hooks/useCopy'

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

const Undo = () => {
    const handleUndo = (_event: React.MouseEvent<HTMLButtonElement>) => toast.success('Undoing')
    return (
        <ToolbarIconButton 
            icon={<ThickArrowLeftIcon />} 
            label={'Undo'} 
            onClick={handleUndo}
        /> 
    )
}

const Redo = () => {
    const handleRedo = (_event: React.MouseEvent<HTMLButtonElement>) => toast.success('Redoing')
    return (
        <ToolbarIconButton 
            icon={<ThickArrowRightIcon />} 
            label={'Redo'} 
            onClick={handleRedo}
        />
    )
}

const Reset = () => {
    const handleReset = (_event:  React.MouseEvent<HTMLButtonElement>) => toast.success('Resetting')

    return (       
        <ToolbarIconButton 
            icon={<ReloadIcon />} 
            label={'Reset'} 
            onClick={handleReset}
        />
    )
}

const COPY_SUCCESS = `Copied to clipboard successfully` 
const COPY_FAILURE = 'Oh no, something went wrong, try again?'

const Copy = () => {
    let suggestion = useAtomValue(suggestedSlugAtom)
    const [value, copy] = useCopyToClipboard()

    const handleCopyToClipboard = () => {
        if(value?.length && suggestion?.length && value===suggestion) {
            toast(`Already copied ${value}`)
            return
        }
        copy(suggestion)
        toast(COPY_SUCCESS);
    }

    return (
        <ToolbarIconButton
            icon={<ClipboardCopyIcon />}
            label={
                    value?.length && suggestion?.length && value===suggestion 
                ?  `Already copied ${suggestion}!` 
                :  `Copy ${suggestion} to Clipboard?`
            }
            onClick={handleCopyToClipboard}
        />
    )
}

const Suggestion = () => {
    let suggestion = useAtomValue(suggestedSlugAtom)

    return (
        <ToolbarTextBox>
            <Tooltip content={`Your site can be reached @ ${suggestion}`}>
                <ToolbarLink> {sanitize(suggestion)} </ToolbarLink>
            </Tooltip>
        </ToolbarTextBox>
    )
}

export const SubmissionUrl = () => (
    <Toolbar 
        aria-label='Menu Toolbar' 
        css={{ height: 40 }}
    >
        <Group>
            {/* <OpenGraph />  */}
            <Undo /> 
            <Redo />
            <Reset /> 
            <Copy /> 
        </Group>

        <TBAR />
        <Suggestion /> 
        <TBAR />

        <FullUrl /> 
        <Submit /> 
    </Toolbar>
);

