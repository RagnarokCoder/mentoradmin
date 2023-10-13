import {Icon, useToken} from '@chakra-ui/react';

const Profile = ({color = 'white', ...props}) => {
  const [iconColor] = useToken('colors', [color]);
  return (
    <Icon viewBox="0 0 9 11" {...props}>
      <path
        d="M4.4 7.24566C6.78624 7.24566 8.8 7.63342 8.8 9.12943C8.8 10.626 6.77304 11 4.4 11C2.01431 11 0 10.6122 0 9.11623C0 7.61967 2.02696 7.24566 4.4 7.24566ZM4.4 0C6.01651 0 7.31169 1.29471 7.31169 2.91008C7.31169 4.52545 6.01651 5.82071 4.4 5.82071C2.78404 5.82071 1.48831 4.52545 1.48831 2.91008C1.48831 1.29471 2.78404 0 4.4 0Z"
        fill={iconColor}
      />
    </Icon>
  );
};

export default Profile;
