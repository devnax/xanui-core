"use client"
import { getTheme } from './theme'
import { css } from './css'

const useScrollbar = (themeName: string, root_cls?: string): string => {
   const theme = getTheme(themeName)
   if (!theme) throw new Error(`theme "${themeName}" not found for ScrollbarCss`);

   let thumbSize = 10
   let thumbColor = theme.colors.text.secondary
   let trackColor = theme.colors.divider
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
