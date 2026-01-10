import { Routes, Route } from 'react-router';
import { Dashboard } from './Dashboard';
import Login from './Login';
function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<Dashboard/>}>
      <Route path='/login' element={<Login/>}/>
      <Route path='/login' element={<Login/>}/>
      </Route>
     </Routes>
    </>
  )
}

export default App
