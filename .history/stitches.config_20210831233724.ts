import { createCss, StitchesCss } from '@stitches/react';
export type { StitchesVariants } from '@stitches/react';

const stitches = createCss({
  theme: {
    colors: {
      gray100: 'hsl(0 0% 98.8%)',
      gray200: 'hsl(0 0% 97.5%)',
      gray300: 'hsl(206,6%,44%)',
      gray400: 'hsl(205,5%,53%)',
      violet100: 'hsl(250,34%,16%)',
      violet200: 'hsl(251, 45%, 31%)',
      violet300: 'hsl(252, 58%, 50%)',
      violet400: 'hsl(250,100%,76%)',
      violet500: 'hsl(250,34%,16%)',
      violet200: 'hsl(251, 45%, 31%)',
      violet300: 'hsl(252, 58%, 50%)',
      violet400: 'hsl(250,100%,76%)',
      violet1000: 'hsl(250 55% 28.0%)',
      gray1000: 'hsl(0 0% 7%)',
      quartz100: 'hsl(252 17% 98.8%)',
      quartz1000: 'hsl(252 10% 7%)',
      slate100: 'hsl(206 20% 98.8%)',
      slate200: 'hsl(206 20% 95.6%)',
      slate300: 'hsl(206 20% 93.1%)',
      slate900: 'hsl(206 20% 10%)',
      slate1000: 'hsl(206 12% 7%)',
      red100: 'hsl(351 100% 98.5%)',
      red1000: 'hsl(356 80% 27.1%)',
      crimson100: 'hsl(332 100% 98.5%)',
      crimson500: 'hsl(334,90%,50%)',
      crimson1000: 'hsl(336 79% 26.1%)',
      pink100: 'hsl(322 100% 98.5%)',
      pink1000: 'hsl(322 80% 23.9%)',
      purple100: 'hsl(280 100% 99.0%)',
      purple1000: 'hsl(272 62% 24.1%)',
      indigo100: 'hsl(226 100% 99.0%)',
      indigo1000: 'hsl(226 70% 24.1%)',
      blue100: 'hsl(206 100% 98.8%)',
      blue1000: 'hsl(211 73% 12%)',
      cyan100: 'hsl(185 78% 97.8%)',
      cyan1000: 'hsl(190 63% 8.0%)',
      teal100: 'hsl(165 100% 97.5%)',
      teal1000: 'hsl(174 70% 7%)',
      green100: 'hsl(130 100% 97.5%)',
      green1000: 'hsl(148 69% 10.0%)',
      brown100: 'hsl(30 75% 98.0%)',
      brown1000: 'hsl(20 50% 17.1%)',
      bronze100: 'hsl(18 100% 98.5%)',
      bronze200: 'hsl(18 57% 94.1%)',
      bronze900: 'hsl(15 30% 43.1%)',
      bronze1000: 'hsl(15 30% 23.1%)',
     
     

      // Semantic colors
      hiContrast: '$slate12',
      loContrast: '$quartz100',
      canvas: 'rgba(240,220,200,1.0)',
      panel: 'rgba(220,210,185,1.0)',
      transparentPanel: 'hsl(0 100% 100% / 97%)',
      shadowLight: 'hsl(206 22% 7% / 35%)',
      shadowDark: 'hsl(206 22% 7% / 20%)',
      accent: 'rgba(67,43,61,1.0)',
      accent2: 'rgba(50,255,150,1.0)',
      neutral: 'rgba(144,0,240,1.0)',
      accentContrast: 'rgba(220,210,185,1.0)',
      accentSecondary: 'rgba(100,0,0,1.0)',
      accentSecondaryContrast: 'rgba(255,255,255,1.0)',
    },
    fonts: {
      untitled: 'Untitled Sans, -apple-system, system-ui, sans-serif',
      mono: 'Söhne Mono, menlo, monospace',
    },
    space: {
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '25px',
      6: '35px',
      7: '45px',
      8: '65px',
      9: '80px',
    },
    sizes: {
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '25px',
      6: '35px',
      7: '45px',
      8: '65px',
      9: '80px',
    },
    fontSizes: {
      1: '12px',
      2: '13px',
      3: '15px',
      4: '17px',
      5: '19px',
      6: '21px',
      7: '27px',
      8: '35px',
      9: '59px',
    },
    radii: {
      1: '3px',
      2: '5px',
      3: '7px',
      round: '50%',
      pill: '9999px',
    },
    zIndices: {
      1: '100',
      2: '200',
      3: '300',
      4: '400',
      max: '999',
    },
  },
  media: {
    bp1: '(min-width: 520px)',
    bp2: '(min-width: 900px)',
    bp3: '(min-width: 1200px)',
    bp4: '(min-width: 1800px)',
    motion: '(prefers-reduced-motion)',
    hover: '(any-hover: hover)',
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)',
  },
  utils: {
    p: (config) => (value: any) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value,
    }),
    pt: (config) => (value: any) => ({
      paddingTop: value,
    }),
    pr: (config) => (value: any) => ({
      paddingRight: value,
    }),
    pb: (config) => (value: any) => ({
      paddingBottom: value,
    }),
    pl: (config) => (value: any) => ({
      paddingLeft: value,
    }),
    px: (config) => (value: any) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (config) => (value: any) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    m: (config) => (value: any) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    mt: (config) => (value: any) => ({
      marginTop: value,
    }),
    mr: (config) => (value: any) => ({
      marginRight: value,
    }),
    mb: (config) => (value: any) => ({
      marginBottom: value,
    }),
    ml: (config) => (value: any) => ({
      marginLeft: value,
    }),
    mx: (config) => (value: any) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (config) => (value: any) => ({
      marginTop: value,
      marginBottom: value,
    }),

    ta: (config) => (value: any) => ({ textAlign: value }),

    fd: (config) => (value: any) => ({ flexDirection: value }),
    fw: (config) => (value: any) => ({ flexWrap: value }),

    ai: (config) => (value: any) => ({ alignItems: value }),
    ac: (config) => (value: any) => ({ alignContent: value }),
    jc: (config) => (value: any) => ({ justifyContent: value }),
    as: (config) => (value: any) => ({ alignSelf: value }),
    fg: (config) => (value: any) => ({ flexGrow: value }),
    fs: (config) => (value: any) => ({ flexShrink: value }),
    fb: (config) => (value: any) => ({ flexBasis: value }),

    bc: (config) => (value: any) => ({
      backgroundColor: value,
    }),

    br: (config) => (value: any) => ({
      borderRadius: value,
    }),
    btrr: (config) => (value: any) => ({
      borderTopRightRadius: value,
    }),
    bbrr: (config) => (value: any) => ({
      borderBottomRightRadius: value,
    }),
    bblr: (config) => (value: any) => ({
      borderBottomLeftRadius: value,
    }),
    btlr: (config) => (value: any) => ({
      borderTopLeftRadius: value,
    }),

    bs: (config) => (value: any) => ({ boxShadow: value }),

    lh: (config) => (value: any) => ({ lineHeight: value }),

    ox: (config) => (value: any) => ({ overflowX: value }),
    oy: (config) => (value: any) => ({ overflowY: value }),

    pe: (config) => (value: any) => ({ pointerEvents: value }),
    us: (config) => (value: any) => ({ WebkitUserSelect: value, userSelect: value }),

    size: (config) => (value: any) => ({
      width: value,
      height: value,
    }),

    linearGradient: (config) => (value: any) => ({
      backgroundImage: `linear-gradient(${value})`,
    }),

    appearance: (config) => (value) => ({
      WebkitAppearance: value,
      appearance: value,
    }),
    userSelect: (config) => (value) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),
    backgroundClip: (config) => (value) => ({
      WebkitBackgroundClip: value,
      backgroundClip: value,
    }),
  },
});

