import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Stack,
} from '@mui/material';
import { api } from '../lib/api';
import LogoIntegrador from '/Logo.png';
import { Copyright } from '../components/CopyRight';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('O Nome é obrigatório')
    .min(3, 'Nome de usuário deve ter no mínimo 3 caracteres'),
  email: Yup.string().required('O email é obrigatório').email('Email inválido'),
  password: Yup.string().required('A senha é obrigatória').min(8, 'A senha deve ter no mínimo 8 caracteres'),
});

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState({ username: '', email: '', password: '' });
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

    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');

    try {
      await validationSchema.validate({
        username: username,
        email: email,
        password: password,
      });

      const role = 'student';

      try {
        const response = await api.post('/home', { username: email, password, role });
        console.log('handleSubmit ~ response:', response);

        if (response.status === 200 || response.status === 201) {
          return navigate('/home');
        } else {
          // Lidar com uma resposta de erro da API
          console.log('Resposta de erro da API:', response);
        }
      } catch (error) {
        // Lidar com erros de solicitação ou rede
        console.log('Erro de solicitação ou rede:', error);
      }
    } catch (error) {
      console.error(error);

      const validationError = error as Yup.ValidationError;
      if (validationError.path === 'username') {
        setError('username', validationError.message);
      }
      if (validationError.path === 'email') {
        setError('email', validationError.message);
      }
      if (validationError.path === 'password') {
        setError('password', validationError.message);
      }
    }
  };

  useEffect(() => {
    if (username && username.length >= 3) {
      setError('username', '');
    }

    if (password && password.length >= 8) {
      setError('password', '');
    }
    const emailRegex = /\S+@\S+\.\S+/;

    if (email && emailRegex.test(email)) {
      setError('email', '');
    }
  }, [password, email, username]);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          paddingTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={LogoIntegrador} width={100} alt="" />
        <Typography component="h1" variant="h5" my={2}>
          Crie sua conta
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nome Completo"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoFocus
            error={!!formErrors.username}
            helperText={formErrors.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
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
            Cadastrar conta
          </Button>
          <Grid container>
            <Grid item>
              <Stack direction="row" spacing={0.5}>
                <Typography variant="body2">Já possui uma Conta?</Typography>
                <Link href="/signin" variant="body2">
                  {'Faça login'}
                </Link>
              </Stack>
            </Grid>

            <Grid item>
              <Stack direction="row" spacing={0.5}>
                <Typography variant="body2">Deseja ser uma empresa parceira?</Typography>
                <Link href="/signup-enterprise" variant="body2">
                  {'Faça seu cadastro aqui'}
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
