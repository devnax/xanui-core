import { OptionAliases } from "oncss";
import { Aliases } from "./types";

const isStr = (v: any, or: any) => (typeof v === "string" ? v : or);

const aliases: OptionAliases<Aliases> = {
  bgcolor: (v) => ({ backgroundColor: v }),
  bgimage: (v) => ({
    backgroundImage: `url(${v})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  }),
  bg: (v) => ({ background: v }),
  p: (v) => ({ padding: isStr(v, 8 * v) }),
  pt: (v) => ({ paddingTop: isStr(v, 8 * v) }),
  pr: (v) => ({ paddingRight: isStr(v, 8 * v) }),
  pb: (v) => ({ paddingBottom: isStr(v, 8 * v) }),
  pl: (v) => ({ paddingLeft: isStr(v, 8 * v) }),
  px: (v) => ({ paddingLeft: isStr(v, 8 * v), paddingRight: isStr(v, 8 * v) }),
  py: (v) => ({ paddingTop: isStr(v, 8 * v), paddingBottom: isStr(v, 8 * v) }),
  m: (v) => ({ margin: isStr(v, 8 * v) }),
  mt: (v) => ({ marginTop: isStr(v, 8 * v) }),
  mr: (v) => ({ marginRight: isStr(v, 8 * v) }),
  mb: (v) => ({ marginBottom: isStr(v, 8 * v) }),
  ml: (v) => ({ marginLeft: isStr(v, 8 * v) }),
  mx: (v) => ({ marginLeft: isStr(v, 8 * v), marginRight: isStr(v, 8 * v) }),
  my: (v) => ({ marginTop: isStr(v, 8 * v), marginBottom: isStr(v, 8 * v) }),
  radius: (v) => ({ borderRadius: isStr(v, 8 * v) }),
  borderRadius: (v) => ({ borderRadius: isStr(v, 8 * v) }),
  shadow: (v) => ({ boxShadow: v }),
  flexBox: (v) => (v ? { display: "flex" } : {}),
  flexRow: (v) => (v ? { flexDirection: "row" } : {}),
  flexColumn: (v) => (v ? { flexDirection: "column" } : {}),
  flexWraped: (v) => (v ? { flexWrap: "wrap" } : {}),
  direction: (v) =>
    v === "row" || v === "column" ? { flexDirection: v } : { direction: v },
  gap: (v) => ({ gap: isStr(v, 8 * v) }),
  border: (v) => {
    if (v === false) return {};
    if (v === true || typeof v === "number") {
      return {
        border: `${v === true ? 1 : v}px solid var(--color-divider-primary)`,
      };
    }
    return { border: v };
  },
  borderLeft: (v) => {
    if (v === false) return {};

    if (v === true || typeof v === "number") {
      return {
        borderLeft: `${v === true ? 1 : v}px solid var(--color-divider-primary)`,
      };
    }
    return { borderLeft: v };
  },
  borderRight: (v) => {
    if (v === false) return {};

    if (v === true || typeof v === "number") {
      return {
        borderRight: `${v === true ? 1 : v}px solid var(--color-divider-primary)`,
      };
    }
    return { borderRight: v };
  },
  borderTop: (v) => {
    if (v === false) return {};

    if (v === true || typeof v === "number") {
      return {
        borderTop: `${v === true ? 1 : v}px solid var(--color-divider-primary)`,
      };
    }
    return { borderTop: v };
  },
  borderBottom: (v) => {
    if (v === false) return {};

    if (v === true || typeof v === "number") {
      return {
        borderBottom: `${v === true ? 1 : v}px solid var(--color-divider-primary)`,
      };
    }
    return { borderBottom: v };
  },
};

export default aliases;
