import { Box, Container, Divider, SimpleGrid, Title } from '@mantine/core';
import { useLoginStatus } from '../features/auth/api/loginStatus/loginStatus';
import Feed from '../features/posts/components/Feed/Feed';
import NewPost from '../features/posts/components/New/New';

/** Initial view when logged in */
export const RouteStart = () => {
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
