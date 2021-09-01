import React, { useEffect }  from 'react'

import { useAsyncDebounce } from 'react-table'

import { 
    Input,
    FilterFieldset as FieldsetPrimitive 
} from '../../../primitives/FieldSet'

import { useAtom, atom } from 'jotai'
const globalFilterAtom = atom('')

interface IGlobalFilter {
    preGlobalFilteredRows: any[];
    globalFilter: string; 
    setGlobalFilter: (updatedGlobalFilter: string | undefined) => void;
}

export const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }: IGlobalFilter) =>  {
    const [input, setInput] = useAtom(globalFilterAtom)

    useEffect(() => {
        setInput(globalFilter);
    }, [])

    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <FieldsetPrimitive>
             <Input 
                type={'text'}
                id={`global-filter`} 
                value={input}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setInput(event.currentTarget.value);
                    onChange(event.currentTarget.value);
                }}
                placeholder={`Search ${preGlobalFilteredRows.length} entries...`}
            />
        </FieldsetPrimitive>
    )
}