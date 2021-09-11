import React from 'react'

import { Box } from '../../../primitives/Box'
import { Flex } from '../../../primitives/Flex'

interface UtmResults {
    id: string; 
    urchin: string;
};

let fetchCounter = 0;

const urlEndpointAtom = atom('/api/urchins/user')
const fetchSeoParams = async () => {
  const response = await fetch(`/api/urchins/user/${updatedEmail}`)
  return [
    { id: "debug", title: `Fetched ${++fetchCounter} times` },
    ...(await response.json())
  ];
};

const SeoParams = () => {

    return (

    );
}