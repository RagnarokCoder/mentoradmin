import {Icon, useToken} from '@chakra-ui/react';

const ArrowBack = ({color = 'black', ...props}) => {
  const [iconColor] = useToken('colors', [color]);
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        d="M9 12L14 7"
        stroke={iconColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M9 12.1924L14 17.1924"
        stroke={iconColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </Icon>
  );
};

export default ArrowBack;
