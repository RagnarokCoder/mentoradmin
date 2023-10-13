import {Box, Stack} from '@chakra-ui/react';

const MainLayout = ({children}) => (
  <Stack direction="row">
    <Box flex={1}>{children}</Box>
  </Stack>
);

export default MainLayout;
