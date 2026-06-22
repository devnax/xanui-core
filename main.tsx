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
        px={"lg"}
        radius={"xs"}
        minWidth={100}
        {...t.main}
        hover={{ ...t.hover }}
        {...rest}
        transition={"background .3s"}
      >
        {children}
      </Tag>
    </Tag>
  );
};

const ACtx = createContext<any>(null);
const AuthProvider = ({ children, value }: any) => {
  return <ACtx.Provider value={value}>{children}</ACtx.Provider>;
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

const App = () => {
  const { ref, inView } = useInView({
    threshold: 1,
    // margin: -15
  });
  const [toggled, setToggled] = React.useState(true);
  const [text, setText] = React.useState("Click");
  const [theme, setTheme] = React.useState<ThemeOptionInput>({
    mode: "light",
  });

  return (
    <AuthProvider value={{ auth: "naxrul" }}>
      <AppRoot
        theme={theme}
        onThemeUpdate={(t: any) => {
          setTheme(t);
        }}
        defaultBreakpoint="xl"
        fontFamily="inter,sans-serif"
      >
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
          <Tag
            overflow="auto"
            color={"default.muted"}
            p="md"
            border="1px solid"
            borderColor="default.divider"
          >
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
          <Button variant="text" color="brand">
            brand
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
          <Button variant="outline" color="brand">
            brand
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
          <Button variant="fill" color="brand">
            brand
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
          <Button variant="ghost" color="brand">
            brand
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

        <Tag
          theme={{
            mode: "light",
            colors: {
              default: "#3470f2",
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
