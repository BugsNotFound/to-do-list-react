import React from 'react';
import TodoList from './todoList/todoList';
import AddToDo from './AddToDo/AddToDo';

class App extends React.Component{
  
  constructor(){
    super();
    this.state = {
      todos: []
    };
  }
  
  render(){
    return(
      <div>
        <h1>To do List</h1>
        <AddToDo addTodoFn={this.addTodo}></AddToDo>
        <TodoList updateTodoFn={this.updateTodo} todos={this.state.todos}></TodoList>
      </div>
    );
  }

  componentDidMount = () => {
    const todos = localStorage.getItem('todos');
    if(todos){
      const savedTodos = JSON.parse(todos);
      this.setState({
        todos: savedTodos
      });
    }
    else{
      console.log("No todos");
    }
  }

  addTodo = async (todo) => {
    await this.setState({todos: [...this.state.todos, {
      text: todo,
      completed: false
    }]});
    //this.state.todos = [...this.state.todos, todo];
    //console.log(this.state.todos );
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
    console.log(localStorage.getItem('todos'));
  }

  updateTodo = async (todo) => {
    const newTodos = this.state.todos.map(_todo => {
      if(todo === _todo){
        console.log("Came here...");
        console.log(todo);
        return {
          text: todo.text,
          completed: !todo.completed
        }
      }
      else{
        return _todo;
      }
    });

    await this.setState({todos: newTodos});
    //console.log(newTodos);
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

   
};


export default App;