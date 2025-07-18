
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/Landingpage'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import PrescriptionForm from './pages/PrescriptionForm'
import PrescriptionPreview from './pages/PrescriptionPreview'
import ProtectedRoute from './components/ProtectedRoute'
import PrescriptionList from './pages/PrescriptionList'

function App() {
 

  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>

      <Route path='/home' element={<ProtectedRoute><PrescriptionForm/></ProtectedRoute>}/>
       <Route path="/list" element={<ProtectedRoute><PrescriptionList/></ProtectedRoute>} />
     <Route path="/preview/:id" element={<ProtectedRoute><PrescriptionPreview /></ProtectedRoute>} />

    </Routes>
    </>
  )
}

export default App
