import React from "react";
import type { FormEvent } from 'react'

import { atom, useAtom } from "jotai"
import { useUpdateAtom } from "jotai/utils"
import type { PrimitiveAtom } from 'jotai'

import { Cross2Icon } from '@radix-ui/react-icons'
import { a, useTransition } from '@react-spring/web'

import { IconButton } from '../../../primitives/IconButton'
import { Radio, RadioGroup } from '../../../compositions/RadioGroup'


type Todo = {
    title: string
    completed: boolean
}

const filterAtom = atom('all')
const todosAtom = atom<PrimitiveAtom<Todo>[]>([])
const filteredAtom = atom<PrimitiveAtom<Todo>[]>((get) => {
  const filter = get(filterAtom)
  const todos = get(todosAtom)
  if (filter === 'all') return todos
  else if (filter === 'completed')
    return todos.filter((atom) => get(atom).completed)
  else return todos.filter((atom) => !get(atom).completed)
})

type RemoveFn = (item: PrimitiveAtom<Todo>) => void
type TodoItemProps = {
  atom: PrimitiveAtom<Todo>
  remove: RemoveFn
}

const TodoItem = ({ atom, remove }: TodoItemProps) => {
  const [item, setItem] = useAtom(atom)
  const toggleCompleted = () =>
    setItem((props) => ({ ...props, completed: !props.completed }))
  return (
    <>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={toggleCompleted}
      />
      <Text>
        <span style={{ textDecoration: item.completed ? 'line-through' : '' }}>
          {item.title}
        </span>
      </Text>
        <IconButton onClick={() => remove(atom)}>
            <Cross2Icon />
        </IconButton>
    </>
  )
}


const Filter = () => {
    const [filter, setFilter] = useAtom(filterAtom)

    return (
        <RadioGroup 
            label={'Status'}
            value={filter}
            onChange={(updatedFilter: string) => setFilter(updatedFilter)}
        > 
            <Radio value="all">All</Radio>
            <Radio value="completed">Completed</Radio>
            <Radio value="incompleted">Incompleted</Radio>
        </RadioGroup>
    );
}


type FilteredType = {
    remove: RemoveFn
  }
  const Filtered = (props: FilteredType) => {
    const [todos] = useAtom(filteredAtom)
    const transitions = useTransition(todos, {
      keys: (todo) => todo.toString(),
      from: { opacity: 0, height: 0 },
      enter: { opacity: 1, height: 40 },
      leave: { opacity: 0, height: 0 },
    })
    return transitions((style, atom) => (
      <a.div className="item" style={style}>
        <TodoItem atom={atom} {...props} />
      </a.div>
    ))
  }
  
const TodoList = () => {
    const setTodos = useUpdateAtom(todosAtom)
    const remove: RemoveFn = (todo) => setTodos((prev) => prev.filter((item) => item !== todo))
    const add = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const title = e.currentTarget.inputTitle.value
      e.currentTarget.inputTitle.value = ''
      setTodos((prev) => [...prev, atom<Todo>({ title, completed: false })])
    }

    return (
      <form onSubmit={add}>
        <Filter />
        <Input 
            name="inputTitle" 
            placeholder="Type ..." 
            value={inputVal} 
            onChange={(updatedVal: string) => setInputVal(updatedVal)}
            autoComplete="off" 
        />
        <Filtered remove={remove} />
      </form>
    )
}

export const AlternateUrls = () => {
  return (
    <>
      <h1>Alternates</h1>
      <TodoList />
    </>
  );
}
