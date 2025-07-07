import * as CSS from 'csstype'
import { Aliases, BreakpointKeys, CSSProps, CSSValueType } from "../css/types"
import { ColorsRefTypes, TypographyRefTypes } from '../theme/types';
import { classNamesTypes } from 'pretty-class'

export type TagComponentType = keyof React.JSX.IntrinsicElements | React.ComponentType<any>
export type TagProps<T extends TagComponentType = 'div'> = Omit<React.HTMLProps<T>, 'width' | 'height'> & {
    component?: T;
    children?: React.ReactNode;
    ref?: any;
} & CSSPropAsAttr

export type TagPropsRoot<T extends TagComponentType = 'div'> = TagProps<T> & {
    sxr?: CSSProps
}


export interface TagCSSProperties {
    alignContent: CSSValueType<"alignContent">;
    alignItems: CSSValueType<"alignItems">;
    alignSelf: CSSValueType<"alignSelf">;
    animation: CSSValueType<"animation">;
    animationComposition: CSSValueType<"animationComposition">;
    animationDelay: CSSValueType<"animationDelay">;
    animationDirection: CSSValueType<"animationDirection">;
    animationDuration: CSSValueType<"animationDuration">;
    animationFillMode: CSSValueType<"animationFillMode">;
    animationIterationCount: CSSValueType<"animationIterationCount">;
    animationName: CSSValueType<"animationName">;
    animationTimingFunction: CSSValueType<"animationTimingFunction">;
    backdropFilter: CSSValueType<"backdropFilter">;
    background: CSSValueType<"background"> | ColorsRefTypes;
    backgroundAttachment: CSSValueType<"backgroundAttachment">;
    backgroundColor: CSSValueType<"backgroundColor"> | ColorsRefTypes;
    backgroundImage: CSSValueType<"backgroundImage">;
    backgroundOrigin: CSSValueType<"backgroundOrigin">;
    backgroundPosition: CSSValueType<"backgroundPosition">;
    backgroundRepeat: CSSValueType<"backgroundRepeat">;
    backgroundSize: CSSValueType<"backgroundSize">;
    border: CSSValueType<"border">;
    borderBottom: CSSValueType<"borderBottom">;
    borderBottomColor: CSSValueType<"borderBottomColor"> | ColorsRefTypes;
    borderBottomStyle: CSSValueType<"borderBottomStyle">;
    borderBottomWidth: CSSValueType<"borderBottomWidth">;
    borderColor: CSS.Properties['borderColor'] | ColorsRefTypes;
    borderImage: CSSValueType<"borderImage">;
    borderLeft: CSSValueType<"borderLeft">;
    borderLeftColor: CSSValueType<"borderLeftColor"> | ColorsRefTypes;
    borderLeftStyle: CSSValueType<"borderLeftStyle">;
    borderLeftWidth: CSSValueType<"borderLeftWidth">;
    borderRadius: CSSValueType<"borderRadius">;
    borderRight: CSSValueType<"borderRight">;
    borderRightColor: CSSValueType<"borderRightColor"> | ColorsRefTypes;
    borderRightStyle: CSSValueType<"borderRightStyle">;
    borderRightWidth: CSSValueType<"borderRightWidth">;
    borderStyle: CSSValueType<"borderStyle">;
    borderTop: CSSValueType<"borderTop">;
    borderTopColor: CSSValueType<"borderTopColor"> | ColorsRefTypes;
    borderTopLeftRadius: CSSValueType<"borderTopLeftRadius">;
    borderTopRightRadius: CSSValueType<"borderTopRightRadius">;
    borderTopStyle: CSSValueType<"borderTopStyle">;
    borderTopWidth: CSSValueType<"borderTopWidth">;
    borderWidth: CSSValueType<"borderWidth">;
    bottom: CSSValueType<"bottom">;
    boxShadow: CSSValueType<"boxShadow"> | number;
    boxSizing: CSSValueType<"boxSizing">;
    cursor: CSSValueType<"cursor">;
    color: CSS.Properties['color'] | ColorsRefTypes;
    display: CSSValueType<"display">;
    direction: "row" | "column" | CSSValueType<"direction">;
    filter: CSSValueType<"filter">;
    flex: CSSValueType<"flex">;
    flexBasis: CSSValueType<"flexBasis">;
    flexDirection: CSSValueType<"flexDirection">;
    flexFlow: CSSValueType<"flexFlow">;
    flexGrow: CSSValueType<"flexGrow">;
    flexShrink: CSSValueType<"flexShrink">;
    flexWrap: CSSValueType<"flexWrap">;
    float: CSSValueType<"float">;
    fontFamily: CSSValueType<"fontFamily"> | "default";
    fontSize: CSSValueType<"fontSize"> | TypographyRefTypes;
    fontStyle: CSSValueType<"fontStyle">;
    fontWeight: CSSValueType<"fontWeight"> | TypographyRefTypes;
    font: CSSValueType<"font"> | TypographyRefTypes;
    gap: CSSValueType<"gap">;
    grid: CSSValueType<"grid">;
    gridArea: CSSValueType<"gridArea">;
    gridAutoColumns: CSSValueType<"gridAutoColumns">;
    gridAutoFlow: CSSValueType<"gridAutoFlow">;
    gridAutoRows: CSSValueType<"gridAutoRows">;
    gridColumn: CSSValueType<"gridColumn">;
    gridColumnEnd: CSSValueType<"gridColumnEnd">;
    gridColumnGap: CSSValueType<"gridColumnGap">;
    gridColumnStart: CSSValueType<"gridColumnStart">;
    gridGap: CSSValueType<"gridGap">;
    gridRow: CSSValueType<"gridRow">;
    gridRowEnd: CSSValueType<"gridRowEnd">;
    gridRowGap: CSSValueType<"gridRowGap">;
    gridRowStart: CSSValueType<"gridRowStart">;
    gridTemplate: CSSValueType<"gridTemplate">;
    gridTemplateAreas: CSSValueType<"gridTemplateAreas">;
    gridTemplateColumns: CSSValueType<"gridTemplateColumns">;
    gridTemplateRows: CSSValueType<"gridTemplateRows">;
    height: CSSValueType<"height">;
    justifyContent: CSSValueType<"justifyContent">;
    justifyItems: CSSValueType<"justifyItems">;
    justifySelf: CSSValueType<"justifySelf">;
    left: CSSValueType<"left">;
    letterSpacing: CSSValueType<"letterSpacing">;
    lineBreak: CSSValueType<"lineBreak">;
    lineHeight: CSSValueType<"lineHeight"> | TypographyRefTypes;
    listStyle: CSSValueType<"listStyle">;
    margin: CSSValueType<"margin">;
    marginBlock: CSSValueType<"marginBlock">;
    marginBlockEnd: CSSValueType<"marginBlockEnd">;
    marginBlockStart: CSSValueType<"marginBlockStart">;
    marginBottom: CSSValueType<"marginBottom">;
    marginInline: CSSValueType<"marginInline">;
    marginInlineEnd: CSSValueType<"marginInlineEnd">;
    marginInlineStart: CSSValueType<"marginInlineStart">;
    marginLeft: CSSValueType<"marginLeft">;
    marginRight: CSSValueType<"marginRight">;
    marginTop: CSSValueType<"marginTop">;
    maxHeight: CSSValueType<"maxHeight">;
    maxWidth: CSSValueType<"maxWidth"> | BreakpointKeys;
    minHeight: CSSValueType<"minHeight">;
    minWidth: CSSValueType<"minWidth"> | BreakpointKeys;
    objectFit: CSSValueType<"objectFit">;
    objectPosition: CSSValueType<"objectPosition">;
    opacity: CSSValueType<"opacity">;
    order: CSSValueType<"order">;
    outline: CSSValueType<"outline">;
    overflow: CSSValueType<"overflow">;
    overflowX: CSSValueType<"overflowX">;
    overflowY: CSSValueType<"overflowY">;
    padding: CSSValueType<"padding">;
    paddingBlock: CSSValueType<"paddingBlock">;
    paddingBlockEnd: CSSValueType<"paddingBlockEnd">;
    paddingBlockStart: CSSValueType<"paddingBlockStart">;
    paddingBottom: CSSValueType<"paddingBottom">;
    paddingInline: CSSValueType<"paddingInline">;
    paddingInlineEnd: CSSValueType<"paddingInlineEnd">;
    paddingInlineStart: CSSValueType<"paddingInlineStart">;
    paddingLeft: CSSValueType<"paddingLeft">;
    paddingRight: CSSValueType<"paddingRight">;
    paddingTop: CSSValueType<"paddingTop">;
    perspective: CSSValueType<"perspective">;
    perspectiveOrigin: CSSValueType<"perspectiveOrigin">;
    pointerEvents: CSSValueType<"pointerEvents">;
    position: CSSValueType<"position">;
    right: CSSValueType<"right">;
    textAlign: CSSValueType<"textAlign">;
    textDecoration: CSSValueType<"textDecoration">;
    textShadow: CSSValueType<"textShadow">;
    textTransform: CSSValueType<"textTransform">;
    top: CSSValueType<"top">;
    transform: CSSValueType<"transform">;
    transformOrigin: CSSValueType<"transformOrigin">;
    transformStyle: CSSValueType<"transformStyle">;
    transition: CSSValueType<"transition">;
    transitionDelay: CSSValueType<"transitionDelay">;
    transitionDuration: CSSValueType<"transitionDuration">;
    transitionProperty: CSSValueType<"transitionProperty">;
    transitionTimingFunction: CSSValueType<"transitionTimingFunction">;
    translate: CSSValueType<"translate">;
    userSelect: CSSValueType<"userSelect">;
    verticalAlign: CSSValueType<"verticalAlign">;
    visibility: CSSValueType<"visibility">;
    whiteSpace: CSSValueType<"whiteSpace">;
    width: CSSValueType<"width"> | BreakpointKeys;
    wordBreak: CSSValueType<"wordBreak">;
    wordSpacing: CSSValueType<"wordSpacing">;
    wordWrap: CSSValueType<"wordWrap">;
    zIndex: CSSValueType<"zIndex">;
}

export type CSSPropAsAttr = Partial<TagCSSProperties> & Aliases & {
    baseClass?: string;
    sx?: CSSProps;
    hover?: CSSProps;
    disabled?: boolean;
    classNames?: classNamesTypes;
}