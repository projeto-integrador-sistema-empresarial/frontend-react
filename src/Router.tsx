import { Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignInEnterprise from './pages/SignInEnterprise'
import { DefaultLayout } from './layouts/DefaultLayout'
import SignUpEnterprise from './pages/SignUpEnterprise'

export function Router() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin-enterprise" element={<SignInEnterprise />} />
      <Route path="/signup-enterprise" element={<SignUpEnterprise />} />

      <Route path='/' element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Route>

    </Routes>
  )
}
