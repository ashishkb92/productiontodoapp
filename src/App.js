import React, { Component } from 'react';
import './App.css';
import { TodoForm, TodoList, Footer } from './components/todo';
import { addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos } from './lib/todoHelpers';
import { pipe, partial } from './lib/utils';
import PropTypes from 'prop-types';
import { loadTodos, createTodo, saveTodo, deleteTodo } from './lib/todoService';

class App extends Component {
  state = {
    todos: [],
    currentTodo: ''
  };

  static contextTypes = {
    route: PropTypes.string
  };

  handleChange = event => {
    this.setState({ currentTodo: event.target.value });
  };

  handleRemove = (id, event) => {
    event.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({ todos: updatedTodos });
    deleteTodo(id).then(() => this.showTempMessage('Todo Removed'));
  };

  handleToggle = id => {
    const getToggledTodo = pipe(findById, toggleTodo);
    const updated = getToggledTodo(id, this.state.todos);
    const getUpdatedTodos = partial(updateTodo, this.state.todos);
    const updatedTodos = getUpdatedTodos(updated);
    this.setState({ todos: updatedTodos });
    saveTodo(updated).then(() => this.showTempMessage('Todo Updated'));
  };

  handleSubmit = event => {
    event.preventDefault();
    const newId = generateId();
    const newTodo = { task: this.state.currentTodo, isComplete: false, id: newId };
    const updatedTodos = addTodo(this.state.todos, newTodo);
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    });
    createTodo(newTodo).then(() => this.showTempMessage('Todo Added'));
  };

  showTempMessage = message => {
    this.setState({ message });
    setTimeout(() => this.setState({ message: '' }), 2500);
  };

  handleEmptySubmit = event => {
    event.preventDefault();
    this.setState({ errorMessage: 'Please supply a todo' });
  };

  componentDidMount() {
    loadTodos().then(todos => this.setState({ todos }));
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    const displayTodos = filterTodos(this.state.todos, this.context.route);
    return (
      <div className="todo-app">
        {this.state.errorMessage && <span style={{ color: 'red' }}>{this.state.errorMessage}</span>}
        {this.state.message && <span style={{ color: 'red' }}>{this.state.message}</span>}
        <TodoForm handleChange={this.handleChange} currentTodo={this.state.currentTodo} handleSubmit={submitHandler} />
        <TodoList handleToggle={this.handleToggle} todos={displayTodos} handleRemove={this.handleRemove} />
        <Footer />
      </div>
    );
  }
}

export default App;
