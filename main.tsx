import React, { createContext, use, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider, useTheme } from './src/theme'
import { css, Easing, Tag, TagComponentType, TagProps, ThemeOptionInput, Transition, useAppRootElement, useBreakpoint, useBreakpointProps, useColorTemplate, useInterface } from './src';
import AppRoot from './src/AppRoot';
import useTransition from './src/hooks/useTransition'
import useTransitionGroup from './src/hooks/useTransitionGroup'
import { generateColorRole } from './src/theme/color'
import { createPalette } from './src/theme/oklch'


const AnimateGroup = () => {
  const items = [
    { key: 1, from: { opacity: 0, y: -20 }, to: { opacity: 1, y: 0 } },
    { key: 2, from: { opacity: 0, y: -20 }, to: { opacity: 1, y: 0 } },
    { key: 3, from: { opacity: 0, y: -20 }, to: { opacity: 1, y: 0 } },
  ]

  const { toggle, statuses } = useTransitionGroup({
    items,
    stagger: 100,
    duration: 400,
    onUpdate: (val, key) => {
      const el = document.getElementById(`item-${key}`)
      if (el) {
        el.style.opacity = String(val.opacity)
        el.style.transform = `translateY(${val.y}px)`
      }
    }
  })

  return (
    <div>
      {items.map(item => (
        <div key={item.key} id={`item-${item.key}`} className={`item ${statuses[item.key]}`}>
          Item {item.key}
        </div>
      ))}
      <button
        onClick={() => {
          toggle()
        }}
      >
        Toggle
      </button>
    </div>
  )
}
const Animate = () => {
  const ref = useRef<HTMLElement>(null)

  const animate = useTransition({
    easing: Easing.easeOutBounce,
    // duration: 10000,
    initialStatus: "entered",
    from: () => {
      return { x: 3, scale: 0, opacity: 0 }
    },
    to: { x: 10, scale: 1, opacity: 1 },
    // onEnter: () => console.log("enter"),
    // onEntered: () => console.log("entered"),
    // onExit: () => console.log("exit"),
    // onExited: () => console.log("exited"),

    breakpoints: {
      x: [{
        value: 5,
        callback: () => {
          console.log("5");

        }
      }]
    },

    onUpdate: ({ x, scale, opacity }) => {
      if (!ref.current) return
      ref.current.style.transform = `scale(${scale})`
      ref.current.style.opacity = String(opacity)
    },
  })



  return (
    <Tag m={2} flexBox gap={2} flexColumn>
      <Tag
        ref={ref}
        width={100}
        height={100}
        bgcolor="red"
      />
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
          animate.toggle()
        }}
      >
        Toggle
      </button>
    </Tag>
  )
}

const TransBox = ({ open, trans }: any) => {
  const [closed, setClosed] = useState(false)
  useEffect(() => {
    // if (closed && open) {
    //   setClosed(false)
    // }
  }, [open])
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
        height={{
          xs: 500,
          md: 300,
        }}
      >
        <Tag
          className='test'
          component="div"
          radius={1}
          px={2}
          bgcolor={"background.primary"}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Tag>
      </Tag>
    </Transition>
  )
}

const Trans = () => {
  const theme = useTheme()
  const [v, setV] = React.useState<any>('collapseVertical')
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    setInterval(() => {
      // setOpen(i => !i)
    }, 1000)
  }, [])
  return (
    <Tag height={400}>
      <TransBox open={open} trans={v} />
      <button onClick={() => setOpen(!open)}>Click</button>
      <button onClick={() => setV(v === 'fadeDown' ? "zoom" : "fadeDown")}>change</button>
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
            bgcolor={"background.primary"}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Tag>
        </Transition>
      </Tag> */}
      {/* </Transition> */}
    </Tag >
  )
}

const Button = ({ children, color, variant, ...rest }: any) => {
  const t = useColorTemplate(color || 'brand', variant || 'fill')
  return (
    <Tag>
      <Tag
        component={"button"}
        cursor={"pointer"}
        p={.5}
        px={2}
        radius={1}
        minWidth={100}

        {...t.primary}
        hover={{ ...t.secondary }}
        {...rest}
      >
        {children}
      </Tag>
    </Tag>
  )
}

