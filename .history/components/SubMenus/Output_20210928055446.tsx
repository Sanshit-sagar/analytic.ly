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
import { LargeControlGroup } from '../../primitives/FieldSet'
// import { Flex } from '../../primitives/Flex'

// import { 
//     focussedParamAtom, 
//     clickedParamAtom, 
//     hoveredParamAtom 
// } from '../../atoms/urchins'

// import { ScrollArea } from '../../primitives/ScrollArea'

// const OutputContainer = styled('div', {
//     height: '4em',
//     lineHeight: '1em',
//     overflowX: 'scroll',
//     overflowY: 'hidden',
//     margin: '$3', 
//     padding: '$2', 
//     gap: 0,
//     border: '2px solid $border',
//     '&:hover': {
//         borderColor: '$border3'
//     }
// })

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


// const Hovered = () => {
//     const hovered = useAtomValue(hoveredParamAtom)
//     return <Text size='4'> HOVER: {hovered} </Text>
// }

export const SubmissionUrl = () => {
    let fullUrl = `${destination()}${utmMedium()}${utmSource()}${utmContent()}${utmTerm()}${utmCampaign()}`
    // const pieces = [`${destination()}`, `${utmMedium()}`, `${utmSource()}`, `${utmContent()}`, `${utmTerm()}`, `${utmCampaign()}`]

    const [value, setValue] = React.useState('')

    const handleChange = () => {
        if(fullUrl.length > 75) setValue(fullUrl.substring(fullUrl.length - 200))
        else setValue(fullUrl) 
    }

    React.useEffect(() => {
        handleChange()
    }, [fullUrl])

    return (
        <LargeControlGroup>
        <TextField 
            size='1' 
            type='url'
            value={value} 
            placeholder='www.example.com'
            disabled={true}
        />
        </LargeControlGroup>
    )
}
