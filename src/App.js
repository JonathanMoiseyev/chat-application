import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Chat from './components/Chat/Chat';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/chat" component={Chat} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
