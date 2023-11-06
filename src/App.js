import './App.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditorPage from './components/EditorPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
            path="/editor/:roomId"
            element={<EditorPage />}
        ></Route>
    </Routes>
</BrowserRouter>
  );
}

export default App;
