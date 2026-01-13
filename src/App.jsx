import { Routes, Route } from 'react-router';
import { Dashboard } from './components/Dashboard';
import Login from './components/Login';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Connections from './components/Connections';
import Requests from './components/Request';
function App() {
  return (
    <Provider store={appStore}>
     <Routes>
      <Route path="/" element={<Dashboard/>}>
      <Route index element={<Feed/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/connections' element={<Connections/>}/>
      <Route path='/requests' element={<Requests/>}/>
      </Route>
     </Routes>
    </Provider>
  )
}

export default App
