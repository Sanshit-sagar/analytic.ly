import React, { useState } from 'react'

import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'


const DEFAULT_ID = 'default'

export const useGloballyConsistentColors = (id: string | number = DEFAULT_ID)