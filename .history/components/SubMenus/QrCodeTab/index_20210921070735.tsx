import React, { memo, useState, useCallback } from 'react'
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
        removeTodo(todoAtom);
    }

    return (
        <li>
            <label>
                <input 
                    type="checkbox" 
                    checked={item.completed} 
                    onChange={toggleCompleted} 
                />

                <span style={{ textDecoration: item.completed ? 'line-through' : '' }}>
                    {item.title} 
                </span>

                {item.completed && 
                    <button onClick={remove}> 
                        Remove 
                    </button>
                }
            </label>
        </li>
    )
}

const MemoTodoAtom = memo(TodoItem)
const TodoAtomsAtom = atom<PrimitiveAtom<Todo>[]>([]);

const TodoList: React.FC = () => {
    const [title, setTitle] = useState('')
    const [todoAtoms, setTodoAtoms] = useAtom(TodoAtomsAtom)

    const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const todoAtom = atom<Todo>({ title, completed: false });
        setTodoAtoms([ ...todoAtoms, todoAtom ])
        setTitle('')
    }

    const removeTodo = useCallback((todoAtom: PrimitiveAtom<Todo>) => {
        setTodoAtoms((prev: PrimitiveAtom<Todo>[]) => {
            return prev.filter((item) => item != todoAtom)
        }))
    );

    return (

    )
}

const QrCodeTab = () => {

    return (

    )
}