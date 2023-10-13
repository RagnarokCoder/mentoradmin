import {Icon, useToken} from '@chakra-ui/react';

const Trash = ({color = 'white', ...props}) => {
  const [iconColor] = useToken('colors', [color]);
  return (
    <Icon viewBox="0 0 25 28" {...props}>
      <path
        d="M15.7692 2.5H19.6923C20.4769 2.5 21 3 21 3.75V5H4V3.75C4 3 4.65385 2.5 5.30769 2.5H9.23077C9.49231 1.125 10.9308 0 12.5 0C14.0692 0 15.5077 1.125 15.7692 2.5ZM10.5385 2.5H14.4615C14.2 1.75 13.2846 1.25 12.5 1.25C11.7154 1.25 10.8 1.75 10.5385 2.5ZM5.30769 6.25H19.6923L18.5154 18.875C18.5154 19.5 17.8615 20 17.2077 20H7.79231C7.13846 20 6.61538 19.5 6.48462 18.875L5.30769 6.25Z"
        fill={iconColor}
      />
    </Icon>
  );
};

export default Trash;
