import { ActionIcon, Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { IconTrash } from '@tabler/icons';
import { IDelete } from './IDelete';
const DeletePost = ({ onDelete }: IDelete) => {
  return (
    <ActionIcon
      color="red"
      variant="filled"
      onClick={() => {
        openConfirmModal({
          title: 'Delete post',
          children: <Text>Are you sure you want to delete this post?</Text>,
          labels: { confirm: 'Delete', cancel: 'Cancel' },
          confirmProps: { color: 'red' },
          onConfirm() {
            onDelete();
          },
        });
      }}
    >
      <IconTrash size={18} />
    </ActionIcon>
  );
};

export default DeletePost;
