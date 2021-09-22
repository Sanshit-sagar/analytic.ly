import React from 'react'
import { atom, useAtom, Atom, PrimitiveAtom } from 'jotai'

type Todo = {
    title: string;
    completed: boolean;
}

const TodoItem:React.FC<{ todoAtom: PrimitiveAtom<Todo>; removeTodo: (todoAtom: PrimitiveAtom<Todo>) => void; }> = ({ todoAtom, })

const QrCodeTab = () => {

    return (

    )
}