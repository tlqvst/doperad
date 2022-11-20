import useLoginStatus from '../../hooks/auth/useLoginStatus/useLoginStatus';
import { Box, Container, Divider, SimpleGrid, Title } from '@mantine/core';
import NewPost from '../../components/Posts/New/New';
import Feed from '../../components/Posts/Feed/Feed';

const PageLoggedIn = () => {
  const loginStatus = useLoginStatus();

  return (
    <Container>
      <Title>Welcome {loginStatus.data?.data.username}</Title>
      <Divider mt="lg" mb="lg" />
      <SimpleGrid cols={2}>
        <Box>
          <NewPost />
        </Box>
        <Box>
          <Feed />
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default PageLoggedIn;
