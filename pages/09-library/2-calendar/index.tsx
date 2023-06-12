import styled from "@emotion/styled";
import { Calendar, theme } from "antd";
import { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Dayjs } from "dayjs";

export default function CalendarLibrary() {
  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const { token } = theme.useToken();

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div style={wrapperStyle}>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </div>
  );
}
