import React, { use } from 'react';
import { createRoot } from 'react-dom/client';
import { createThemeSwitcher, ThemeProvider, useTheme } from './src/theme'
import { Tag, Transition, useBreakpoint } from './src';
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
              width={100}
              bgcolor="red"
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


const App = () => {
  const themeSwitcher = useThemeSwitcher()
  const [toggled, setToggled] = React.useState(true)

  return (
    <AppRoot theme={themeSwitcher.name}>
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
