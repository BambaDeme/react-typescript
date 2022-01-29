import React, { useState } from 'react';

import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './model';

import {DragDropContext,DropResult} from "react-beautiful-dnd";

const App: React.FC = () =>  {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault(); 
    if(todo){
      setTodos([...todos,{id:Date.now(),todo:todo,isDone:false}]);
      setTodo("");
    }
    
  }

   const onDragEnd = (result: DropResult) => {

      const {source,destination} = result;
      
      if(destination){
        if(source.droppableId!= destination.droppableId){ // if the source change
          // if we move a task from active to complete
          let add,active=todos,complete=completedTodos;
          if(source.droppableId === 'TodoList'){ 
            add = active[source.index];
            active.splice(source.index,1);
            complete.splice(destination.index,0,add);
            setTodos(active);
            setCompletedTodos(complete);
            return
          }else{ // if we move task from complete to active
            add = complete[source.index];
            complete.splice(source.index,1);
            active.splice(destination.index,0,add);
            setTodos(active);
            setCompletedTodos(complete);
            return
          }
        } else{  // only index change not source
          
          let change,active=todos,complete=completedTodos;
          
          if(source.droppableId === 'TodoList'){
            change = active[source.index];
            active.splice(source.index,1);
            active.splice(destination.index,0,change);
            setTodos(active);
            return
            // active.splice(destination.index,0,change);
          }else{
            change = complete[source.index];
            complete.splice(source.index,1);
            complete.splice(destination.index,0,change);
            setCompletedTodos(complete)
            return;
          }
        }
      }
   }
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        <TodoList 
          todos={todos} 
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
    
  );
}

export default App;
