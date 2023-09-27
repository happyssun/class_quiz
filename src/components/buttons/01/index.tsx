import { Button, ButtonProps, styled, useTheme } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

const MyButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

export function Button01({ isValid, error, children }) {
  const theme = useTheme();
  console.log("isValid prop:", isValid);
  return (
    <MyButton
      variant="contained"
      disabled={!isValid || !!error} // isValid가 false일 때 버튼을 비활성화
      type="submit"
    >
      {children}
    </MyButton>
  );
}
