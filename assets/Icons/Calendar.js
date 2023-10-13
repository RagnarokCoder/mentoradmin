import {Icon, useToken} from '@chakra-ui/react';

const Calendar = ({color = 'white', ...props}) => {
  const [iconColor] = useToken('colors', [color]);
  return (
    <Icon viewBox="0 0 14 15" {...props}>
      <path d="M6.25 7.5H10.75V12H6.25V7.5Z" fill={iconColor} />
      <path
        d="M12.25 1.5H10.75V0H9.25V1.5H4.75V0H3.25V1.5H1.75C0.92275 1.5 0.25 2.17275 0.25 3V13.5C0.25 14.3273 0.92275 15 1.75 15H12.25C13.0773 15 13.75 14.3273 13.75 13.5V3C13.75 2.17275 13.0773 1.5 12.25 1.5ZM12.2507 13.5H1.75V4.5H12.25L12.2507 13.5Z"
        fill={iconColor}
      />
    </Icon>
  );
};

export default Calendar;
