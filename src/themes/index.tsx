import * as React from 'react'
import {createTheme, StyledEngineProvider, ThemeProvider} from '@mui/material/styles'
import {purple} from '@mui/material/colors'

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Helvetica, sans-serif',
  },
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#009ef7',
      dark: '#0095e8',
      contrastText: '#fff',
    },
    // secondary: {
    //   // This is green.A700 as hex.
    // },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
        disableFocusRipple: true,
      },
    },
  },
})

type Props = {
  children: React.ReactNode
}

const ThemeCustomProvider = ({children}: Props) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  )
}

export default ThemeCustomProvider
