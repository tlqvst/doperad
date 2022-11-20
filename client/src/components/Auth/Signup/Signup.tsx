import { TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ISignup } from './ISignup';

const Signup = ({ onSignup }: ISignup) => {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      username: '',
      password: '',
    },
  });

  return (
    <>
      <form onSubmit={form.onSubmit((values) => onSignup(values))}>
        <TextInput
          required
          mt="md"
          autoComplete="name"
          label="Name"
          id="signup-name"
          placeholder="Name"
          {...form.getInputProps('name')}
        />
        <TextInput
          required
          mt="md"
          type="email"
          autoComplete="email"
          label="Email"
          id="signup-email"
          placeholder="Email"
          {...form.getInputProps('email')}
        />
        <TextInput
          required
          mt="md"
          autoComplete="username"
          label="Username"
          id="signup-username"
          placeholder="Username"
          {...form.getInputProps('username')}
        />
        <TextInput
          required
          mt="md"
          type="password"
          autoComplete="current-password"
          label="Password"
          id="signup-password"
          placeholder="Password"
          {...form.getInputProps('password')}
        />
        <Button type="submit" mt="md" fullWidth>
          Sign up!
        </Button>
      </form>
    </>
  );
};

export default Signup;
