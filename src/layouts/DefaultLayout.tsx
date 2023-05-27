import { Outlet } from 'react-router-dom';
import { MenuLateral } from '../components/MenuLateral';
import { Header } from '../components/Header';

export function DefaultLayout() {
  return (
    <>
      <MenuLateral>
        <Header />
        <Outlet />
      </MenuLateral>
    </>
  )
}