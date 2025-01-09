import { ThemeOptions, ThemeColor } from "./types"
import { alpha } from "../css"

const createColor = (theme: ThemeOptions, name: keyof ThemeColor) => {
   let color = theme.colors[name]
   let { primary, secondary } = color as any
   let text = (color as any).text || theme.colors.text.primary
   let _alpha = alpha(primary, .1)

   const isBag = (a: any, b: any) => name === "background" ? a : b

   return {
      alpha: _alpha,
      template: {
         outline: {
            bgcolor: "transparent",
            color: isBag(text, primary),
            border: 1,
            borderColor: isBag("divider", alpha(primary, .4)),
            hover: {
               color: isBag(text, primary),
               borderColor: isBag("divider", alpha(primary, .8)),
            }
         },
         fill: {
            bgcolor: isBag(secondary, primary),
            color: text,
            hover: {
               bgcolor: isBag(alpha(secondary, .6), secondary),
               color: text,
            }
         },
         text: {
            bgcolor: "transparent",
            color: isBag(text, primary),
            hover: {
               bgcolor: isBag(alpha(secondary, .6), alpha(primary, .1)),
               color: isBag(text, primary),
            }
         },
         alpha: {
            bgcolor: isBag(alpha(secondary, .5), alpha(primary, .1)),
            color: isBag(text, primary),
            hover: {
               bgcolor: isBag(alpha(secondary, .8), alpha(primary, .15)),
               color: isBag(text, primary),
            }
         }
      }
   }
}

export default createColor