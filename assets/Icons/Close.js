import {Icon, useToken} from '@chakra-ui/react';

const Close = ({color = 'white', ...props}) => {
  const [iconColor] = useToken('colors', [color]);
  return (
    <Icon viewBox="0 0 27 27" {...props}>
      <path
        d="M19.3698 20.0462C19.066 20.35 18.654 20.5207 18.2243 20.5207C17.7947 20.5207 17.3827 20.35 17.0789 20.0462L13.5 15.9557L9.92117 20.0449C9.77119 20.1973 9.59252 20.3186 9.39545 20.4016C9.19838 20.4847 8.98682 20.5279 8.77297 20.5287C8.55912 20.5296 8.34721 20.4881 8.14947 20.4067C7.95173 20.3253 7.77207 20.2055 7.62086 20.0543C7.46964 19.903 7.34986 19.7234 7.26843 19.5256C7.18699 19.3279 7.14551 19.116 7.14638 18.9021C7.14725 18.6883 7.19046 18.4767 7.2735 18.2797C7.35654 18.0826 7.47778 17.9039 7.63022 17.7539L11.3535 13.5014L7.62887 9.24624C7.47643 9.09626 7.35519 8.91758 7.27215 8.72051C7.18911 8.52344 7.1459 8.31188 7.14503 8.09803C7.14416 7.88418 7.18564 7.67228 7.26708 7.47454C7.34851 7.2768 7.46829 7.09714 7.61951 6.94592C7.77072 6.79471 7.95038 6.67493 8.14812 6.59349C8.34586 6.51206 8.55777 6.47058 8.77162 6.47145C8.98547 6.47232 9.19703 6.51552 9.3941 6.59857C9.59117 6.68161 9.76984 6.80285 9.91982 6.95529L13.5 11.0471L17.0789 6.95529C17.2289 6.80285 17.4075 6.68161 17.6046 6.59857C17.8017 6.51552 18.0132 6.47232 18.2271 6.47145C18.4409 6.47058 18.6528 6.51206 18.8506 6.59349C19.0483 6.67493 19.228 6.79471 19.3792 6.94592C19.5304 7.09714 19.6502 7.2768 19.7316 7.47454C19.8131 7.67228 19.8545 7.88418 19.8537 8.09803C19.8528 8.31188 19.8096 8.52344 19.7265 8.72051C19.6435 8.91758 19.5223 9.09626 19.3698 9.24624L15.6465 13.5014L19.3698 17.7539C19.5204 17.9044 19.6399 18.0831 19.7215 18.2797C19.803 18.4764 19.8449 18.6872 19.8449 18.9001C19.8449 19.113 19.803 19.3238 19.7215 19.5205C19.6399 19.7171 19.5204 19.8958 19.3698 20.0462Z"
        fill={iconColor}
      />
    </Icon>
  );
};

export default Close;