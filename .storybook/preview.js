import { addDecorator } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../src/theme'

const CUSTOM_VIEWPORTS = {
  s: {
    name: 'S / Mobile (360x640)',
    styles: {
      width: '360px',
      height: '640px',
    },
  },
  m: {
    name: 'M / Mobile (576x800)',
    styles: {
      width: '576px',
      height: '800px',
    },
  },
  l: {
    name: 'L / Tablet (768x1024)',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  xl: {
    name: 'XL / Tablet & Small Desktop (1024x768)',
    styles: {
      width: '1024px',
      height: '768px',
    },
  },
  xxl: {
    name: 'XXL / Tablet & Small Desktop (1440x900)',
    styles: {
      width: '1440px',
      height: '900px',
    },
  },
}

addParameters({
  options: {
    theme: {
      base: 'light',
      brandTitle: 'HomeX',
    },
  },
  viewport: {
    viewports: CUSTOM_VIEWPORTS,
  },
})

addDecorator((story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)