const Input = (props: any) => {

  const [_p]: any = useInterface("Input", props, {})
  const { icon, ...rest } = useBreakpointProps(_p)

  return (
    <Tag>
      <Tag
        component={"input"}
        p={1}
        px={2}
        radius={1}
        border="1px solid"
        borderColor="divider.primary"
        bgcolor="background.primary"
        color="text.primary"
        {...rest}
      />
      {icon && <Tag
        component={"span"}
      >
        {icon}
      </Tag>}
    </Tag>
  )
}


const ACtx = createContext<any>(null)
const AuthProvider = ({ children, value }: any) => {
  return (
    <ACtx.Provider value={value}>
      {children}
    </ACtx.Provider>
  )
}

const useAuth = () => useContext(ACtx)

const Auth = () => {
  const au = useAuth()
  return (
    <h1>Auth</h1>
  )
}

const RND = () => {
  const bp = useBreakpoint()
  const isup = bp.isUp("md")
  // const theme = useThemeSwitcher()
  const theme = useTheme()
  // console.log(bp.value, "is up md:", isup);

  return (
    <button
      onClick={() => {
        // const rr = Renderar.render(Auth)
        theme.change(theme.name === "default-dark" ? {} : { mode: "dark" })
      }}
    >render</button>
  )
}

// F6F7FB
// 0F1115

// 1D4ED8

const color = generateColorRole("#e9e9e9")
const oklch = createPalette("#15803D")
// console.log(oklch);

/* 
{
    "l": 0.1772746621957225,
    "c": 0.008873007842359403,
    "h": 264.3182845998558
}

{
    "l": 0.48819831191672425,
    "c": 0.21716546013691201,
    "h": 264.3763040937021
}

{
    "l": 0.52729863722093,
    "c": 0.137102541646482,
    "h": 150.0692792709957
}
*/

const App = () => {
  const [toggled, setToggled] = React.useState(true)
  const ref = useRef<any>(null)
  const [text, setText] = React.useState("Click")
  const [theme, setTheme] = React.useState<ThemeOptionInput>({ mode: "dark" })
  const [count, setCount] = React.useState(0)

  return (
    <AuthProvider value={{ auth: "naxrul" }}>
      <AppRoot
        theme={theme}
        onThemeChange={(t) => {
          setTheme(t)
        }}
        defaultBreakpoint='xl'
        fontFamily="inter,sans-serif"
      >
        <RND />

        <Tag
          p={3}
        >
          <Tag
            component={"button"}
            bgcolor={oklch.ghost}
            color={oklch.contrast}
            hover={{
              // bgcolor: oklch.ghost,
              // color: oklch.main
            }}
            transition={"all .3s"}
            border={"1px solid"}
            borderColor={oklch.divider}
            px={4}
            py={1}
            radius={1}
            cursor={"pointer"}

            flexBox
            gap={1}
            flexColumn
          >
            <Tag component={"h2"}>Heading of the year</Tag>
            <Tag height={1} bgcolor={oklch.divider} />
            <Tag color={oklch.muted}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores distinctio corrupti voluptate commodi illum doloribus perferendis quos eum dicta voluptatem nostrum enim fugiat, voluptatibus veniam vel assumenda eaque consequatur quasi.
            </Tag>
          </Tag>
        </Tag>
        <Tag
          theme={{
            colors: {
              background: {
                primary: "#770808",
                secondary: "#ac0b0b",
              }
            }
          }}
          width={100}
          height={100}
          bgcolor="background.secondary"
        />

        <AnimateGroup />
        <Animate />
        <Tag
          height={40}
          width={"sm"}
          bgcolor="red"
        >SM</Tag>
        <Tag
          height={40}
          width={"md"}
          bgcolor="green"
        >MD</Tag>
        <Tag
          height={40}
          width={"lg"}
          bgcolor="yellow"
        >LG</Tag>
        <Tag
          height={40}
          width={"xl"}
          bgcolor="blue"
        >XL</Tag>


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
        <Tag
          overflow="auto"
          p={1}
          width={200}
          height={200}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sequi numquam illo expedita accusamus dolores. Recusandae ab dignissimos quod. Minus suscipit quis natus neque voluptate assumenda provident dicta officiis animi!
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
}
const rootEle = document.getElementById('root')

if (rootEle) {

  const root = createRoot(rootEle);
  root.render(<App />);
}
