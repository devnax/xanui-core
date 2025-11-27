import { getTheme } from '../theme'
import { css } from '../css'
import { ThemeOptions } from '../theme/types';

export type UseScrollbarOption = {
   themeName: string
   root_cls?: string;
   thumbSize?: number
   thumbColor?: string
   trackColor?: string
}

type ClassName = string

const useScrollbar = ({ themeName, root_cls, thumbSize, thumbColor, trackColor }: UseScrollbarOption): ClassName => {
   let theme = getTheme(themeName)
   if (!theme) {
      console.error(`useScrollbar: The theme '${themeName}' is not defined. Please make sure to use a valid theme name.`)
      theme = getTheme("light") as ThemeOptions
   }

   thumbSize = thumbSize || 10
   thumbColor = thumbColor || theme.colors.text.secondary
   trackColor = trackColor || theme.colors.divider
   root_cls = root_cls || ""

   let clss = {
      "*": root_cls ? `${root_cls} *` : `*`,
      "scrollbar": root_cls ? `${root_cls}::-webkit-scrollbar, ${root_cls} ::-webkit-scrollbar` : `::-webkit-scrollbar`,
      "scrollbarThumb": root_cls ? `${root_cls}::-webkit-scrollbar-thumb, ${root_cls} ::-webkit-scrollbar-thumb` : `::-webkit-scrollbar-thumb`,
      "scrollbarThumbHover": root_cls ? `${root_cls}::-webkit-scrollbar-thumb:hover, ${root_cls} ::-webkit-scrollbar-thumb:hover` : `::-webkit-scrollbar-thumb:hover`,
      "scrollbarTrack": root_cls ? `${root_cls}::-webkit-scrollbar-track, ${root_cls} ::-webkit-scrollbar-track` : `::-webkit-scrollbar-track`,
   }

   return css({
      "@global": {
         [clss['*']]: {
            scrollbarWidth: "thin",
            scrollbarColor: `${thumbColor} ${trackColor}`,
         },
         [clss["scrollbar"]]: {
            width: thumbSize,
            height: thumbSize,
         },
         [clss["scrollbarThumb"]]: {
            backgroundColor: thumbColor,
            borderRadius: "5px",
            border: "2px solid #f4f4f4",
         },
         [clss["scrollbarThumbHover"]]: {
            backgroundColor: thumbColor,
         },
         [clss['scrollbarTrack']]: {
            backgroundColor: trackColor,
            borderRadius: "5px",
         },
      }
   }) as any
}

export default useScrollbar
