import React from 'react';
import StickyNoteList from './components/StickyNote';
import useWebsocket from './hooks/useWebsocket';
import AddButton from './components/AddButton';

const App = () => {

  useWebsocket();

  return (
    <div className="App">
        <AddButton />
        <StickyNoteList />
    </div>
  );
}

export default App;
