import * as React from "react";
import { atom, useAtom, Atom } from "jotai"
import { useUpdateAtom, splitAtom } from "jotai/utils"

import { Cross2Icon } from '@radix-ui/react-icons'
import { a, useTransition } from '@react-spring/web'

import { IconButton } from '../../../primitives/IconButton'

import { Radio, RadioGroup } from '../../../compositions/RadioGroup'

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};


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
      <span style={{ textDecoration: item.completed ? 'line-through' : '' }}>
        {item.title}
      </span>
      <CloseOutlined onClick={() => remove(atom)} />
    </>
  )
}


const Filter = () => {
    const [filter, setFilter] = useAtom(filterAtom)

    return (
        <RadioGroup 
            label={'Status'}
            value={filter}
            onValueChange={(e) => setFilter(e.currentTarget.value)} 
        > 
            <Radio value="all">All</Radio>
            <Radio value="completed">Completed</Radio>
            <Radio value="incompleted">Incompleted</Radio>
        </RadioGroup>
    );
}


type FilteredType = {
  remove: (item: Todo) => void;
};
const Filtered: React.FC<FilteredType> = ({ remove }) => {
  const [todos] = useAtom(filteredAtomsAtom);
  const transitions = useTransition(todos, {
    keys: (todo) => todo.toString(),
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 40 },
    leave: { opacity: 0, height: 0 }
  });
  return transitions((style, atom) => (
    <a.div className="item" style={style}>
      <TodoItem atom={atom} remove={remove} />
    </a.div>
  ));
};

const TodoList = () => {
  const setTodos = useUpdateAtom(todosAtom);
  const remove = (item: Todo) => {
    setTodos((prevs) => prevs.filter((prev) => item.id !== prev.id));
  };
  const add = (e) => {
    e.preventDefault()
    const title = e.currentTarget.inputTitle.value
    e.currentTarget.inputTitle.value = ""

    setTodos((prev) => [...prev, { 
            id: `${Math.random()}`, 
            title, completed: false 
        }]);
    };

    return (
        <form onSubmit={add}>
            <Filter />
                <input 
                    name="inputTitle" 
                    placeholder="Type ..." 
                />
            <Filtered remove={remove} />
        </form>
  );
};

export const AlternateUrls = () => {
  return (
    <>
      <h1>Alternates</h1>
      <TodoList />
    </>
  );
}
