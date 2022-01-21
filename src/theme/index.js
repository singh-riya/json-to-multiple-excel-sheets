import { createTheme } from "@material-ui/core/styles";
import { pink, grey } from "@material-ui/core/colors";

export const theme = ({
  palette: {
    primary: {
      main: pink[600],
      grey: grey[500]
    },
    secondary: {
      main: pink[200],
    },
  },
});

export const light = {
  ...theme,
  palette: {
    type: "light",
    ...theme.palette,
  },
};

export const dark = {
  ...theme,
  palette: {
    type: "dark",
    ...theme.palette,
  },
};
