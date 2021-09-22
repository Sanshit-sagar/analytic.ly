import React from 'react'
import { atom, useAtom, Atom, PrimitiveAtom } from 'jotai'

type Todo = {
    title: string;
    completed: boolean;
}

const TodoItem:React.FC<{ 
    todoAtom: PrimitiveAtom<Todo>; 
    removeTodo: (todoAtom: PrimitiveAtom<Todo>) => void; 
}> = ({ todoAtom, removeTodo }) => {

    const [item, setItem] = useAtom(todoAtom)
    
    const toggleCompleted = () => {
        setItem((prev) => {
            return {
                ...prev,
                completed: !prev.completed
            }
        })
    }

    const remove = () => {
        removeTodo(item);
    }

    return (

    )
}

const QrCodeTab = () => {

    return (

    )
}