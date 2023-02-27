import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
// pocketbase
import PocketBase from 'pocketbase';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
// Alerts
import ErrorAlert from '../../../components/Alerts/ErrorAlert';

const pb = new PocketBase('http://127.0.0.1:8090');

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const authData = await pb.admins.authWithPassword(email, password);
      localStorage.setItem('farm-admin', authData.token);
      navigate('/dashboard', { replace: true });
    } catch (e) {
      setErrorLogin(true);
    }
  };

  return (
    <>
      {errorLogin && (
        <Box sx={{ my: 2 }}>
          <ErrorAlert message="Usuario o contraseña son incorrectas" />
        </Box>
      )}

      <Stack spacing={3}>
        <TextField name="email" label="Correo Electronico" onChange={(e) => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{ mt: 3 }} onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
