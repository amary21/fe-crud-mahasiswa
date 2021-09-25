import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Create from './pages/Create';
import Update from './pages/Update';
import Read from './pages/Read';
import Delete from './pages/Delete';

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={Read} />
        <Route path="/add" component={Create} />
        <Route exact path="/update" component={Update} />
        <Route exact path="/delete" component={Delete} />
      </Router>
    </>
  );
}

export default App;
