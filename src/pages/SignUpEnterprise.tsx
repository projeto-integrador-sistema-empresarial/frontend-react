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
import CNPJMask from '../components/CNPJMask';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('O Nome é obrigatório')
    .min(3, 'Nome de usuário deve ter no mínimo 3 caracteres'),
  cnpj: Yup.string()
    .required('O CNPJ é obrigatório')
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido'),
  email: Yup.string().required('O email é obrigatório').email('Email inválido'),
  password: Yup.string().required('A senha é obrigatória').min(8, 'A senha deve ter no mínimo 8 caracteres'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas precisam ser iguais')
    .required('A confirmação da senha é obrigatória'),
});

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [formErrors, setFormErrors] = useState({ username: '', cnpj: '', email: '', password: '', confirmPassword: '' });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
    const cnpj = data.get('cnpj');
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');

    try {
      await validationSchema.validate({
        username: username,
        email: email,
        cnpj: cnpj,
        password: password,
        confirmPassword: confirmPassword,
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
      if (validationError.path === 'cnpj') {
        setError('cnpj', validationError.message);
      }
      if (validationError.path === 'email') {
        setError('email', validationError.message);
      }
      if (validationError.path === 'password') {
        setError('password', validationError.message);
      }
      if (validationError.path === 'confirmPassword') {
        setError('confirmPassword', validationError.message);
      }
    }
  };

  useEffect(() => {
    if (username && username.length >= 3) {
      setError('username', '');
    }

    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    if (cnpj && cnpjRegex.test(cnpj)) {
      setError('cnpj', '');
    }

    if (password && password.length >= 8) {
      setError('password', '');
    }

    if (confirmPassword && confirmPassword === password) {
      setError('confirmPassword', '');
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (email && emailRegex.test(email)) {
      setError('email', '');
    }
  }, [password, confirmPassword, email, username, cnpj]);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          paddingTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={LogoIntegrador} width={100} alt="" />

        <Box my={2} textAlign={'center'}>
          <Typography component="h1" variant="h5" >
            Faça seu cadastro
          </Typography>
          <Typography component="h5" variant="body1">
            e torne-se uma empresa parceira
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nome Fantasia"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoFocus
            error={!!formErrors.username}
            helperText={formErrors.username}
          />
          <CNPJMask
            value={cnpj}
            onChange={(event) => setCnpj(event.target.value)}
            error={!!formErrors.cnpj}
            helperText={formErrors.cnpj}
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
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={!!formErrors.password}
            helperText={formErrors.password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirme sua senha"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            error={!!formErrors.confirmPassword}
            helperText={formErrors.confirmPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 3, py: 1.2 }}
          >
            Cadastrar conta Empresarial
          </Button>
          <Grid container>
            <Grid item>
              <Stack direction="row" spacing={0.5}>
                <Typography variant="body2">É estudante ou mentor?</Typography>
                <Link href="/signin" variant="body2">
                  {'Faça seu login aqui'}
                </Link>
              </Stack>
            </Grid>

            <Grid item>
              <Stack direction="row" spacing={0.5}>
                <Typography variant="body2">Já é uma empresa parceira?</Typography>
                <Link href="/signin-enterprise" variant="body2">
                  {'Faça seu login aqui'}
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
