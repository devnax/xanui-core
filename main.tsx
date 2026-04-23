import React, { createContext, use, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider, useTheme } from './src/theme'
import { css, Easing, Tag, TagComponentType, TagProps, ThemeOptionInput, Transition, useAppRootElement, useBreakpoint, useBreakpointProps, useColorTemplate, useInterface } from './src';
import AppRoot from './src/AppRoot';
import useTransition from './src/hooks/useTransition'
import useTransitionGroup from './src/hooks/useTransitionGroup'


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
      variant={(el: HTMLElement, rect: DOMRect) => {
        return {
          from: { x: 0 },
          to: { x: 100 },
          onUpdate: ({ x }: any) => {
            el.style.transform = `translateX(${x}%)`
          }
        }
      }}
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
          bgcolor={"surface.main"}
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
            bgcolor={"surface.main"}
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
  const t = useColorTemplate(color || 'surface', variant || 'fill')
  return (
    <Tag>
      <Tag
        component={"button"}
        cursor={"pointer"}
        p={.5}
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
        borderColor="surface.divider"
        bgcolor="surface.main"
        color="surface.contrast"
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
  )
}

const ColorPallate = ({ color }: any) => {
  return (
    <Tag flexBox gap={0} flexColumn>
      <Tag textTransform={"capitalize"} fontWeight={"bold"}>{color}</Tag>
      <Tag
        flexBox
        flexRow
        flexWraped
        p={1}
        gap={1}
      >
        <ColorBox
          bgcolor={`${color}.main`}
          border="1px solid"
          borderColor={`${color}.divider`}
          color={`${color}.contrast`}
          hover={{
            bgcolor: `${color}.light`
          }}
          radius={1}
        >Main</ColorBox>
        <ColorBox
          bgcolor={`${color}.dark`}
          color={`${color}.contrast`}
          radius={1}
        >Dark</ColorBox>
        <ColorBox
          bgcolor={`${color}.darker`}
          color={`${color}.contrast`}
          radius={1}
        >Darker</ColorBox>
        <ColorBox
          bgcolor={`${color}.light`}
          color={`${color}.contrast`}
          radius={1}
        >Light</ColorBox>
        <ColorBox
          bgcolor={`${color}.lighter`}
          color={`${color}.contrast`}
          radius={1}
        >Lighter</ColorBox>
        <ColorBox
          bgcolor={`${color}.ghost`}
          color={`${color}.contrast`}
          radius={1}
        >Ghost</ColorBox>
        <ColorBox
          bgcolor={`${color}.contrast`}
          color={`${color}.main`}
          radius={1}
        >Contrast</ColorBox>
        <ColorBox
          bgcolor={`${color}.muted`}
          color={`${color}.contrast`}
          radius={1}
        >muted</ColorBox>
        <ColorBox
          bgcolor={`${color}.divider`}
          color={`${color}.contrast`}
          radius={1}
        >Divider</ColorBox>
      </Tag>
    </Tag>
  )
}


const App = () => {
  const [toggled, setToggled] = React.useState(true)
  const ref = useRef<any>(null)
  const [text, setText] = React.useState("Click")
  const [theme, setTheme] = React.useState<ThemeOptionInput>({
    mode: "dark"
  })
  const [count, setCount] = React.useState(0)
  let color = theme.mode === "dark" ? "#0F1115" : "#FFFFFF"


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
        <Tag
          width={100}
          height={100}
          overflow={"auto"}
          color="surface.muted"
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab velit dolorum atque ipsum, deleniti, architecto dolorem voluptatem, provident laboriosam est necessitatibus consequatur explicabo harum distinctio tempora aliquam quaerat placeat. Deleniti!
        </Tag>

        <Tag
          p={3}
          width={300}
          bgcolor={"info"}
        >
          <Tag
            overflow="auto"
            color={"info.contrast"}
            fontSize="h2"
          >

            This is main title text
          </Tag>
          <Tag
            overflow="auto"
            color={"info.muted"}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sequi numquam illo expedita accusamus dolores. Recusandae ab dignissimos quod. Minus suscipit quis natus neque voluptate assumenda provident dicta officiis animi!
          </Tag>

        </Tag>
        <RND />
        <Tag
          flexBox
          flexRow
          flexWraped
          p={1}
          gap={1}
        >
          <Button variant="text" color="surface" disabled>surface</Button>
          <Button variant="text" color="surface">surface</Button>
          <Button variant="text" color="primary">primary</Button>
          <Button variant="text" color="accent">accent</Button>
          <Button variant="text" color="success">success</Button>
          <Button variant="text" color="info">info</Button>
          <Button variant="text" color="warning">warning</Button>
          <Button variant="text" color="danger">danger</Button>

        </Tag>
        <Tag
          flexBox
          flexRow
          flexWraped
          p={1}
          gap={1}
        >
          <Button variant="outline" color="surface" disabled>surface</Button>
          <Button variant="outline" color="surface">surface</Button>
          <Button variant="outline" color="primary">primary</Button>
          <Button variant="outline" color="accent">accent</Button>
          <Button variant="outline" color="success">success</Button>
          <Button variant="outline" color="info">info</Button>
          <Button variant="outline" color="warning">warning</Button>
          <Button variant="outline" color="danger">danger</Button>

        </Tag>
        <Tag
          flexBox
          flexRow
          flexWraped
          p={1}
          gap={1}
        >
          <Button variant="fill" color="surface" disabled>surface</Button>
          <Button variant="fill" color="surface">surface</Button>
          <Button variant="fill" color="primary">primary</Button>
          <Button variant="fill" color="accent">accent</Button>
          <Button variant="fill" color="success">success</Button>
          <Button variant="fill" color="info">info</Button>
          <Button variant="fill" color="warning">warning</Button>
          <Button variant="fill" color="danger">danger</Button>

        </Tag>
        <Tag
          flexBox
          flexRow
          flexWraped
          p={1}
          gap={1}
        >
          <Button variant="ghost" color="surface" disabled>surface</Button>
          <Button variant="ghost" color="surface">surface</Button>
          <Button variant="ghost" color="primary">primary</Button>
          <Button variant="ghost" color="accent">accent</Button>
          <Button variant="ghost" color="success">success</Button>
          <Button variant="ghost" color="info">info</Button>
          <Button variant="ghost" color="warning">warning</Button>
          <Button variant="ghost" color="danger">danger</Button>

        </Tag>
        <Tag
          flexBox
          gap={2}
          flexColumn
        >
          <ColorPallate color="surface" />
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
              surface: {
                main: "#770808",
              }
            }
          }}
          width={150}
          height={100}
          bgcolor="surface"
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
