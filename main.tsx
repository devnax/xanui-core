import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider, useTheme } from "./src/theme";
import {
  css,
  Easing,
  Tag,
  TagComponentType,
  TagProps,
  ThemeOptionInput,
  Transition,
  useAppRootElement,
  useBreakpoint,
  useBreakpointProps,
  useColorTemplate,
  useThemeComponent,
  useInView,
} from "./src";
import AppRoot from "./src/AppRoot";
import useTransition from "./src/hooks/useTransition";
import useTransitionGroup from "./src/hooks/useTransitionGroup";
import { colorScale } from "hueforge";

const AnimateGroup = () => {
  const items = [
    { key: 1, from: { opacity: 0, y: -20 }, to: { opacity: 1, y: 0 } },
    { key: 2, from: { opacity: 0, y: -20 }, to: { opacity: 1, y: 0 } },
    { key: 3, from: { opacity: 0, y: -20 }, to: { opacity: 1, y: 0 } },
  ];

  const { toggle, statuses } = useTransitionGroup({
    items,
    stagger: 100,
    duration: 400,
    onUpdate: (val, key) => {
      const el = document.getElementById(`item-${key}`);
      if (el) {
        el.style.opacity = String(val.opacity);
        el.style.transform = `translateY(${val.y}px)`;
      }
    },
  });

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.key}
          id={`item-${item.key}`}
          className={`item ${statuses[item.key]}`}
        >
          Item {item.key}
        </div>
      ))}
      <button
        onClick={() => {
          toggle();
        }}
      >
        Toggle
      </button>
    </div>
  );
};
const Animate = () => {
  const ref = useRef<HTMLElement>(null);

  const animate = useTransition({
    easing: Easing.easeOutBounce,
    // duration: 10000,
    initialStatus: "entered",
    from: () => {
      return { x: 3, scale: 0, opacity: 0 };
    },
    to: { x: 10, scale: 1, opacity: 1 },
    // onEnter: () => console.log("enter"),
    // onEntered: () => console.log("entered"),
    // onExit: () => console.log("exit"),
    // onExited: () => console.log("exited"),

    breakpoints: {
      x: [
        {
          value: 5,
          callback: () => {
            console.log("5");
          },
        },
      ],
    },

    onUpdate: ({ x, scale, opacity }) => {
      if (!ref.current) return;
      ref.current.style.transform = `scale(${scale})`;
      ref.current.style.opacity = String(opacity);
    },
  });

  return (
    <Tag m={2} flexBox gap={2} flexColumn>
      <Tag ref={ref} width={100} height={100} bgcolor="red" />
      {/* {
        animate.status !== 'exited' && <Tag
          ref={ref}
          width={100}
          height={100}
          bgcolor="red"
        />
      } */}

      <button
        onClick={() => {
          animate.toggle();
        }}
      >
        Toggle
      </button>
    </Tag>
  );
};

const TransBox = ({ open, trans, content }: any) => {
  const [closed, setClosed] = useState(false);
  useEffect(() => {
    // if (closed && open) {
    //   setClosed(false)
    // }
  }, [open]);
  // if (closed) return null
  return (
    <Transition
      // duration={400}
      open={open}
      variant={trans}
      // disableInitialTransition
      // onEnter={() => {
      //   console.log("Open");
      // }}
      // onEntered={() => {
      //   console.log("Opened");
      // }}
      // onExit={() => {
      //   console.log("close");
      // }}
      // onExited={() => {
      //   console.log("closed");
      // }}
    >
      <Tag
        component="div"
        width={300}
        bgcolor="green"
        radius={1}
        overflow={"hidden"}
      >
        <Tag px={2} bgcolor={"default.base"}>
          {Array(content)
            .fill(1)
            .map((v, i) => {
              return (
                <Tag radius={1} px={2} key={i}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Tag>
              );
            })}
        </Tag>
      </Tag>
    </Transition>
  );
};

const Trans = () => {
  const theme = useTheme();
  const [v, setV] = React.useState<any>("collapseVertical");
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState(1);

  useEffect(() => {
    setInterval(() => {
      // setOpen(i => !i)
    }, 1000);
  }, []);
  return (
    <Tag height={400}>
      <TransBox open={open} trans={v} content={content} />
      <button onClick={() => setOpen(!open)}>Click</button>
      <button onClick={() => setV(v === "fadeDown" ? "zoom" : "fadeDown")}>
        change
      </button>
      <button onClick={() => setContent(content == 1 ? 5 : 1)}>
        add content
      </button>
      {/* <Transition open={open} variant={"fade"} > */}
      {/* <Tag
        component="div"
        width={300}
        bgcolor="green"
        radius={1}
        p={2}
        overflow={"hidden"}
        height={300}
      >
        <Transition open={open} variant={v} disableInitialTransition
          onOpened={() => console.log("opened")}
        // onClosed={() => console.log("closed")}
        >
          <Tag
            className='test'
            component="div"
            radius={1}
            px={2}
            bgcolor={"default.base"}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Tag>
        </Transition>
      </Tag> */}
      {/* </Transition> */}
    </Tag>
  );
};

