import React from 'react';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import "./todosStyle.css";

import {Droppable} from "react-beautiful-dnd";
interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList = ({todos,setTodos,completedTodos,setCompletedTodos}:Props) => {
  return (
    <div className="container">
        <Droppable droppableId='TodoList'>
            {
                (provided,snapshot) => (
                    <div className={`todos ${snapshot.isDraggingOver ? "dragactive":""}`} ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="todos__heading">
                            Active tasks
                        </span>

                        {
                            todos.map((todo,index) => (
                                <SingleTodo 
                                    index={index}
                                    key={todo.id}
                                    todo={todo}
                                    setTodos={setTodos}
                                    todos={todos}
                                />
                            ))
                        }
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>
        
        <Droppable droppableId='TodosRemove'>
            {
                (provided,snapshot) => (
                    <div className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete":""}`} ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="todos__heading">
                            Completed tasks
                        </span>
                        {
                            completedTodos.map((todo,index) => (
                                <SingleTodo 
                                    index={index}
                                    key={todo.id}
                                    todo={todo}
                                    setTodos={setTodos}
                                    todos={todos}
                                />
                            ))
                        }
                        {provided.placeholder}

                    </div>
                )
            }
        </Droppable>
        
    </div>
  );
};

export default TodoList;
