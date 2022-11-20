import {
  Box,
  Card,
  Divider,
  Group,
  Title,
  Text,
  ActionIcon,
} from '@mantine/core';
import usePosts from '../../../hooks/posts/usePosts/usePosts';
import useLoginStatus from '../../../hooks/auth/useLoginStatus/useLoginStatus';
import { IconTrash } from '@tabler/icons';
import useDeletePost from '../../../hooks/posts/useDeletePost/useDeletePost';
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
