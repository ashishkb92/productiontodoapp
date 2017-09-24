import React from 'react';
import { TodoItem } from './TodoItem';
import PropTypes from 'prop-types';

export const TodoList = ({ todos, handleToggle, handleRemove }) => (
  <div className="todo-list">
    <ul>
      {todos.map(todo => <TodoItem handleToggle={handleToggle} key={todo.id} {...todo} handleRemove={handleRemove} />)}
    </ul>
  </div>
);

TodoList.proptypes = {
  todos: PropTypes.array.isRequired
};
