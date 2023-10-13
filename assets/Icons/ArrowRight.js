import {Icon, useToken} from '@chakra-ui/react';

const ArrowRight = ({color = 'white', ...props}) => {
  const [iconColor] = useToken('colors', [color]);
  return (
    <Icon viewBox="0 0 8 13" {...props}>
      <path
        d="M0.829259 12.8158C0.605938 12.5924 0.585637 12.243 0.768353 11.9967L0.829259 11.9262L6.25515 6.5L0.829259 1.07382C0.605938 0.850505 0.585637 0.501045 0.768353 0.25479L0.829259 0.18424C1.05258 -0.0390806 1.40204 -0.0593824 1.64829 0.123334L1.71884 0.18424L7.58981 6.05521C7.81313 6.27853 7.83343 6.62799 7.65072 6.87424L7.58981 6.94479L1.71884 12.8158C1.47319 13.0614 1.07491 13.0614 0.829259 12.8158Z"
        fill={iconColor}
      />
    </Icon>
  );
};

export default ArrowRight;