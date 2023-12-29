import header from './design-comp/images/bg-header-desktop.svg';
import ListingsPage from './ListingsPage.tsx';


import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={header} />
      </header>
      <ListingsPage />
    </div>
  );
}

export default App;
