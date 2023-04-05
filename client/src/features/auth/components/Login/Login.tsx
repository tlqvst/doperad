import { TextInput, Button, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLogin } from '../../api/login/login';

const Login = () => {
  const loginMutation = useLogin();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => loginMutation.mutateAsync(values))}
    >
      {loginMutation.isError && (
        <Alert color="red" title="Error" mt="md">
          {loginMutation.error.response?.data.message}
        </Alert>
      )}

      <TextInput
        mt="md"
        required
        autoComplete="username"
        label="Username"
        id="login-username"
        placeholder="Username"
        {...form.getInputProps('username')}
      />
      <TextInput
        mt="md"
        required
        type="password"
        autoComplete="current-password"
        label="Password"
        id="login-password"
        placeholder="Password"
        {...form.getInputProps('password')}
      />
      <Button type="submit" mt="md" fullWidth>
        Login
      </Button>
    </form>
  );
};

export default Login;
