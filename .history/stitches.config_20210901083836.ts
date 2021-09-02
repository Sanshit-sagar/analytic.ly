import { createCss, StitchesCss } from '@stitches/react';
export type { StitchesVariants } from '@stitches/react';

const stitches = createCss({
  theme: {
    colors: {
        hiContrast: 'hsl(206,8%,8%)',
        loContrast: 'hsl(206,2%,93%)',
    
        gray100: 'hsl(206,14%,96%)',
        gray200: 'hsl(206,12%,90%)',
        gray300: 'hsl(206,6%,56%)',
        gray400: 'hsl(206,6%,44%)',
        gray500: 'hsl(206,4%,30%)',
        gray600: 'hsl(206,4%,20%)',
        violet100: 'hsl(252,87%,96%)',
        violet200: 'hsl(252, 83%,87%)',
        violet300: 'hsl(252, 62%,54%)',
        violet400: 'hsl(250 55% 48%)',
        green100: 'hsl(150 87% 96%)',
        green200: 'hsl(150,83%,87%)',
        green300: 'hsl(150,62%,54%)',
        green400: 'hsl(150 55% 48%)',
        mauve100: 'hsl(300 20% 99%)',
        mauve200: 'hsl(300 8% 97%)',
        mauve300: 'hsl(294 5% 95%)',
        mauve400: 'hsl(289 4% 93%)',
        mauve500: 'hsl(283 4% 91%)',
        mauve600: 'hsl(278 4% 89%)',
        mauve700: 'hsl(271 3% 86%)',
        mauve800: 'hsl(255 3% 78%)',
        mauve900: 'hsl(252 4% 57%)',
        mauve1000: 'hsl(253 3% 53%)',
        mauve1100: 'hsl(252 4% 44%)',
        mauve1200: 'hsl(260 25% 11%)',
      
        background: '$gray100',
        line: '$gray200',
        text: '$gray400',
        accent: '$violet300',
        accent2: '$violet400',
        primary: '$green100',
        accentContrast: '$mauve100',
        panel: '$gra100',
        canvas: '$mauve100'
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
        hiContrast: 'hsl(206,2%,93%)',
        loContrast: 'hsl(206,8%,8%)',
    
        gray100: 'hsl(206,8%,12%)',
        gray200: 'hsl(206,7%,14%)',
        gray300: 'hsl(206,7%,15%)',
        gray400: 'hsl(206,7%,24%)',
        gray500: 'hsl(206,7%,30%)',
        gray600: 'hsl(206,5%,53%)',
        violet100: 'hsl(250,34%,16%)',
        violet200: 'hsl(251, 45%, 31%)',
        violet300: 'hsl(252, 58%, 50%)',
        violet400: 'hsl(250,100%,76%)',
        green100: 'rgba(50,255,150,0.6)',
        green200: 'rgba(100,255,280,1.0)',
        mauve100: 'hsl(246 6% 9%)',
        mauve200: 'hsl(240 5% 11%)',
        mauve300: 'hsl(241 5% 14%)',
        mauve400: 'hsl(242 4% 16%)',
        mauve500: 'hsl(243 4% 18%)',
        mauve600: 'hsl(244 4% 21%)',
        mauve70: 'hsl(245 4% 25%)',
        mauve8: 'hsl(247 4% 32%)',
        mauve9: 'hsl(252 4% 45%)',
        mauve10: 'hsl(247 3% 50%)',
        mauve11: 'hsl(253 4% 63%)',
        mauve12: 'hsl(256 6% 93%)',






     
        background: '$gray100',
        line: '$gray200',
        text: '$gray400',
        accent: '$violet400',
        accent2: '$violet400',
        primary: '$green100',
        accentContrast: '$mauve100',
        panel: '$mauve600',
        canvas: '$mauve100'
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