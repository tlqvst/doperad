import { Group, Button } from '@mantine/core';
import { Container, Image, Header as MantineHeader } from '@mantine/core';
import useLogout from '../../../hooks/auth/useLogout/useLogout';

const Header = () => {
  const logoutMutation = useLogout();

  return (
    <MantineHeader height={64} fixed>
      <Container sx={{ height: '100%' }}>
        <Group align={'center'} sx={{ height: '100%' }} position="apart">
          <Image width={170} src="/images/doperad.svg" />
          <Button onClick={() => logoutMutation.mutateAsync()}>Log out</Button>
        </Group>
      </Container>
    </MantineHeader>
  );
};

export default Header;
