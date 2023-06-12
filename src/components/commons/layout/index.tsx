import LayoutBanner from "./banner";
import LayoutFooter from "./footer";
import LayoutHeader from "./header";
import LayoutNavigation from "./navigation";

export default function Layout(props) {
  return (
    <>
      <LayoutHeader></LayoutHeader>
      <LayoutBanner></LayoutBanner>
      <LayoutNavigation></LayoutNavigation>
      <div style={{ height: "500px", display: "flex" }}>
        <div style={{ width: "30%", backgroundColor: "skyblue" }}>
          Sidebar Part
        </div>
        <div style={{ width: "70%" }}>{props.children}</div>
      </div>
      <LayoutFooter></LayoutFooter>
    </>
  );
}
