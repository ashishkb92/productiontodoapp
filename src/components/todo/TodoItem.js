import React from 'react';
import PropTypes from 'prop-types';

import { partial } from '../../lib/utils';

export const TodoItem = ({ id, task, isComplete, handleToggle, handleRemove }) => (
  <li>
    <a href="#" onClick={partial(handleRemove, id)}>
      X
    </a>
    <input type="checkbox" onChange={partial(handleToggle, id)} checked={isComplete} />
    {task}
  </li>
);

TodoItem.proptypes = {
  task: PropTypes.string.isRequired,
  isComplete: PropTypes.bool,
  id: PropTypes.number.isRequired
};