const Button = ({ children, color, variant, ...rest }: any) => {
  const t = useColorTemplate(color || "default", variant || "fill");
  return (
    <Tag>
      <Tag
        component={"button"}
        cursor={"pointer"}
        p={0.5}
        px={2}
        radius={1}
        minWidth={100}
        {...t.main}
        hover={{ ...t.hover }}
        {...rest}
      >
        {children}
      </Tag>
    </Tag>
  );
};

const Input = (props: any) => {
  const [_p]: any = useThemeComponent("Input", props, {});
  const { icon, ...rest } = useBreakpointProps(_p);

  return (
    <Tag>
      <Tag
        component={"input"}
        p={1}
        px={2}
        radius={1}
        border="1px solid"
        borderColor="default.divider"
        bgcolor="default.base"
        color="default.contrast"
        {...rest}
      />
      {icon && <Tag component={"span"}>{icon}</Tag>}
    </Tag>
  );
};

const ACtx = createContext<any>(null);
const AuthProvider = ({ children, value }: any) => {
  return <ACtx.Provider value={value}>{children}</ACtx.Provider>;
};

const useAuth = () => useContext(ACtx);

const Auth = () => {
  const au = useAuth();
  return <h1>Auth</h1>;
};

const RND = () => {
  const bp = useBreakpoint();
  const theme = useTheme();

  return (
    <button
      onClick={() => {
        // const rr = Renderar.render(Auth)
        theme.update(
          theme.name === "dark" ? { mode: "light" } : { mode: "dark" },
        );
      }}
    >
      render
    </button>
  );
};

const ColorBox = ({ children, ...props }: any) => {
  return (
    <Tag
      width={100}
      height={80}
      radius={1}
      flexBox
      justifyContent={"center"}
      alignItems={"center"}
      transition={"all .3s"}
      {...props}
    >
      {children}
    </Tag>
  );
};

const ColorPallate = ({ color }: any) => {
  return (
    <Tag flexBox gap={0} flexColumn>
      <Tag textTransform={"capitalize"} fontWeight={"bold"}>
        {color}
      </Tag>
      <Tag flexBox flexRow flexWraped p={1} gap={1}>
        <ColorBox
          bgcolor={`${color}.base`}
          border="1px solid"
          borderColor={`${color}.divider`}
          color={`${color}.contrast`}
          hover={{
            bgcolor: `${color}.surface`,
          }}
          radius={1}
        >
          base
        </ColorBox>
        <ColorBox
          bgcolor={`${color}.elevated`}
          color={`${color}.contrast`}
          radius={1}
        >
          elevated
        </ColorBox>
        <ColorBox
          bgcolor={`${color}.emphasis`}
          color={`${color}.contrast`}
          radius={1}
        >
          emphasis
        </ColorBox>
        <ColorBox
          bgcolor={`${color}.surface`}
          color={`${color}.contrast`}
          radius={1}
        >
          surface
        </ColorBox>
        <ColorBox
          bgcolor={`${color}.subtle`}
          color={`${color}.contrast`}
          radius={1}
        >
          subtle
        </ColorBox>
        <ColorBox
          bgcolor={`${color}.ghost`}
          color={`${color}.contrast`}
          radius={1}
        >
          Ghost
        </ColorBox>
        <ColorBox
          bgcolor={`${color}.contrast`}
          color={`${color}.base`}
          radius={1}
        >
          Contrast
        </ColorBox>
        <ColorBox
          bgcolor={`${color}.muted`}
          color={`${color}.contrast`}
          radius={1}
        >
          muted
        </ColorBox>
        <ColorBox
          bgcolor={`${color}.divider`}
          color={`${color}.contrast`}
          radius={1}
        >
          Divider
        </ColorBox>
      </Tag>
    </Tag>
  );
};

