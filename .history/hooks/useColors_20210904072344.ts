import React, { useState } from 'react'

import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'


const DEFAULT_ID = 'default-id'

export const useGloballyConsistentColors = (_id: string | number = DEFAULT_ID)