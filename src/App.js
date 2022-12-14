import './App.css';
import Home from './comp/Home/Home';
import TableState from './contexts/TableState';
import Table from './comp/Table/Table';
function App() {
  return (

    <TableState>
        <div className="App">
          <Home />
          <Table/>
        </div>
    </TableState>
    
  );
}

export default App;
