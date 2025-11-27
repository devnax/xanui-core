import React, { use } from 'react';
import { createRoot } from 'react-dom/client';
import { createThemeSwitcher, ThemeProvider, useTheme } from './src/theme'
import { Tag, Transition, useBreakpoint } from './src';

const useThemeSwitcher = createThemeSwitcher("light")

const ThemeBox = () => {
  const themeSwitcher = useThemeSwitcher()
  const bp = useBreakpoint()
  console.log(bp.isDown("md"));

  return (
    <button
      onClick={() => {
        themeSwitcher.change(themeSwitcher.name === 'light' ? "dark" : "light")
      }}
    >
      change
    </button>
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
  return (
    <ThemeProvider component='body' isRootProvider theme={themeSwitcher.name}>
      <ThemeBox />
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
    </ThemeProvider>
  );
}
const rootEle = document.getElementById('root')

if (rootEle) {

  const root = createRoot(rootEle);
  root.render(<App />);
}
