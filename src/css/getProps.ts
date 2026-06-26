import { CSSProps } from "./types";

const getProps = (prop: string, value: string, _css: CSSProps) => {
  let important;
  if (typeof value === "string") {
    const split = value.split("!");
    important = split[1] ? "!important" : "";
    value = split[0];
  }

  if (prop === "disabled") {
    if ((value as any) === true) {
      let c: any = {
        pointerEvents: "none!important",
        cursor: "not-allowed!important",
        userSelect: "none!important",
        opacity: "0.6!important",
        transition: "none",
        boxShadow: "none",
      };
      return c;
    }
    return {};
  } else if (prop === "border" && typeof value === "number") {
    return { borderWidth: value };
  } else if (prop === "spacing" && typeof value === "number") {
    const val = value * 8;
    const hasWidth = "width" in _css;
    const width = `calc(${hasWidth ? _css.width : "100%"} + ${val}px)`;
    return {
      marginLeft: `-${val}px`,
      marginTop: `-${val}px`,
      width: width,

      "& > *": {
        paddingLeft: `${val}px`,
        paddingTop: `${val}px`,
      },
    } as any;
  }
};

export default getProps;
