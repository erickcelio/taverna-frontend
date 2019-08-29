import theme from 'styled-theming'

const textColor = theme('mode', {
  light: 'black',
  dark: 'white'
})

const backgroundColor = theme('mode', {
  light: 'white',
  dark: 'black'
})

export default {
  textColor,
  backgroundColor
}
