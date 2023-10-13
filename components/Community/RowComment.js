import {useState, useCallback, useEffect} from 'react';
import {Stack, Image, Text, useDisclosure} from '@chakra-ui/react';
import Button from '../Button';
import ModalConfirmation from '../Modals/ModalConfirmation';
import Heart from '../../assets/Icons/Heart';
import TrashOutline from '../../assets/Icons/TrashOutline';
import UserMinus from '../../assets/Icons/UserMinus';
import Certified from '../../assets/Icons/Certified';
import ExclamationCircle from '../../assets/Icons/ExclamationCircle';
import useDateFormat from '../../hooks/useDateFormat';

const RowComment = ({
  post,
  userId,
  onPressLike,
  onPressDelete,
  onPressBanned,
  onPressNotifyUser,
}) => {
  const {d} = useDateFormat();
  const {isOpen, onClose, onOpen} = useDisclosure();
  const [liked, setLiked] = useState();
  const [likes, setLikes] = useState(0);
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');
  const [buttons, setButtons] = useState([]);
  useEffect(() => {
    setLiked(post?.usersLiked.includes(userId));
    setLikes(post?.likes);
  }, [post, userId]);
  const handleOnPressLike = useCallback(() => {
    onPressLike(liked, post);
    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);
  }, [liked, likes, onPressLike, post]);
  const handleOnClickTrash = useCallback(() => {
    setTitle('Eliminar mensaje');
    setInfo(
      `Confirma la eliminación del mensaje del usuario ${post?.userFirstName}?`,
    );
    setButtons([
      <Button
        onClick={() => {
          onClose();
          onPressDelete(post);
        }}>
        Aceptar
      </Button>,
      <Button onClick={onClose}>Cancelar</Button>,
    ]);
    onOpen();
  }, [onClose, onOpen, onPressDelete, post]);
  const handleOnClickUserMinus = useCallback(() => {
    setTitle('Bannear usuario');
    setInfo(`Bannear al usuario ${post?.userFirstName}?`);
    setButtons([
      <Button
        onClick={() => {
          onClose();
          onPressBanned(post);
        }}>
        Aceptar
      </Button>,
      <Button onClick={onClose}>Cancelar</Button>,
    ]);
    onOpen();
  }, [onClose, onOpen, onPressBanned, post]);
  const handleOnClickExclamation = useCallback(() => {
    setTitle('Notificar al usuario');
    setInfo(`Desea notificar al usuario ${post?.userFirstName}?`);
    setButtons([
      <Button
        onClick={() => {
          onClose();
          onPressNotifyUser(post);
        }}>
        Enviar notificación
      </Button>,
      <Button onClick={onClose}>Cancelar</Button>,
    ]);
    onOpen();
  }, [onClose, onOpen, onPressNotifyUser, post]);
  return (
    <Stack bg="white" p={6} direction="row">
      <ModalConfirmation
        title={title}
        info={info}
        buttons={buttons}
        isOpen={isOpen}
        onClose={onClose}
      />
      {post?.userPictureUrl && (
        <Image
          boxSize="40px"
          borderRadius="full"
          objectFit="cover"
          alt="User picture"
          src={post?.userPictureUrl}
        />
      )}
      <Stack spacing={4} w="full">
        <Stack direction="row" justify="space-between" align="center">
          <Stack direction="row" align="center">
            <Text fontWeight="bold" fontSize="15px">
              {`${post?.userFirstName}`}
            </Text>
            {post?.userVerified && (
              <Certified color="green.100" height={26} width={26} />
            )}
            <Text color="gray.400" fontSize="15px">
              {post?.createdDate &&
                `@${post?.username} • ${d(
                  new Date(post.createdDate),
                  'yyyy/MM/dd',
                )} - ${new Date(post.createdDate).getHours()}:${new Date(
                  post.createdDate,
                ).getMinutes()}:${new Date(post.createdDate).getSeconds()}`}
            </Text>
          </Stack>
          <Stack direction="row" align="center">
            {post?.warned && (
              <Stack
                direction="row"
                align="center"
                borderRadius="full"
                px={2}
                py={1}
                bg="yellow">
                <ExclamationCircle color="black.200" />
                <Text fontSize="14px" color="black.200">
                  Advertido
                </Text>
              </Stack>
            )}
          </Stack>
        </Stack>
        <Text fontSize="15px" color="gray.800" w="90%">
          {post?.description}
        </Text>
        {post?.pictureUrl && (
          <Image
            alt="Picture"
            borderRadius="16px"
            objectFit="cover"
            src={post.pictureUrl}
          />
        )}
        <Stack direction="row" justify="space-between" align="center" w="90%">
          <Stack direction="row" align="center">
            <Button
              background={undefined}
              variant="link"
              onClick={handleOnPressLike}>
              <Heart color={liked ? 'red' : 'gray'} />
            </Button>
            <Text color="gray" fontSize="14px">
              {likes}
            </Text>
          </Stack>
          <Button
            background={undefined}
            variant="link"
            onClick={handleOnClickTrash}>
            <TrashOutline color="gray" />
          </Button>
          <Button
            background={undefined}
            variant="link"
            onClick={handleOnClickUserMinus}>
            <UserMinus color={post?.userBanned ? 'red' : 'gray'} />
          </Button>
          <Button
            background={undefined}
            variant="link"
            onClick={handleOnClickExclamation}>
            <ExclamationCircle color="gray" />
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default RowComment;
