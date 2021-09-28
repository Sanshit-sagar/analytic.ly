import React from 'react'
// import { styled } from '../../stitches.config'

import { useAtomValue } from 'jotai/utils'
import {
    seoSourceAtom,
    seoMediumAtom,
    seoTermAtom,
    seoContentAtom,
    seoCampaignAtom
} from '../../atoms/urchins'
import { destinationInputAtom } from '../../atoms/destination'

import { TextField } from '../../primitives/TextField'
import { ToolbarIconButton } from '../../compositions/IconButton'
import { Toolbar, ToolbarSeparator, ToolbarLink, ToolbarButtonGroup } from '../../primitives/Toolbar'
import { ThickArrowLeftIcon, ThickArrowRightIcon } from '@radix-ui/react-icons'


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

const UndoRedo = () => {
    const handleUndo = (_event: React.MouseEvent<HTMLButtonElement>) => console.log('Undoing')
    const handleRedo = (_event: React.MouseEvent<HTMLButtonElement>) => console.log('Redoing')

    return (
        <ToolbarButtonGroup>
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
        </ToolbarButtonGroup>
    );
}

const FullUrl = () => {
    let fullUrl = `${destination()}${utmMedium()}${utmSource()}${utmContent()}${utmTerm()}${utmCampaign()}`

    return (
        <TextField 
            size='1' 
            type='url'
            value={fullUrl} 
            placeholder='www.example.com'
            disabled={true}
            css={{ width: '600px', height: '100%', fontSize: '$3' }}
        />
    ); 
}

const LastEdit = () => {
    let lastEditedAt = '2 hours ago'
    return (
        <Tooltip content={'last edit'}
        <ToolbarLink> {lastEditedAt} </ToolbarLink>
    ); 
}

export const SubmissionUrl = () => {
   

    return (
        <Toolbar>
            <UndoRedo /> 
            <ToolbarSeparator /> 
            <FullUrl /> 
            <ToolbarSeparator /> 
        </Toolbar>
    )
}
