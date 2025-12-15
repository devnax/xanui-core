import * as CSS from 'csstype'
import { ColorsRefTypes, TypographyRefTypes, ThemeOptions, } from '../theme/types';
import * as oncss from 'oncss'
export type FN = (theme: ThemeOptions) => string | number
export type CSSBreakpointType = { [key in BreakpointKeys]: string | number }
export type CSSValueType<T extends keyof CSS.Properties> = CSS.Properties[T] | Partial<CSSBreakpointType> | number

export type Aliases = {
    bgcolor?: CSSValueType<'background'> | ColorsRefTypes;
    bgimage?: CSSValueType<'backgroundImage'>;
    bg?: CSSValueType<'background'> | ColorsRefTypes;
    p?: CSSValueType<'padding'>;
    pt?: CSSValueType<'padding'>;
    pr?: CSSValueType<'padding'>;
    pb?: CSSValueType<'padding'>;
    pl?: CSSValueType<'padding'>;
    px?: CSSValueType<'padding'>;
    py?: CSSValueType<'margin'>;
    m?: CSSValueType<'margin'>;
    mt?: CSSValueType<'margin'>;
    mr?: CSSValueType<'margin'>;
    mb?: CSSValueType<'margin'>;
    ml?: CSSValueType<'margin'>;
    mx?: CSSValueType<'margin'>;
    my?: CSSValueType<'margin'>;
    size?: CSSValueType<'width'>;
    spacing?: Partial<CSSBreakpointType> | number;

    radius?: CSSValueType<'borderRadius'> | number;
    borderRadius?: CSSValueType<'borderRadius'> | number;
    shadow?: CSSValueType<'boxShadow'> | number;
    flexBox?: boolean;
    flexRow?: boolean;
    flexColumn?: boolean;
    flexWraped?: boolean;
    direction?: "row" | "column" | CSSValueType<'direction'>;
    gap?: CSSValueType<'gap'>;

    color?: CSSValueType<'color'> | ColorsRefTypes;
    width?: CSSValueType<'width'> | BreakpointKeys;
    height?: CSSValueType<'height'>
    borderColor?: CSSValueType<'backgroundColor'> | ColorsRefTypes;

    fontSize?: CSSValueType<"fontSize"> | TypographyRefTypes;
    minWidth?: CSSValueType<"minWidth"> | BreakpointKeys;
    maxWidth?: CSSValueType<"maxWidth"> | BreakpointKeys;
    minHeight?: CSSValueType<"minHeight">
    maxHeight?: CSSValueType<"maxHeight">
}


export type BreakpointKeys = "xs" | "sm" | "md" | "lg" | "xl"

export type CSSProps = oncss.CSSProps<Aliases, BreakpointKeys>
export type CSSOptionProps = oncss.CSSOptionProps<Aliases, BreakpointKeys>

export type GlobalCSS = {
    [key: string]: oncss.CSSPropsWithoutGlobal<Aliases, BreakpointKeys>;
}