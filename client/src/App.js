import { Route, Switch } from 'react-router-dom';
import './App.css';
import Creation from './components/Creation';
import Detail from './components/Detail';
import Home from './components/Home';
import Land from './components/Land';

function App() {
  return (
    <div className="App">
      <Switch>

      <Route exact path= '/' component={ Land } />
      <Route exact path= '/home' component={ Home } />
      <Route exact path= '/create' component={ Creation } />
      <Route exact path= '/:id' component={ Detail } />


      
      </Switch>
    </div>
  );
}

export default App;
