import React from 'react';
import { createRoot } from 'react-dom/client';
import { createThemeSwitcher, ThemeProvider, useTheme } from './src/theme'
import { Tag, useTransition } from './src';

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
  const t = useTransition(true, {
    variant: "zoom"
  })
  return (
    <Tag
      className={t.classname}
      height={100}
      width={100}
      bgcolor="red"
      radius={2}
    >
      {theme.name}
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
