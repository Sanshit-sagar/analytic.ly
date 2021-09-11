import React, { useState } from 'react' 

import { Provider, atom, useAtom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { a, useTransition } from '@react-spring/web'

type Alternate {
    id: string;
    title?: string;
    url: string;
}

