import {
  createBaseThemeOptions,
  createUnifiedTheme,
  palettes,
} from '@backstage/theme';


import LatoFont from '../assets/lato-v17-latin-700.woff';
import LatoFont2 from '../assets/lato-v17-latin-700.woff2';
import LatoRegularFont from '../assets/lato-v17-latin-regular.woff';
import LatoRegularFont2 from '../assets/lato-v17-latin-regular.woff2';

function genPageTheme(props: any) {
  return {
    colors: props.colors,
    shape: 'none',
    backgroundImage: 'none',
    fontColor: '#000'
  };
}

const latoFont = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 300,
  src: `
    local('lato'),
    url(${LatoRegularFont}) format('woff'),
    url(${LatoRegularFont2}) format('woff2'),
  `,
};

const latoFont2 = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 700,
  src: `
    local('lato'),
    url(${LatoFont}) format('woff'),
    url(${LatoFont2}) format('woff2'),
  `,
};

export const rancherTheme = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: {
      ...palettes.light,
      ...palettes.light,
      primary: {
        main: '#3D98D3'
      },
      navigation: {
        background: '#fff',
        indicator: '#3D98D3',
        color: '#000',
        selectedColor: '#3D98D3',
        hoverColor: '#fff',
        navItem: {  
          hoverBackground: '#f0f0f0',
        },  
      },      
    }
  }),
  fontFamily: 'Lato',
  defaultPageTheme: 'home',
  pageTheme: {
    home: genPageTheme({ colors: ['#8c4351', '#343b58'] }),
    documentation: genPageTheme({
      colors: ['#8c4351', '#343b58'],
    }),
    tool: genPageTheme({ colors: ['#8c4351', '#343b58'] }),
    service: genPageTheme({
      colors: ['#8c4351', '#343b58'],
    }),
    website: genPageTheme({
      colors: ['#8c4351', '#343b58'],
    }),
    library: genPageTheme({
      colors: ['#8c4351', '#343b58'],
    }),
    other: genPageTheme({ colors: ['#8c4351', '#343b58'] }),
    app: genPageTheme({ colors: ['#8c4351', '#343b58'] }),
    apis: genPageTheme({ colors: ['#8c4351', '#343b58'] }),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': [latoFont, latoFont2],
      },
    },
    BackstageHeader: {
      styleOverrides: {
        header: ({ theme }) => ({
          color: '#000',
          backgroundImage: 'none',
          boxShadow: 'none',
          borderLeft: `2px solid ${theme.palette.primary.main}`,
        })
      }
    },
    // BackstageSidebar: {
    //   styleOverrides: {
    //     drawerOpen: ({ theme }) => ({
    //       // color: 'red'
    //     })
    //   }
    // }
  }
});
