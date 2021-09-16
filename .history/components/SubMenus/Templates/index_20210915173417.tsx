import React from 'react'

import { CustomTree } from '../../compositions/Tree'


const Templates = () => {

    return (
        <Box css={{ width: '100%', height: '100%', border: 'thin solid $border', bc: 'transparent', margin: '$1', padding: '$1' }}>
            <Text size='$5'> Custom Tree </Text> 
            <CustomTree />
        </Box> 
    )
}
