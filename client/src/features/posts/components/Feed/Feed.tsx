import { Box, Divider, Group, Title, Text } from '@mantine/core';
import { useLoginStatus } from '../../../auth/api/loginStatus/loginStatus';
import { useDeletePost } from '../../api/deletePost/deletePost';
import { usePosts } from '../../api/getPosts/getPosts';
import DeletePost from '../Delete/Delete';

const Feed = () => {
  const posts = usePosts();
  const loginStatus = useLoginStatus();
  const deletePostMutation = useDeletePost();

  return (
    <>
      {posts.data?.data.map((post) => (
        <Box mb={'md'} key={post.id}>
          <Group position="apart">
            <Title order={5}>{post.title}</Title>{' '}
            <Group>
              <Text color="dimmed">by {post.author.username}</Text>
              {post.authorId === loginStatus.data?.data.userId && (
                <DeletePost
                  onDelete={() => deletePostMutation.mutateAsync(post.id)}
                />
              )}
            </Group>
          </Group>
          {post.content}
          <Divider />
        </Box>
      ))}
    </>
  );
};

export default Feed;
