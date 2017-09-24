import React from 'react';
import PropTypes from 'prop-types';

export const TodoForm = ({ handleChange, currentTodo, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <input type="text" onChange={handleChange} value={currentTodo} />
  </form>
);

TodoForm.proptypes = {
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  currentTodo: PropTypes.string
};
