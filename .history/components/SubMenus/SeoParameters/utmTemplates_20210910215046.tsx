import React from 'react'

import { Box } from '../../../primitives/Box'
import { Flex } from '../../../primitives/Flex'

import { atom }  

interface UtmResults {
    id: string; 
    urchin: string;
};

let fetchCounter = 0;

const urlEndpointAtom = atom('/api/urchins/user')
const fetchSeoParams = async (updatedEmail) => {
  const response = await fetch(`/api/urchins/user/${updatedEmail}`)
  return [
    { id: "debug", title: `Fetched ${++fetchCounter} times` },
    ...(await response.json())
  ]
};


const postsAtom = atom(fetchPosts());
const latestPostsAtom = atom(
    (get) => get(postsAtom),
    async (_get, set) => set(postsAtom, await fetchPosts())
);

const SeoParams = () => {

    return (

    );
}