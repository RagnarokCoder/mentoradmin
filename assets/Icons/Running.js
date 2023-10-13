import {Icon, useToken} from '@chakra-ui/react';

const Running = ({color = 'white', ...props}) => {
  const [iconColor] = useToken('colors', [color]);
  return (
    <Icon viewBox="0 0 14 15" {...props}>
      <path
        d="M10.75 3.5C11.5784 3.5 12.25 2.82843 12.25 2C12.25 1.17157 11.5784 0.5 10.75 0.5C9.92157 0.5 9.25 1.17157 9.25 2C9.25 2.82843 9.92157 3.5 10.75 3.5Z"
        fill={iconColor}
      />
      <path
        d="M9.83275 7.22673C10.0049 7.48328 10.2519 7.68064 10.5401 7.79201C10.8283 7.90337 11.1438 7.92335 11.4437 7.84923L13.9307 7.22748L13.5685 5.77248L11.0815 6.39423L10.0472 4.84398C9.82628 4.5129 9.48334 4.28266 9.09325 4.20348L6.20875 3.62598C5.88606 3.56122 5.55102 3.60449 5.25537 3.74913C4.95973 3.89377 4.71993 4.13171 4.573 4.42623L3.3295 6.91323L4.67125 7.58448L5.91475 5.09673L7.39 5.39223L3.5755 11.75H0.25V13.25H3.5755C4.099 13.25 4.59175 12.971 4.86175 12.5217L6.30025 10.1247L10.177 10.9002L11.539 14.987L12.961 14.5122L11.5997 10.4262C11.5157 10.1754 11.3671 9.95108 11.1688 9.77596C10.9705 9.60084 10.7296 9.48107 10.4703 9.42872L8.191 8.97348L9.52 6.75798L9.83275 7.22673Z"
        fill={iconColor}
      />
    </Icon>
  );
};

export default Running;
