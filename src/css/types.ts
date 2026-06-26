import * as CSS from "csstype";
import {
  ColorsRefTypes,
  TypographyRefTypes,
  ThemeOptions,
} from "../theme/types";
import * as oncss from "oncss";
export type FN = (theme: ThemeOptions) => string | number;
export type CSSBreakpointType = { [key in BreakpointKeys]: string | number };
export type CSSValueType<T extends keyof CSS.Properties> =
  | CSS.Properties[T]
  | Partial<CSSBreakpointType>
  | number;

export type Aliases = {
  bgcolor?: CSSValueType<"background"> | ColorsRefTypes;
  bgimage?: CSSValueType<"backgroundImage">;
  bg?: CSSValueType<"background"> | ColorsRefTypes;
  p?: CSSValueType<"padding"> | BreakpointKeys;
  pt?: CSSValueType<"padding"> | BreakpointKeys;
  pr?: CSSValueType<"padding"> | BreakpointKeys;
  pb?: CSSValueType<"padding"> | BreakpointKeys;
  pl?: CSSValueType<"padding"> | BreakpointKeys;
  px?: CSSValueType<"padding"> | BreakpointKeys;
  py?: CSSValueType<"margin"> | BreakpointKeys;
  m?: CSSValueType<"margin"> | BreakpointKeys;
  mt?: CSSValueType<"margin"> | BreakpointKeys;
  mr?: CSSValueType<"margin"> | BreakpointKeys;
  mb?: CSSValueType<"margin"> | BreakpointKeys;
  ml?: CSSValueType<"margin"> | BreakpointKeys;
  mx?: CSSValueType<"margin"> | BreakpointKeys;
  my?: CSSValueType<"margin"> | BreakpointKeys;
  size?: CSSValueType<"width">;
  spacing?: Partial<CSSBreakpointType> | number;

  radius?: CSSValueType<"borderRadius"> | BreakpointKeys | number;
  borderRadius?: CSSValueType<"borderRadius"> | BreakpointKeys | number;
  shadow?: CSSValueType<"boxShadow"> | BreakpointKeys;
  flexBox?: boolean;
  flexRow?: boolean;
  flexColumn?: boolean;
  flexWraped?: boolean;
  direction?: "row" | "column" | CSSValueType<"direction">;
  gap?: CSSValueType<"gap"> | BreakpointKeys;

  color?: CSSValueType<"color"> | ColorsRefTypes;
  width?: CSSValueType<"width"> | BreakpointKeys;
  height?: CSSValueType<"height">;

  fontSize?: CSSValueType<"fontSize"> | TypographyRefTypes;
  minWidth?: CSSValueType<"minWidth"> | BreakpointKeys;
  maxWidth?: CSSValueType<"maxWidth"> | BreakpointKeys;
  minHeight?: CSSValueType<"minHeight">;
  maxHeight?: CSSValueType<"maxHeight">;

  // border
  border?: CSSValueType<"border"> | number | boolean;
  borderLeft?: CSSValueType<"border"> | number | boolean;
  borderTop?: CSSValueType<"border"> | number | boolean;
  borderRight?: CSSValueType<"border"> | number | boolean;
  borderBottom?: CSSValueType<"border"> | number | boolean;
};

export type BreakpointKeys = "xs" | "sm" | "md" | "lg" | "xl";

export type CSSProps = oncss.CSSProps<Aliases, BreakpointKeys>;
export type CSSOptionProps = oncss.CSSOptionProps<Aliases, BreakpointKeys>;

export type GlobalCSS = {
  [key: string]: oncss.CSSPropsWithoutGlobal<Aliases, BreakpointKeys>;
};
