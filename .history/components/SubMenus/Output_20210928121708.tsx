import React from 'react'

import { useAtomValue } from 'jotai/utils'
import {
    seoSourceAtom,
    seoMediumAtom,
    seoTermAtom,
    seoContentAtom,
    seoCampaignAtom
} from '../../atoms/urchins'
import { suggestedSlugAtom } from './Slug/SlugTab'
import { destinationInputAtom } from '../../atoms/destination'


import { 
    ReloadIcon,
    GlobeIcon, 
    ThickArrowLeftIcon, 
    ThickArrowRightIcon 
} from '@radix-ui/react-icons'

import { Tooltip } from '../../primitives/Tooltip'
import { TextField } from '../../primitives/TextField'
import { IconButton } from '../../primitives/IconButton'
import { 
    Toolbar, 
    ToolbarLink, 
    ToolbarTextBox,
    ToolbarSeparator, 
    ToolbarButtonGroup 
} from '../../primitives/Toolbar'

import { HoverCard } from '../../compositions/HoverCard'
import { OpenGraphResults } from '../SidePanel/OpenGraph'
import { ToolbarIconButton } from '../../compositions/IconButton'

const utmSource = () => {
    const source = useAtomValue(seoSourceAtom)
    return !source?.length ? '' : `&utm_source=${source}`
}

const utmMedium = () => {
    const medium = useAtomValue(seoMediumAtom)
    return !medium?.length ? '' : `&utm_medium=${medium}`
}

const utmContent = () => {
    const content = useAtomValue(seoContentAtom)
    return !content?.length ? '' : `&utm_content=${content}`
}

const utmCampaign = () => {
    const campaign = useAtomValue(seoCampaignAtom)
    return !campaign?.length ? '' : `&utm_campaign=${campaign}`
}

const utmTerm = () => {
    const term = useAtomValue(seoTermAtom)
    return !term?.length ? '' : `&utm_term=${term}`
}

const destination = () => {
    const destination = useAtomValue(destinationInputAtom)
    return !destination?.length ? '' : destination
}

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

const UndoRedoReset = () => {
    const handleUndo = (_event: React.MouseEvent<HTMLButtonElement>) => console.log('Undoing')
    const handleRedo = (_event: React.MouseEvent<HTMLButtonElement>) => console.log('Redoing')
    const handleReset = (_event:  React.MouseEvent<HTMLButtonElement>) => console.log('Resetting')

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
    );
}

const Actions = () => (
    <ToolbarButtonGroup>
        <OpenGraph /> 
        <UndoRedoReset /> 
    </ToolbarButtonGroup>
)

const FullUrl = () => {
    let fullUrl = `${destination()}${utmMedium()}${utmSource()}${utmContent()}${utmTerm()}${utmCampaign()}`

    return (
        <TextField 
            size='1' 
            type='url'
            value={fullUrl} 
            placeholder='www.example.com'
            disabled={true}
            css={{ 
                width: 600
            }}
        />
    ); 
}

function sanitize(txt: string) {
    if(txt.length >= 20) return `...${txt.substring(txt.length - 20)
}

const SuggestedSlug = () => {
    let suggestion = useAtomValue(suggestedSlugAtom)

    return (
        <Tooltip content={`Your site can be reached @ ${suggestion}`}>
            <ToolbarTextBox>
                <ToolbarLink> 
                    {sanitize(suggestion)}
                </ToolbarLink>
            </ToolbarTextBox>
        </Tooltip>
    ); 
}

export const SubmissionUrl = () => (
    <Toolbar>
        <Actions />
        <ToolbarSeparator /> 
        <SuggestedSlug /> 
        <ToolbarSeparator /> 
        <FullUrl /> 
    </Toolbar>
);

