import { Button, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCreatePost } from '../../api/createPost/createPost';

const NewPost = () => {
  const createPostMutation = useCreatePost();
  const form = useForm({
    initialValues: {
      title: '',
      content: '',
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        createPostMutation.mutateAsync(values).then(() => form.reset()),
      )}
    >
      <TextInput
        label="Title"
        required
        id="title"
        placeholder="Title"
        {...form.getInputProps('title')}
      />
      <Textarea
        mt="md"
        required
        label="Content"
        id="content"
        placeholder="Write a post.."
        {...form.getInputProps('content')}
      />
      <Button mt="md" type="submit">
        Create post
      </Button>
    </form>
  );
};

export default NewPost;
