import React from 'react'

import { Box } from '../../../primitives/Box'
import { Flex } from '../../../primitives/Flex'

import { atom, useAtom } from 'jotai'

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

var raw =  JSON.stringify({ title: "foo", body: "bar",
    userId: 1
  }),

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    body: raw
};

const SeoParams = () => {
    const [seoParams, refetch] = useAtom(latestSeoParamsAtom)

    const newPost = async () => {
        await fetch((`/api/urchins/user/${updatedEmail}`, {
          method: "POST",
          body: JSON.stringify({
            title: "foo",
            body: "bar",
            userId: 1
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        });
        await refetch();
    };
    

    return (

    );
}