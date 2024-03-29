import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Stack,
  Container,
} from '@mui/material';
import { api, setAuthorizationToken } from '../lib/api';
import LogoIntegrador from '/Logo.png';
import { Copyright } from '../components/CopyRight';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('O email é obrigatório').email('Email inválido'),
  password: Yup.string().required('A senha é obrigatória').min(8, 'A senha deve ter no mínimo 8 caracteres'),
});

export default function SingIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [password, setPassword] = useState('');

  const setError = (fieldName: string, errorMessage: string) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');

    try {
      await validationSchema.validate({
        email: email,
        password: password,
      });

      const role = 'student';

      api.post('/signin', { username: email, password, role })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            const token = response.data.token; // Assume que o token é retornado na resposta como "token"
            localStorage.setItem('token', token); // Salva o token no armazenamento local
            setAuthorizationToken(token);
            return navigate('/home');
          }
        }).catch(error => {
          console.log('.then ~ error:', error);
          if (error.response.status === 401) {
            if (error.response.data.error == 'Invalid username or password.') {
              setError('email', 'Usuário ou senha incorretos.')
            }
          }
        });
    } catch (error) {
      const validationError = error as Yup.ValidationError;
      if (validationError.path === 'email') {
        setError('email', validationError.message);
      }
      if (validationError.path === 'password') {
        setError('password', validationError.message);
      }
    }
  };

  useEffect(() => {
    if (password && password.length >= 8) {
      setError('password', '');
    }
    const emailRegex = /\S+@\S+\.\S+/;

    if (email && emailRegex.test(email)) {
      setError('email', '');
    }
  }, [password, email]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          paddingTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={LogoIntegrador} width={100} alt="" />
        <Typography component="h1" variant="h5" my={2} >
          Acesse sua conta
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={!!formErrors.password}
            helperText={formErrors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 3, py: 1.2 }}
          >
            Entrar
          </Button>

          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2">Não possui uma conta?</Typography>
            <Link href="/signup" variant="body2">
              {'Faça seu cadastro'}
            </Link>
          </Stack>

          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2">É uma empresa parceira?</Typography>
            <Link href="/signin-enterprise" variant="body2">
              {'Faça seu login aqui'}
            </Link>
          </Stack>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
