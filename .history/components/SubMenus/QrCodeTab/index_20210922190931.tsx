import React from 'react'
import { useAsyncList } from '@react-stately/data'
import { ComboBox } from '../../../compositions/ComboBox'
import { Item } from 'react-stately'

export const AsyncListTest = () => {
    const [list, setList] = React.useState
    // let list = useAsyncList({
    //     async load({ signal }: { signal: any; }) {
    //         let res = await fetch(`/api/urchins/user/sanshit.sagar@gmail.com/medium`, { signal })
           
    //         return {
    //           items: res.items.urchins,
    //         }
    //     }
    // })
    useEffect(() => {
        let res = await fetch(`/api/urchins/user/sanshit.sagar@gmail.com/medium`)

    }, [])

    return (
        <ComboBox
            label="Star Wars Character Lookup"
            items={list.items}
            inputValue={list.filterText}
            onInputChange={list.setFilterText}
            loadingState={list.loadingState}
        >
            {(item: any) => <Item key={item.name}>{item.name} </Item>}
        </ComboBox>
    )
}