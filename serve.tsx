import React from 'react';
import { createRoot } from 'react-dom/client';
import { createThemeSwitcher, ThemeProvider, useTheme } from './src/theme'
import { Tag, Transition } from './src';

const useThemeSwitcher = createThemeSwitcher("light")

const ThemeBox = () => {
  const themeSwitcher = useThemeSwitcher()
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
  const [open, setOpen] = React.useState(true)
  return (
    <Tag>
      <button onClick={() => setOpen(!open)}>Click</button>
      <Transition open={open} variant="fade" >
        <Tag
          component="div"
          width={300}
          bgcolor="green"
          radius={2}
          p={2}
        >
          <Transition open={open} variant="zoom"  >
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
  return (
    <ThemeProvider theme="light" >
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
