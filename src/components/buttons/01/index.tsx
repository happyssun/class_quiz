import { Button, ButtonProps, styled, useTheme } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

const MyButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

export function Button01(props) {
  const theme = useTheme();
  return (
    <MyButton
      variant="contained"
      disabled={!props.isValid} // isValid가 false일 때 버튼을 비활성화
    >
      등록하기
    </MyButton>
  );
}
