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

import { ToolbarIconButton } from '../../primitives/Icon'
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

const Actions = () => {

    return (
        <ToolbarButtonGroup>
            <ToolbarIconButton icon={<ThickArrowLeftIcon />} label={'Undo'} onClick={() => handleUndo()} /> 
            <ToolbarIconButton icon={<ThickArrowLeftIcon />} label={'Undo'} onClick={() => handleUndo()} />
            <IconButtonWithTooltip> 
                <ThickArrowRightIcon /> 
            </IconButtonWithTooltip> 
        </ToolbarButtonGroup>
    );
}

export const SubmissionUrl = () => {
    let fullUrl = `${destination()}${utmMedium()}${utmSource()}${utmContent()}${utmTerm()}${utmCampaign()}`

    return (
        <Toolbar>
            <Actions /> 
            <ToolbarSeparator /> 
            <TextField 
                size='1' 
                type='url'
                value={fullUrl} 
                placeholder='www.example.com'
                disabled={true}
                css={{ width: '600px', height: '100%', fontSize: '$3' }}
            />
            <ToolbarSeparator /> 
        </Toolbar>
    )
}
