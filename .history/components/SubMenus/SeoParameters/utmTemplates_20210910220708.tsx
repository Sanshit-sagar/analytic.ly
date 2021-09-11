import React from 'react'

import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

let fetchCounter = 0;

const fetchSeoParams = async (updatedEmail: string) => {
  const response = await fetch(`/api/urchins/user/${updatedEmail}`)
  return [
    { id: "debug", title: `Fetched ${++fetchCounter} times` },
    ...(await response.json())
  ]
};


const seoParamsAtom = atom(fetchSeoParams('sanshit.sagar@gmail.com'))
const latestSeoParamsAtom = atom(
    (get) => get(seoParamsAtom),
    async (_get, set) => set(seoParamsAtom, await fetchSeoParams())
);

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var raw =  { utmCategory: '', value: '', slug: '', templates: [] }

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(raw),
};


const SeoParams = () => {
    const email = useAtomValue(updatedEmailAtom)
    const [seoParams, refetch] = useAtom(latestSeoParamsAtom)

    const newPost = async () => {
        await fetch(`/api/urchins/user/${email}`, requestOptions)
        await refetch();
    };
    

    return (

    );
}