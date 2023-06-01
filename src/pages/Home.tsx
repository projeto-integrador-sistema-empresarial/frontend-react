import { useEffect } from 'react';
import { api } from '../lib/api';

export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtenha o token JWT do armazenamento local ou de onde você o salvou

    api.get('/home', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => console.log(res))
      .catch(e => console.log(e));
  }, []);

  return (
    <h5>
      Home
    </h5>
  );
}
