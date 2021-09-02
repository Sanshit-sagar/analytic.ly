import { NextApiResponse } from 'next'
import getHandler, {  NextApiRequestExtended } from '../../../lib/utils/helpers

import { SlugRankings } from '../../../lib/utils/formatters'
import {
    getViewsForSlug,
    getClickstreamForSlug,
    getUniqueViewsForSlug,
    getUniqueVisitorsForSlug
} from '../../../lib/redis/slugs'
import { 
    getUniqueIpsForSlug,
    getRankedUniqueIpsForSlug 
} from '../../../lib/redis/users'
