import React from 'react'
import { useAsyncList } from '@react-stately/data'

const AsyncListTest = () => {
    
    let list = useAsyncList({
        async load({ signal }) {
            let res = await fetch(`/api/urchins/user/sanshit.sagar@gmail.com/medium`, { signal })
            let json = await res.json()

            return {
              items: [...json.results.urchins]
            }
        }
    })

    return (

    )
}