export type CSS = StitchesCss<typeof stitches>;
export const { styled, css, theme, getCssString, global, keyframes, config } = stitches;
export const utils = config.utils;

export const darkTheme = theme('dark-theme', {
    colors: {
        gray100: 'hsl(201,6%,12%)',
        gray200: 'hsl(203,6%,25%)',
        gray300: 'hsl(206,6%,44%)',
        gray400: 'hsl(205,5%,53%)',
        violet100: 'hsl(250,34%,16%)',
        violet200: 'hsl(251, 45%, 31%)',
        violet300: 'hsl(252, 58%, 50%)',
        violet400: 'hsl(250,100%,76%)',
        green100: 'rgba(50,255,150,0.6)',
        green200: 'rgba(100,255,280,1.0)',
        whaite: 'rgba(255,255,255,1.0)',

        background: '$gray100',
        line: '$gray200',
        text: '$gray400',
        accent: '$violet300',
        accent2: '$violet400',
        primary: '$green100',
        accentContrast: '$whaite'
    }
}); 
// 
// export const darkTheme = theme('dark-theme', {
//   colors: {
    // gray100: 'hsl(0 0% 9.6%)',
    // gray1000: 'hsl(0 0% 93%)',
    // quartz100: 'hsl(252 2% 10%)',
    // quartz1000: 'hsl(252 2% 93%)',
    // slate100: 'hsl(200 6% 9.6%)',
    // slate200: 'hsl(201 6% 11.6%)',
    // slate300: 'hsl(203 6% 13.8%)',
    // slate900: 'hsl(205 5% 52.9%)',
    // slate1000: 'hsl(210 3% 93%)',
    // red100: 'hsl(353 35% 10.2%)',
    // red1000: 'hsl(358 100% 88.0%)',
    // crimson100: 'hsl(335 33% 10.0%)',
    // crimson500: 'hsl(37,67%,45.0%)',
    // crimson1000: 'hsl(341 90% 83.1%)',
    // pink100: 'hsl(318 33% 10.0%)',
    // pink1000: 'hsl(325 90% 87.1%)',
    // purple100: 'hsl(284 28% 10.4%)',
    // purple1000: 'hsl(275 91% 91.0%)',
    // violet100: 'hsl(250 30% 11.8%)',
    // violet1000: 'hsl(250 100% 96.1%)',
    // indigo100: 'hsl(229 37% 11.8%)',
    // indigo1000: 'hsl(228 100% 92.9%)',
    // blue100: 'hsl(212 50% 10.2%)',
    // blue1000: 'hsl(210 100% 86.1%)',
    // teal100: 'hsl(168 76% 6.5%)',
    // teal1000: 'hsl(174 90% 60.0%)',
    // green100: 'hsl(140 43% 8.2%)',
    // green1000: 'hsl(130 50% 75.1%)',
    // brown100: 'hsl(22 40% 9.2%)',
    // brown1000: 'hsl(28 60% 75.9%)',
    // bronze100: 'hsl(17 14% 10.0%)',
    // bronze200: 'hsl(17 15% 13.4%)',
    // bronze900: 'hsl(18 37% 61.0%)',
    // bronze1000: 'hsl(18 37% 81.0%)',
// 
    // Semantic colors
    // hiContrast: '$teal1000',
    // loContrast: '$slate1',
    // canvas: 'rgba(29,40,61,1.0)',
    // panel: 'rgba(39,50,69,1.0)',
    // transparentPanel: 'hsl(0 100% 100% / 97%)',
    // shadowLight: 'hsl(206 22% 7% / 35%)',
    // shadowDark: 'hsl(206 22% 7% / 20%)',
    // accent: 'rgba(144,0,240,1.0)',
    // accent2: 'rgba(250,61,0,1.0)',
    // neutral: 'rgba(67,43,61,1.0)',
    // accentContrast: 'rgba(220,210,185,1.0)',
    // accentSecondary: 'rgba(50,255,150,0.6)',
    // accentSecondaryContrast: 'rgba(255,255,255,1.0)',
//   },
// });