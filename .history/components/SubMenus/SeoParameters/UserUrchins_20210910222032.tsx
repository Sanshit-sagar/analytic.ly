import React from 'react'

import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'
import { Button } from '../../../primitives/Button'

let fetchCounter = 0;

const fetchSeoParams = async (updatedEmail: string) => {
  const response = await fetch(`/api/urchins/user/${updatedEmail}`);
  return {
     id: "debug", 
     title: `Fetched ${++fetchCounter} times`,
    ...(await response.json())
  }
};

const updatedEmailAtom = atom('sanshit.sagar@gmail.com')
const seoParamsAtom = atom(fetchSeoParams('sanshit.sagar@gmail.com'))
const latestSeoParamsAtom = atom(
    (get) => get(seoParamsAtom),
    async (_get, set) => set(seoParamsAtom, await fetchSeoParams('sanshit.sagar@gmail.com'))
);

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var raw =  { utmCategory: '', value: '', slug: '', templates: [] }

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(raw),
};


export const UserUrchins = () => {
    const email = useAtomValue(updatedEmailAtom)
    const [seoParams, refetch] = useAtom(latestSeoParamsAtom)

    const newPost = async () => {
        await fetch(`/api/urchins/user/${email}`, requestOptions)
        await refetch();
    };
    
    return (
        <Flex css={{ height: '100%', width: '100%', fd: 'row', jc: 'space-evenly', ai: 'stretch', gap: '$4' }}>
            <Button onClick={newPost}> RE-FETCH </Button>
            <br />
            <Text> {JSON.stringify(seoParams)} </Text> 
        </Flex>
    );
}

export UserUrchins