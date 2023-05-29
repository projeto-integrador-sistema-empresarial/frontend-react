import { Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignInEnterprise from './pages/SignInEnterprise'
import { DefaultLayout } from './layouts/DefaultLayout'
import SignUpEnterprise from './pages/SignUpEnterprise'
import { Trainings } from './pages/Trainings'
import { Courses } from './pages/Courses'
import { Jobs } from './pages/Jobs'
import { Tests } from './pages/Tests'

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
        <Route path="/treinamentos" element={<Trainings />} />
        <Route path="/cursos" element={<Courses />} />
        <Route path="/vagas" element={<Jobs />} />
        <Route path="/testes" element={<Tests />} />
      </Route>

    </Routes>
  )
}
