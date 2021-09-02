import { NextApiResponse } from 'next'
import getHandler, {  NextApiRequestExtended } from '../../../lib/utils/helpers'

import { SlugRankings } from '../../../lib/utils/formatters'
import {
    verifySlug,
    filter
}
