import { css } from '../css'

export type UseScrollbarOption = {
   root_cls?: string;
   thumbSize?: number
   thumbColor?: string
   trackColor?: string;
}

type ClassName = string

const useScrollbar = ({ root_cls, thumbSize, thumbColor, trackColor }: UseScrollbarOption): ClassName => {

   thumbSize = thumbSize || 8
   thumbColor = thumbColor || "var(--color-common-subtext)"
   trackColor = trackColor || "var(--color-common-lighter)"

   const cls = (cls: string) => root_cls ? `${root_cls} ${cls}` : cls

   return css({
      "@global": {

         [cls('*::-webkit-scrollbar')]: {
            width: thumbSize,
            height: thumbSize,
            cursor: "pointer",
         },
         [cls("*::-webkit-scrollbar-thumb")]: {
            backgroundColor: thumbColor,
            borderRadius: "6px",
         },
         [cls("*::-webkit-scrollbar-thumb:hover")]: {
            backgroundColor: thumbColor,
         },
         [cls("*::-webkit-scrollbar-track")]: {
            backgroundColor: trackColor,
            borderRadius: "6px",
         },
         // [cls('*')]: {
         //    scrollbarWidth: "thin",
         //    scrollbarColor: `${thumbColor} ${trackColor}`,
         // },
      }
   }, {
      injectStyle: typeof window !== 'undefined'
   }) as any
}

export default useScrollbar