const App = () => {
  const { ref, inView } = useInView({
    threshold: 1,
    // margin: -15
  });
  const [toggled, setToggled] = React.useState(true);
  const [text, setText] = React.useState("Click");
  const [theme, setTheme] = React.useState<ThemeOptionInput>({
    mode: "dark",
  });
  const [count, setCount] = React.useState(0);
  let color = theme.mode === "dark" ? "#0F1115" : "#FFFFFF";
  const colors = colorScale("oklch(64.5% 0.246 16.439)", "oklch");
  const palettes = [
    colorScale("oklch(63.7% 0.237 25.331)", "oklch"),
    colorScale("oklch(70.5% 0.213 47.604)", "oklch"),
    colorScale("oklch(76.9% 0.188 70.08)", "oklch"),
    colorScale("oklch(79.5% 0.184 86.047)", "oklch"),
    colorScale("oklch(76.8% 0.233 130.85)", "oklch"),
    colorScale("oklch(72.3% 0.219 149.579)", "oklch"),
    colorScale("oklch(69.6% 0.17 162.48)", "oklch"),
    colorScale("oklch(70.4% 0.14 182.503)", "oklch"),
    colorScale("oklch(71.5% 0.143 215.221)", "oklch"),
    colorScale("oklch(68.5% 0.169 237.323)", "oklch"),
    colorScale("oklch(62.3% 0.214 259.815)", "oklch"),
    colorScale("oklch(58.5% 0.233 277.117)", "oklch"),
    colorScale("oklch(60.6% 0.25 292.717)", "oklch"),
    colorScale("oklch(62.7% 0.265 303.9)", "oklch"),
    colorScale("oklch(66.7% 0.295 322.15)", "oklch"),
    colorScale("oklch(64.5% 0.246 16.439)", "oklch"),
    colorScale("oklch(55.4% 0.046 257.417)", "oklch"),
    colorScale("oklch(55.1% 0.027 264.364)", "oklch"),
    colorScale("oklch(55.2% 0.016 285.938)", "oklch"),
    colorScale("oklch(55.6% 0 0)", "oklch"),
    colorScale("oklch(55.3% 0.013 58.071)", "oklch"),
    colorScale("oklch(54.7% 0.021 43.1)", "oklch"),
    colorScale("oklch(54.2% 0.034 322.5)", "oklch"),
    colorScale("oklch(56% 0.021 213.5)", "oklch"),
    colorScale("oklch(58% 0.031 107.3)", "oklch"),
  ];

  return (
    <AuthProvider value={{ auth: "naxrul" }}>
      <AppRoot
        theme={theme}
        onThemeUpdate={(t) => {
          setTheme(t);
        }}
        defaultBreakpoint="xl"
        fontFamily="inter,sans-serif"
        bgcolor={palettes[17][950]}
      >
        <Tag width={800} flexBox flexColumn gap={1} p={3}>
          {palettes.map((p, idx) => {
            return (
              <Tag key={idx} flexBox flexRow gap={2}>
                {Object.values(p).map((c) => {
                  return (
                    <Tag
                      key={c}
                      radius={1}
                      width={50}
                      height={50}
                      bgcolor={c}
                      border={"1px solid "}
                      borderColor={p[800]}
                    />
                  );
                })}
              </Tag>
            );
          })}
        </Tag>

        <Tag width={100} height={100} overflow={"auto"} color="default.muted">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab velit
          dolorum atque ipsum, deleniti, architecto dolorem voluptatem,
          provident laboriosam est necessitatibus consequatur explicabo harum
          distinctio tempora aliquam quaerat placeat. Deleniti!
        </Tag>

        <Tag p={3} width={300}>
          <Tag overflow="auto" color={"default.contrast"} fontSize="h2">
            This is main title text
          </Tag>
          <Tag overflow="auto" color={"default.muted"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sequi
            numquam illo expedita accusamus dolores. Recusandae ab dignissimos
            quod. Minus suscipit quis natus neque voluptate assumenda provident
            dicta officiis animi!
          </Tag>
        </Tag>
        <RND />
        <Tag flexBox flexRow flexWraped p={1} gap={1}>
          <Button variant="text" color="default" disabled>
            disabled
          </Button>
          <Button variant="text" color="default">
            default
          </Button>
          <Button variant="text" color="primary">
            primary
          </Button>
          <Button variant="text" color="accent">
            accent
          </Button>
          <Button variant="text" color="success">
            success
          </Button>
          <Button variant="text" color="info">
            info
          </Button>
          <Button variant="text" color="warning">
            warning
          </Button>
          <Button variant="text" color="danger">
            danger
          </Button>
        </Tag>
        <Tag flexBox flexRow flexWraped p={1} gap={1}>
          <Button variant="outline" color="default" disabled>
            disabled
          </Button>
          <Button variant="outline" color="default">
            default
          </Button>
          <Button variant="outline" color="primary">
            primary
          </Button>
          <Button variant="outline" color="accent">
            accent
          </Button>
          <Button variant="outline" color="success">
            success
          </Button>
          <Button variant="outline" color="info">
            info
          </Button>
          <Button variant="outline" color="warning">
            warning
          </Button>
          <Button variant="outline" color="danger">
            danger
          </Button>
        </Tag>
        <Tag flexBox flexRow flexWraped p={1} gap={1}>
          <Button variant="fill" color="default" disabled>
            disabled
          </Button>
          <Button variant="fill" color="default">
            default
          </Button>
          <Button variant="fill" color="primary">
            primary
          </Button>
          <Button variant="fill" color="accent">
            accent
          </Button>
          <Button variant="fill" color="success">
            success
          </Button>
          <Button variant="fill" color="info">
            info
          </Button>
          <Button variant="fill" color="warning">
            warning
          </Button>
          <Button variant="fill" color="danger">
            danger
          </Button>
        </Tag>
        <Tag flexBox flexRow flexWraped p={1} gap={1}>
          <Button variant="ghost" color="default" disabled>
            disabled
          </Button>
          <Button variant="ghost" color="default">
            default
          </Button>
          <Button variant="ghost" color="primary">
            primary
          </Button>
          <Button variant="ghost" color="accent">
            accent
          </Button>
          <Button variant="ghost" color="success">
            success
          </Button>
          <Button variant="ghost" color="info">
            info
          </Button>
          <Button variant="ghost" color="warning">
            warning
          </Button>
          <Button variant="ghost" color="danger">
            danger
          </Button>
        </Tag>
        <Tag flexBox gap={2} flexColumn>
          <ColorPallate color="default" />
          <ColorPallate color="primary" />
          <ColorPallate color="accent" />
          <ColorPallate color="info" />
          <ColorPallate color="success" />
          <ColorPallate color="warning" />
          <ColorPallate color="danger" />
        </Tag>

        <Tag
          theme={{
            colors: {
              default: {
                base: "#3470f2",
              },
            },
          }}
          width={150}
          height={100}
          bgcolor="default"
        >
          <Tag color="default.contrast">Hello</Tag>
        </Tag>

        <AnimateGroup />
        <Animate />
        <Tag height={40} width={"sm"} bgcolor="red">
          SM
        </Tag>
        <Tag height={40} width={"md"} bgcolor="green">
          MD
        </Tag>
        <Tag height={40} width={"lg"} bgcolor="yellow">
          LG
        </Tag>
        <Tag height={40} width={"xl"} bgcolor="blue">
          XL
        </Tag>

        <Tag ref={ref} height={100} bgcolor="red">
          <Transition open={inView} variant={"zoom"}>
            <Tag width={100} height={100} bgcolor="orange" />
          </Transition>
        </Tag>

        <Trans />

        {/* <Trans /> */}
        {/* 
      <Input
        type={text}
        icon={<button
          onClick={() => {
            setText(text === "Click" ? "Clicked" : "Click")
          }}
        >
          {text}
        </button>}
      />
      
      <Tag
        mt={20}
        flexBox
        gap={2}
        p={1}
        bgcolor="background.secondary"
        spacing={4}
        sx={{
        }}
      >
        <Button color="default" >Filled</Button>
        <Button color="default" variant="outline">Outlined</Button>
        <Button color="default" variant="text">Text</Button>
        <Button color="default" variant="soft">Soft</Button>
      </Tag>

      <Tag
        flexBox
        p={1}
      >
        <Button color="brand" >Filled</Button>
        <Button color="brand" variant="outline">Outlined</Button>
        <Button color="brand" variant="text">Text</Button>
        <Button color="brand" variant="soft">Soft</Button>
      </Tag>
      <Tag
        height={200}
        radius={2}
      >
        <Tag
          overflow="auto"
          borderRight={1}
          borderLeft={1}
          border="1px solid"
          borderStyle='dashed'
          p={1}
          fontWeight={700}
        >
          University of Anything
        </Tag>
        
      </Tag>
      <button onClick={() => setToggled(!toggled)}>Toggle ThemeBox</button>
      {toggled && <ThemeBox />}
      <Tag
        flexBox
        flexRow
        flexWrap="wrap"
        gap={1}
        p={2}
      >
        {
          Array.from({ length: 1 }).map((_, i) => (
            <Tag
              key={i}
              hover={{
                background: 'green'
              }}
              id="asdasd"
              width={100}
              height={100}
              background='red'
              radius={2}
              baseClass='hello'
              className='world'
              classNames={['world2']}
              onClick={() => {
                alert('asd')
              }}
            >Tagas</Tag>
          ))
        }
      </Tag> */}
      </AppRoot>
    </AuthProvider>
  );
};
const rootEle = document.getElementById("root");

if (rootEle) {
  const root = createRoot(rootEle);
  root.render(<App />);
}
