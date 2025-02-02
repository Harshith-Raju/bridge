import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light", // Change to "dark" for default dark mode
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;
