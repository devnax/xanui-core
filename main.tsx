import React, { use } from 'react';
import { createRoot } from 'react-dom/client';
import { createThemeSwitcher, ThemeProvider, useTheme } from './src/theme'
import { Tag, Transition, useBreakpoint, useColorTemplate } from './src';
import AppRoot from './src/AppRoot';
import usePortal from './src/hooks/usePortal';
import { Renderar } from './src/AppRoot/Renderar';

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

const Trans = () => {
  const theme = useTheme()
  const [v, setV] = React.useState<any>('zoom')
  const [open, setOpen] = React.useState(true)
  return (
    <Tag>
      <button onClick={() => setOpen(!open)}>Click</button>
      <button onClick={() => setV(v === 'zoom' ? { from: {}, to: { transform: "scale(.5)" } } : "zoom")}>change</button>
      <Transition open={open} variant="fade" >
        <Tag
          component="div"
          width={300}
          bgcolor="green"
          radius={2}
          p={2}
        >
          <Transition open={open} variant={v}  >
            <Tag
              component="div"
              bgcolor="background.primary"
              radius={2}
              px={2}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Tag>
          </Transition>
        </Tag>
      </Transition>
    </Tag>
  )
}


const Button = ({ children, color, variant, ...rest }: any) => {
  const t = useColorTemplate(color || 'brand', variant || 'fill')
  return (
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
  )
}

const App = () => {
  const themeSwitcher = useThemeSwitcher()
  const [toggled, setToggled] = React.useState(true)

  return (
    <AppRoot theme={themeSwitcher.name} fontFamily="inter,sans-serif" p={2}>

      <Tag
        flexBox
        spacing={2}
        p={1}
        bgcolor="background.secondary"
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
        spacing={2}
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
          border={1}
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
        <Trans />
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
      </Tag>
    </AppRoot>
  );
}
const rootEle = document.getElementById('root')

if (rootEle) {

  const root = createRoot(rootEle);
  root.render(<App />);
}
