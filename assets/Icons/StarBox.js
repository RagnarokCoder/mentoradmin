import {Icon, useToken} from '@chakra-ui/react';

const StarBox = ({color = 'white', ...props}) => {
  const [iconColor] = useToken('colors', [color]);
  return (
    <Icon viewBox="0 0 12 10" {...props}>
      <path
        d="M8.91989 0C10.1888 0 11.2215 1.02333 11.2215 2.28061L11.2221 3.76799C11.2221 3.87699 11.1782 3.98268 11.1004 4.05974C11.0221 4.13736 10.9165 4.18085 10.8054 4.18085C10.3493 4.18085 9.97821 4.54856 9.97821 5.0005C9.97821 5.45244 10.3493 5.82016 10.8054 5.82016C11.0354 5.82016 11.2221 6.00512 11.2221 6.23301V7.71984C11.2221 8.97712 10.1899 9.9999 8.921 9.9999H2.41273C1.14385 9.9999 0.111084 8.97712 0.111084 7.71984V6.23301C0.111084 6.00512 0.297749 5.82016 0.527747 5.82016C0.984409 5.82016 1.35552 5.45244 1.35552 5.0005C1.35552 4.56012 0.999409 4.22874 0.527747 4.22874C0.417192 4.22874 0.311638 4.18525 0.233305 4.10763C0.154972 4.03002 0.111084 3.92488 0.111084 3.81588L0.112195 2.28061C0.112195 1.02333 1.14441 0 2.41328 0H8.91989ZM5.6677 2.86301C5.50992 2.86301 5.36881 2.94999 5.29826 3.08981L4.89326 3.90286L3.98994 4.03332C3.83383 4.05534 3.70605 4.16103 3.65661 4.30966C3.60772 4.45829 3.64716 4.61902 3.76049 4.72802L4.41549 5.35996L4.26104 6.25338C4.23438 6.40751 4.29715 6.56054 4.42493 6.65247C4.49715 6.70367 4.58104 6.73009 4.66604 6.73009C4.73104 6.73009 4.79659 6.71413 4.85659 6.68275L5.66659 6.26109L6.47491 6.68165C6.61491 6.75596 6.78102 6.7444 6.90824 6.65192C7.03657 6.56054 7.09935 6.40751 7.07268 6.25338L6.91768 5.35996L7.57268 4.72802C7.68657 4.61902 7.72601 4.45829 7.67657 4.30966C7.62768 4.16103 7.4999 4.05534 7.34546 4.03387L6.44047 3.90286L6.03547 3.09036C5.96603 2.95054 5.82492 2.86356 5.6677 2.86301Z"
        fill={iconColor}
      />
    </Icon>
  );
};

export default StarBox;
