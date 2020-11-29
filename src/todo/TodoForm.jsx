import { useState } from 'react';

import PropTypes from 'prop-types';

// ...

// style object with 'CSS properties' to be applied to the title input element.
const styles = {
  width: '100%',
  backgroundColor: '#FFF',
  padding: 16,
  fontSize: 24,
  fontStyle: 'italic',
  fontWeight: 300,
  border: 'none'
};

// ...

function TodoForm({ initialTitle = '', createTodo }) {
  const [title, setTitle] = useState(initialTitle);

  const handleChange = event => {
    setTitle(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();

    const titleToSet = title.trimStart();
    if (titleToSet) {
      createTodo(titleToSet);

      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        style={styles}
        value={title}
        placeholder="What do you need to do?"
        onChange={handleChange}
      />
    </form>
  );
}

// eslint-disable-next-line react/no-typos
TodoForm.propTypes = {
  initialTitle: PropTypes.string,
  createTodo: PropTypes.func.isRequired
};

export { TodoForm };