import {Icon, useToken} from '@chakra-ui/react';

const Bars = ({color = 'white', ...props}) => {
  const [iconColor] = useToken('colors', [color]);
  return (
    <Icon viewBox="0 0 22 14" {...props}>
      <rect width="20" height="2" rx="1" fill={iconColor} />
      <rect y="6" width="22" height="2" rx="1" fill={iconColor} />
      <rect y="12" width="15" height="2" rx="1" fill={iconColor} />
    </Icon>
  );
};

export default Bars;
