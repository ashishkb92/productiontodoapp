export const addTodo = (list, item) => [...list, item];

export const generateId = () => Math.floor(Math.random() * 10000);

export const findById = (id, list) => list.find(item => item.id === id);

export const toggleTodo = item => ({ ...item, isComplete: !item.isComplete });

export const updateTodo = (list, updatedItem) => list.map(item => (item.id === updatedItem.id ? updatedItem : item));

export const removeTodo = (list, id) => list.filter(item => item.id !== id);

export const filterTodos = (list, route) =>
  list.filter(item => {
    switch (route) {
      case '/':
        return true;
      case '/active':
        return item.isComplete === false;
      case '/complete':
        return item.isComplete === true;
    }
  });
