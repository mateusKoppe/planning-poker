import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  interface DefaultTheme {
    colors: {
      main: string,
      pokerGreen: string,
      pokerGreenDark: string,
      pokerBorderDark: string,
      pokerBorderLight: string,
      pokerBackground: string,
    },
    fonts: {
      family: string,
      size: string
    }
  }
}

const theme: DefaultTheme  = {
  colors: {
    main: "#17A65A",
    pokerGreen: "#009345",
    pokerGreenDark: "#007538",
    pokerBorderDark: "#9d6027",
    pokerBorderLight: "#eda55d",
    pokerBackground: "#37464d"
  },
  fonts: {
    family: '"Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    size: '1.8rem'
  }
};

export default theme;
