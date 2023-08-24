import React, { useState } from 'react';

function TodoistCloneApp() {
  const [inputText, setInputText] = useState('');
  const [tags, setTags] = useState([]);
  const [priority, setPriority] = useState(null);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputText(inputValue);

    // Check for tags starting with "@" and update tags array
    if (inputValue.includes('@')) {
      const newTags = inputValue
        .split(' ')
        .filter(tag => tag.startsWith('@'))
        .map(tag => tag.slice(1)); // Remove the "@" symbol
      setTags(newTags);
    } else {
      setTags([]);
    }

    // Extract priority values from input using word boundaries
    const priorityValues = inputValue.match(/\bp[1-4]\b/g);
    if (priorityValues && priorityValues.length > 0) {
      // Set the priority to the last matched priority value
      setPriority(parseInt(priorityValues[priorityValues.length - 1][1]));
    } else {
      setPriority(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type here..."
      />
      <div>
        <p>Tags: {tags.join(', ')}</p>
        <p>Priority: {priority !== null ? `p${priority}` : 'None'}</p>
      </div>
    </div>
  );
}

export default TodoistCloneApp;
