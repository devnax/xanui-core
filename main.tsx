import React, { createContext, use, useContext, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createThemeSwitcher, ThemeProvider, useTheme } from './src/theme'
import { Tag, TagComponentType, TagProps, Transition, useAppRootElement, useBreakpoint, useBreakpointProps, useColorTemplate, useInterface } from './src';
import AppRoot from './src/AppRoot';
import usePortal from './src/hooks/usePortal';
import { Renderar } from './src/AppRoot/Renderar';
import Iframe from './src/Iframe'

export type GridContainerProps<T extends TagComponentType = "div"> = TagProps<T>
const GridContainer = React.forwardRef(<T extends TagComponentType = "div">({ children, ...rest }: GridContainerProps<T>, ref?: React.Ref<any>) => {
  return (
    <Tag
      {...rest}
      sxr={{
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        // marginLeft: `-${spacing}px`,
        // marginTop: `-${spacing}px`,
        // "& > div": {
        //   paddingLeft: `${spacing}px`,
        //   paddingTop: `${spacing}px`,
        //   boxSizing: "border-box",
        // }
      }}
      baseClass='grid-container'
      ref={ref}
    >
      {children}
    </Tag>
  )
})


export type GridItemProps<T extends TagComponentType = "div"> = TagProps<T> & {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

const GridItem = React.forwardRef(<T extends TagComponentType = "div">({ children, xs, sm, md, lg, xl, ...rest }: GridItemProps<T>, ref?: React.Ref<any>) => {

  let w: any = {}

  xs && (w.xs = (100 / 12 * xs) + "%")
  sm && (w.sm = (100 / 12 * sm) + "%")
  md && (w.md = (100 / 12 * md) + "%")
  lg && (w.lg = (100 / 12 * lg) + "%")
  xl && (w.xl = (100 / 12 * xl) + "%")

  return (
    <Tag
      ref={ref}
      {...rest}
      maxWidth={w}
      flexBasis={w}
      flexGrow={0}
      baseClass="grid-item"

    >
      {children}
    </Tag>
  )
})

const useThemeSwitcher = createThemeSwitcher("light")

const ThemeBox = () => {
  const themeSwitcher = useThemeSwitcher()
  const bp = useBreakpoint()
  const [count, setCount] = React.useState(0);

  const portal = usePortal(
    <Tag
      position="fixed"
      bottom={10}
      right={10}
      p={2}
      bgcolor="rgba(0,0,0,.5)"
      color="#fff"
      radius={2}
    >
      This is portal content {count}
    </Tag>
    , { autoMount: false })


  const C = (props: any) => (
    <Tag
      p={2}
      bgcolor="blue"
      color="#fff"
      radius={2}
      {...props}
    >
      Rendered Component
    </Tag>
  )

  return (
    <div>
      <button
        onClick={() => {
          const r = Renderar.render(C, {
            bgcolor: 'red',
          })

          setTimeout(() => {
            r.updateProps({ bgcolor: 'green' })
          }, 1000);
        }}
      >Render</button>
      <button onClick={() => setCount(count + 1)}>Increase Count {count}</button>
      <button onClick={() => portal.isMount() ? portal.unmount() : portal.mount()}>Mount Portal</button>
      <button
        onClick={() => {
          themeSwitcher.change(themeSwitcher.name === 'light' ? "dark" : "light")
        }}
      >
        change
      </button>
    </div>
  )
}

const TransBox = ({ open }: any) => {
  const [closed, setClosed] = useState(false)
  useEffect(() => {
    if (closed && open) {
      setClosed(false)
    }
  }, [open])
  if (closed) return null
  return (
    <Transition open={open} variant="zoom" onClosed={() => setClosed(true)} >
      <Tag
        component="div"
        width={300}
        bgcolor="green"
        radius={1}
        p={2}
        overflow={"hidden"}
        height={300}
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
  const [v, setV] = React.useState<any>('zoom')
  const [open, setOpen] = React.useState(true)

  useEffect(() => {
    setInterval(() => {
      // setOpen(i => !i)
    }, 1000)
  }, [])
  return (
    <Tag height={400}>
      <button onClick={() => setOpen(!open)}>Click</button>
      <button onClick={() => setV(v === 'fadeLeft' ? "zoom" : "fadeLeft")}>change</button>
      {/* <Transition open={open} variant={"fade"} > */}
      <TransBox open={open} />
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
  const portal = usePortal(<>Hello</>)

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



const App = () => {
  const themeSwitcher = useThemeSwitcher()
  const [toggled, setToggled] = React.useState(true)
  const ref = useRef<any>(null)
  const [text, setText] = React.useState("Click")
  const [count, setCount] = React.useState(0)

  return (
    <AppRoot theme={themeSwitcher.name} fontFamily="inter,sans-serif" bgcolor="divider.soft.primary">
      <Input />

      {/* <button
        onClick={() => {
          Renderar.render(() => <Iframe>
            <Tag
              color="red"
              radius={1}
              m={2}
            >
              Hello
            </Tag>
          </Iframe>)
        }}
      >render</button> */}


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
      <GridContainer mb={2} spacing={1}>
        <GridItem xs={12} sm={6} md={4} lg={3} >
          <Tag
            ref={ref}
            p={2}
            bgcolor="background.primary"
            border="1px solid"
            borderColor="divider.primary"
            radius={2}
          >
            <div>Grid Item 1</div>
          </Tag>
        </GridItem>
        <GridItem xs={12} sm={6} md={4} lg={3} >
          <Tag
            p={2}
            bgcolor="background.primary"
            border="1px solid"
            borderColor="divider.primary"
            radius={2}
          >
            Grid Item 2
          </Tag>
        </GridItem>
        <GridItem xs={12} sm={6} md={4} lg={3} >
          <Tag
            p={2}
            bgcolor="background.primary"
            border="1px solid"
            borderColor="divider.primary"
            radius={2}
          >
            Grid Item 3
          </Tag>
        </GridItem>
        <GridItem xs={12} sm={6} md={4} lg={3} >
          <Tag
            p={2}
            bgcolor="background.primary"
            border="1px solid"
            borderColor="divider.primary"
            radius={2}
          >
            Grid Item 4
          </Tag>
        </GridItem>
      </GridContainer>
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
  );
}
const rootEle = document.getElementById('root')

if (rootEle) {

  const root = createRoot(rootEle);
  root.render(<App />);
}
