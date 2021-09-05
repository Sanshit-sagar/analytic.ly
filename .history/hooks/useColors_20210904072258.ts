import React, { useState } from 'react'

import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

export const useGloballyConsistentColors = (id: string | number | )