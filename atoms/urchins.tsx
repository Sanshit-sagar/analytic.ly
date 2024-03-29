import { SetStateAction } from 'react'
import { atom } from 'jotai'

export interface IUtmParameters {
    medium: string;
    term: string;
    source: string; 
    campaign: string; 
    content: string; 
}

// export const seoAtom = atom<IUtmParameters>({  medium: '', term: '', source: '', campaign: '', content: '' });
export const seoMediumAtom = atom('')
export const seoTermAtom = atom('')
export const seoSourceAtom = atom('')
export const seoCampaignAtom = atom('')
export const seoContentAtom = atom('')

export const focussedAtom = atom('')
export const focussedParamAtom = atom(
    (get) => get(focussedAtom),
    (_get, set, update: SetStateAction<string>) => set(focussedAtom, update)
)

export const clickedAtom = atom('')
export const clickedParamAtom = atom(
    (get) => get(clickedAtom),
    (_get, set, update: SetStateAction<string>) => set(clickedAtom, update)
)

export const hoveredAtom = atom('')
export const hoveredParamAtom = atom(
    (get) => get(hoveredAtom),
    (_get, set, update: SetStateAction<string>) => set(hoveredAtom, update)
)

export const focussedParamInputAtom = atom(
    (get) => {
        const fAtom = get(focussedParamAtom)
        return fAtom==='medium'   ? get(seoMediumAtom) 
             : fAtom==='source'   ? get(seoSourceAtom) 
             : fAtom==='term'     ? get(seoTermAtom)
             : fAtom==='campaign' ? get(seoCampaignAtom)
             : fAtom==='content'  ? get(seoContentAtom)
             : null; 
    }
);

export const utmAtom = atom('')
export const utmSourceStrAtom = atom((get) => get(seoSourceAtom) ? `utm_source=${get(seoSourceAtom)}&` : '')
export const utmMediumStrAtom = atom((get) => get(seoMediumAtom) ? `utm_medium=${get(seoMediumAtom)}&` : '')
export const utmTermStrAtom = atom((get) => get(seoTermAtom) ? `utm_term=${get(seoTermAtom)}&` : '')
export const utmContentStrAtom = atom((get) => get(seoContentAtom) ? `utm_content=${get(seoContentAtom)}&` : '')
export const utmCampaignStrAtom = atom((get) => get(seoCampaignAtom) ? `utm_campaign=${get(seoCampaignAtom)}` : '')
export const utmStrAtom = atom((get) => {
   return `${get(utmCampaignStrAtom)}${get(utmSourceStrAtom)}${get(utmTermStrAtom)}${get(utmMediumStrAtom)}${get(utmContentStrAtom)}`;
})

export const urlEndpointAtom = atom('/api/urchins/user')
export const fetchUrlAtom = atom(
    (get) => get(urlEndpointAtom),
    (get, set, updatedEmail: string) => {
        set(urlEndpointAtom, `${get(urlEndpointAtom)}/${updatedEmail}`)
    }
)

