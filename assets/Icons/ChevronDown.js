import {Icon, useToken} from '@chakra-ui/react';

const ChevronDown = ({color = 'white', ...props}) => {
  const [iconColor] = useToken('colors', [color]);
  return (
    <Icon viewBox="0 0 16 16" {...props}>
      <path
        d="M13.4713 5.43133C13.2113 5.17133 12.7893 5.17133 12.5286 5.43133L7.99995 9.95999L3.47128 5.43133C3.21128 5.17133 2.78928 5.17133 2.52862 5.43133C2.26862 5.69133 2.26862 6.11333 2.52862 6.37399L7.52862 11.374C7.65862 11.5047 7.82862 11.57 7.99995 11.57C8.17129 11.57 8.34129 11.5047 8.47128 11.3747L13.4713 6.37466C13.7313 6.11466 13.7313 5.69333 13.4713 5.43266V5.43133Z"
        fill={iconColor}
      />
    </Icon>
  );
};

export default ChevronDown;
