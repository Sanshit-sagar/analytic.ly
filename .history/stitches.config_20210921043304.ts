import { createCss, StitchesCss } from '@stitches/react';
export type { StitchesVariants } from '@stitches/react';
  
const stitches = createCss({
  theme: {
    colors: {
        violet100: '#fbfcfd',
        violet200: '#f8f9fa',
        violet300: '#f1f3f5',
        violet400: '#eceef0',
        violet500: '#e6e8eb',
        violet600: '#dfe3e6',
        violet700: '#d7dbdf',
        violet800: '#c1c8cd',
        violet900: '#889096',
        violet1000: '#7e868c',
        violet1100: '#687076',
        violet1200: '#11181c',

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
      
        line: '$mauve300',
        text: '$mauve1200',
        border: '$violet800',
        border1: '$violet900',
        border2: '$violet1000',
        border3: '$violet1100',
        accent: '$violet900',
        accentDulled: '$violet700',
        accentHover: '$violet1000',
        accentPressed: '$violet1100',
        accentFull: '$violet1200',
        accentContrast: '$mauve1200',
        darkestPanel: '$mauve400',
        darkPanel: '$mauve500',
        panel: '$mauve600',
        lightPanel: '$mauve700',
        lightestPanel: '$mauve800',
        canvas: '$mauve100',
        loContrast: `hsl(260,80%,95%)`,
        hiContrast: 'hsl(260,80%,5%)',
        neutral: '$violet100',
        funky: 'rgba(150,150,150,1.0)',
        funkyText: 'rgba(50,50,50,1.0)'
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

export const defaultDark = theme('default-dark', {
    colors: {
        violet100: '#151718',
        violet200: '#1a1d1e',
        violet300: '#202425',
        violet400: '#26292b',
        violet500: '#2b2f31',
        violet600: '#313538',
        violet700: '#3a3f42',
        violet800: '#4c5155',
        violet900: '#697177',
        violet1000: '#787f85',
        violet1100: '#9ba1a6',
        violet1200: '#ecedee',

        mauve100: 'hsl(246 6% 9%)',
        mauve200: 'hsl(240 5% 11%)',
        mauve300: 'hsl(241 5% 14%)',
        mauve400: 'hsl(242 4% 16%)',
        mauve500: 'hsl(243 4% 18%)',
        mauve600: 'hsl(244 4% 21%)',
        mauve700: 'hsl(245 4% 25%)',
        mauve800: 'hsl(247 4% 32%)',
        mauve900: 'hsl(252 4% 45%)',
        mauve1000: 'hsl(247 3% 50%)',
        mauve1100: 'hsl(253 4% 63%)',
        mauve1200: 'hsl(256 6% 93%)',
      
        line: '$mauve300',
        text: '$violet1200',
        border: '$violet400',
        border1: '$violet500',
        border2: '$violet600',
        border3: '$violet700',
        accent: '$violet800',
        accentDulled: '$violet700',
        accentHover: '$violet900',
        accentPressed: '$violet1000',
        accentContrast: '$mauve1200',
        darkestPanel: '$mauve400',
        darkPanel: '$mauve500',
        panel: '$mauve600',
        lightPanel: '$mauve700',
        lightestPanel: '$mauve800',
        canvas: '$mauve600',
        loContrast: `(23,20%,5%)`,
        hiContrast: 'hsl(206,2%,93%)',
        neutral: '$violet100',
        funky: 'rgba(255,155,155,1.0)',
        funkyText: 'rgba(255,255,255,0.8)'
    },    
});

export const theme1Light = theme('theme1-light', {
    colors: {
        violet100: 'hsl(255 65% 99%)',
        violet200: 'hsl(252 100% 99%)',
        violet300: 'hsl(252 96% 97%)',
        violet400: 'hsl(252 91% 95%)',
        violet500: 'hsl(252 85% 93%)',
        violet600: 'hsl(252 77% 89%)',
        violet700: 'hsl(252 71% 83%)',
        violet800: 'hsl(252 68% 76%)',
        violet900: 'hsl(252 56% 57%)',
        violet1000: 'hsl(251 48% 53%)',
        violet1100: 'hsl(250 43% 48%)',
        violet1200: 'hsl(254 60% 18%)',

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

        line: '$mauve300',
        text: '$mauve1200',
        border: '$violet800',
        border1: '$violet900',
        border2: '$violet1000',
        border3: '$violet1100',
        accent: '$violet900',
        accentDulled: '$violet700',
        accentHover: '$violet1000',
        accentPressed: '$violet1100',
        accentFull: '$violet1200',
        accentContrast: '$mauve1200',
        darkestPanel: '$mauve400',
        darkPanel: '$mauve500',
        panel: '$mauve600',
        lightPanel: '$mauve700',
        lightestPanel: '$mauve800',
        canvas: '$mauve600',
        loContrast: `$violet100`,
        hiContrast: '$mauve100',
        neutral: '$violet100',
        funky: 'rgba(255,100,100,1.0)',
        funkyText: 'rgba(250,100,100,1.0)'
    }
}); 


export const theme1Dark = theme('theme1-dark', {
    colors: {
        violet100: 'hsl(250 20% 10%)',
        violet200: 'hsl(255 30% 12%)',
        violet300: 'hsl(253 37% 18%)',
        violet400: 'hsl(252 40% 22%)',
        violet500: 'hsl(252 42% 26%)',
        violet600: 'hsl(251 44% 31%)',
        violet700: 'hsl(250 46% 38%)',
        violet800: 'hsl(250 51% 51%)',
        violet900: 'hsl(252 56% 57%)',
        violet1000: 'hsl(251 63% 63%)',
        violet1100: 'hsl(250 95% 76%)',
        violet1200: 'hsl(252 87% 96%)',
       
        mauve100: 'hsl(246 6% 9%)',
        mauve200: 'hsl(240 5% 11%)',
        mauve300: 'hsl(241 5% 14%)',
        mauve400: 'hsl(242 4% 16%)',
        mauve500: 'hsl(243 4% 18%)',
        mauve600: 'hsl(244 4% 21%)',
        mauve700: 'hsl(245 4% 25%)',
        mauve800: 'hsl(247 4% 32%)',
        mauve900: 'hsl(252 4% 45%)',
        mauve1000: 'hsl(247 3% 50%)',
        mauve1100: 'hsl(253 4% 63%)',
        mauve1200: 'hsl(256 6% 93%)',

        line: '$mauve300',
        text: '$violet1200',
        border: '$violet400',
        border1: '$violet500',
        border2: '$violet600',
        border3: '$violet700',
        accent: '$violet800',
        accentDulled: '$violet700',
        accentHover: '$violet900',
        accentPressed: '$violet1000',
        accentContrast: '$mauve1200',
        darkestPanel: '$mauve400',
        darkPanel: '$mauve500',
        panel: '$mauve600',
        lightPanel: '$mauve700',
        lightestPanel: '$mauve800',
        canvas: '$mauve600',
        loContrast: `hsl(260,80%,10%)`,
        hiContrast: 'hsl(206,2%,93%)',
        neutral: '$violet100',
        funky: 'rgba(0,155,155,1.0)',
        funkyText: 'rgba(0,250,250,1.0)'
    }
}); 

export const theme2Light = theme('theme2-light', {
    colors: {
        violet100: 'hsl(332 100% 99%)',
        violet200: 'hsl(330 100% 98%)',
        violet300: 'hsl(331 86% 96%)',
        violet400: 'hsl(331 78% 94%)',
        violet500: 'hsl(332 72% 91%)',
        violet600: 'hsl(333 67% 86%)',
        violet700: 'hsl(335 64% 80%)',
        violet800: 'hsl(336 62% 73%)',
        violet900: 'hsl(336 80% 58%)',
        violet1000: 'hsl(336 73% 53%)',
        violet1100: 'hsl(336 75% 47%)',
        violet1200: 'hsl(340 65% 14%)',

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

        line: '$mauve300',
        text: '$violet1200',
        border: '$violet400',
        border1: '$violet500',
        border2: '$violet600',
        border3: '$violet700',
        accent: '$violet800',
        accentDulled: '$violet700',
        accentHover: '$violet900',
        accentPressed: '$violet1000',
        accentContrast: '$mauve1200',
        darkestPanel: '$mauve400',
        darkPanel: '$mauve500',
        panel: '$mauve600',
        lightPanel: '$mauve700',
        lightestPanel: '$mauve800',
        canvas: '$mauve600',
        loContrast: '$violet100',
        hiContrast: 'hsl(206,2%,93%)',
        neutral: '$violet100',
        funky: 'rgba(0,0,100,0.75)',
        funkyText: 'rgba(0,0,50,0.75)'
    }
}); 

export const theme2Dark = theme('theme2-dark', {
    colors: {
        violet100: '#1d1418',
        violet200: '#27141c',
        violet300: '#3c1827',
        violet400: '#481a2d',
        violet500: '#541b33',
        violet600: '#641d3b',
        violet700: '#801d45',
        violet800: '#ae1955',
        violet900: '#e93d82',
        violet1000: '#f04f88',
        violet1100: '#f76190',
        violet1200: '#feecf4',

        mauve100: 'hsl(246 6% 9%)',
        mauve200: 'hsl(240 5% 11%)',
        mauve300: 'hsl(241 5% 14%)',
        mauve400: 'hsl(242 4% 16%)',
        mauve500: 'hsl(243 4% 18%)',
        mauve600: 'hsl(244 4% 21%)',
        mauve700: 'hsl(245 4% 25%)',
        mauve800: 'hsl(247 4% 32%)',
        mauve900: 'hsl(252 4% 45%)',
        mauve1000: 'hsl(247 3% 50%)',
        mauve1100: 'hsl(253 4% 63%)',
        mauve1200: 'hsl(256 6% 93%)',

        line: '$mauve300',
        text: '$violet1200',
        border: '$violet400',
        border1: '$violet500',
        border2: '$violet600',
        border3: '$violet700',
        accent: '$violet800',
        accentDulled: '$violet700',
        accentDulled: '$violet500',
        accentHover: '$violet900',
        accentPressed: '$violet1000',
        accentContrast: '$mauve1200',
        darkestPanel: '$mauve400',
        darkPanel: '$mauve500',
        panel: '$mauve600',
        lightPanel: '$mauve700',
        lightestPanel: '$mauve800',
        canvas: '$mauve600',
        loContrast: '$violet100',
        hiContrast: 'hsl(206,2%,93%)',
        neutral: '$violet100',
        funky: 'rgba(150,255,255,1.0)',
        funkyText: 'rgba(200,255,255,1.0)'
    }
}); 

export const theme3Light = theme('theme3-light', {
    colors: {
        violet100: 'hsl(165 60% 99%)',
        violet200: 'hsl(169 65% 97%)',
        violet300: 'hsl(169 60% 94%)',
        violet400: 'hsl(169 53% 90%)',
        violet500: 'hsl(170 47% 85%)',
        violet600: 'hsl(170 43% 78%)',
        violet700: 'hsl(170 40% 68%)',
        violet800: 'hsl(172 42% 53%)',
        violet900: 'hsl(173 80% 36%)',
        violet1000: 'hsl(173 83% 33%)',
        violet1100: 'hsl(174 90% 25%)',
        violet1200: 'hsl(170 50% 13%)',

        mauve100: 'hsl(206 30% 99%)',
        mauve200: 'hsl(210 17% 98%)',
        mauve300: 'hsl(209 13% 95%)',
        mauve400: 'hsl(209 12% 93%)',
        mauve500: 'hsl(208 12% 91%)',
        mauve600: 'hsl(208 11% 89%)',
        mauve700: 'hsl(207 11% 86%)',
        mauve800: 'hsl(205 11% 78%)',
        mauve900: 'hsl(206 6% 56%)',
        mauve1000: 'hsl(206 6% 52%)',
        mauve1100: 'hsl(206 6% 44%)',
        mauve1200: 'hsl(206 24% 9%)',

        line: '$mauve300',
        text: '$violet1200',
        border: '$violet400',
        border1: '$violet500',
        border2: '$violet600',
        border3: '$violet700',
        accent: '$violet800',
        accentDulled: '$violet700',
        accentHover: '$violet900',
        accentPressed: '$violet1000',
        accentContrast: '$mauve1200',
        darkestPanel: '$mauve400',
        darkPanel: '$mauve500',
        panel: '$mauve600',
        lightPanel: '$mauve700',
        lightestPanel: '$mauve800',
        canvas: '$mauve600',
        loContrast: '$violet100',
        hiContrast: 'hsl(206,2%,93%)',
        neutral: '$violet100',
        funky: 'rgba(255,150,0,0.75)',
        funkyText: 'rgba(150,50,0,0.75)'
    }
}); 

export const theme3Dark = theme('theme3-dark', {
    colors: {
        violet100: '#0d1912',
        violet200: '#0c1f17',
        violet300: '#0f291e',
        violet400: '#113123',
        violet500: '#133929',
        violet600: '#164430',
        violet700: '#1b543a',
        violet800: '#236e4a',
        violet900: '#30a46c',
        violet1000: '#3cb179',
        violet1100: '#4cc38a',
        violet1200: '#e5fbeb',

        mauve100: 'hsl(110 6% 9%)', 
        mauve200: 'hsl(105 5% 11%)',
        mauve300: 'hsl(106 5% 14%)',
        mauve400: 'hsl(106 4% 16%)',
        mauve500: 'hsl(107 4% 18%)',
        mauve600: 'hsl(107 4% 21%)',
        mauve700: 'hsl(108 4% 25%)',
        mauve800: 'hsl(110 4% 32%)',
        mauve900: 'hsl(110 4% 45%)',
        mauve1000: 'hsl(111 3% 50%)',
        mauve1100: 'hsl(110 4% 63%)',
        mauve1200: 'hsl(110 6% 93%)',

        line: '$mauve300',
        text: '$violet1200',
        border: '$violet400',
        border1: '$violet500',
        border2: '$violet600',
        border3: '$violet700',
        accent: '$violet800',
        accentDulled: '$violet700',
        accentHover: '$violet900',
        accentPressed: '$violet1000',
        accentContrast: '$mauve1200',
        darkestPanel: '$mauve400',
        darkPanel: '$mauve500',
        panel: '$mauve600',
        lightPanel: '$mauve700',
        lightestPanel: '$mauve800',
        canvas: '$mauve600',
        loContrast: '$violet100',
        hiContrast: 'hsl(206,2%,93%)',
        neutral: '$violet100',
        funky: 'rgba(255,150,0,0.75)',
        funkyText: 'rgba(250,250,0,1.0)'
    }
});

export const theme4Light = theme('theme4-light', {
    colors: {
       violet100: '#fbfdff',
       violet200: '#f5faff',
       violet300: '#edf6ff',
       violet400: '#e1f0ff',
       violet500: '#cee7fe',
       violet600: '#b7d9f8',
       violet700: '#96c7f2',
       violet800: '#5eb0ef',
       violet900: '#0091ff',
       violet1000: '#0081f1',
       violet1100: '#006adc',
       violet1200: '#00254d',

        mauve100: '#fbfcfd',
        mauve200: '#f8f9fa',
        mauve300: '#f1f3f5',
        mauve400: '#eceef0',
        mauve500: '#e6e8eb',
        mauve600: '#dfe3e6',
        mauve700: '#d7dbdf',
        mauve800: '#c1c8cd',
        mauve900: '#889096',
        mauve1000: '#7e868c',
        mauve1100: '#687076',
        mauve1200: '#11181c',

        line: '$mauve300',
        text: '$violet1200',
        border: '$violet400',
        border1: '$violet500',
        border2: '$violet600',
        border3: '$violet700',
        accent: '$violet800',
        accentDulled: '$violet700',
        accentHover: '$violet900',
        accentPressed: '$violet1000',
        accentContrast: '$mauve1200',
        darkestPanel: '$mauve400',
        darkPanel: '$mauve500',
        panel: '$mauve600',
        lightPanel: '$mauve700',
        lightestPanel: '$mauve800',
        canvas: '$mauve600',
        loContrast: '$violet100',
        hiContrast: 'hsl(206,2%,93%)',
        neutral: '$violet100',
        funky: 'rgba(200, 10, 0, 1.0)',
        funkyText: 'rgba(100,0,0,0.75)'
    }
});

export const theme4Dark = theme('theme4-dark', {
    colors: {
        violet100: 'hsl(229 24% 10%)',
        violet200: 'hsl(230 36% 12%)',
        violet300: 'hsl(228 43% 17%)',
        violet400: 'hsl(227 47% 21%)',
        violet500: 'hsl(227 50% 24%)',
        violet600: 'hsl(226 52% 28%)',
        violet700: 'hsl(226 56% 34%)',
        violet800: 'hsl(226 58% 44%)',
        violet900: 'hsl(226 70% 55%)',
        violet1000: 'hsl(227 75% 61%)',
        violet1100: 'hsl(228 100% 75%)',
        violet1200: 'hsl(226 83% 96%)',

        mauve100: 'hsl(200 7% 8%)',
        mauve200: 'hsl(195 7% 11%)',
        mauve300: 'hsl(197 6% 13%)',
        mauve400: 'hsl(198 6% 15%)',
        mauve500: 'hsl(199 6% 17%)',
        mauve600: 'hsl(201 6% 20%)',
        mauve700: 'hsl(203 6% 24%)',
        mauve800: 'hsl(207 5% 31%)',
        mauve900: 'hsl(206 6% 43%)',
        mauve1000: 'hsl(206 5% 49%)',
        mauve1100: 'hsl(206 6% 63%)',
        mauve1200: 'hsl(210 6% 93%)',

        line: '$mauve300',
        text: '$violet1200',
        border: '$violet400',
        border1: '$violet500',
        border2: '$violet600',
        border3: '$violet700',
        accent: '$violet800',
        accentDulled: '$violet700',
        accentHover: '$violet900',
        accentPressed: '$violet1000',
        accentContrast: '$mauve1200',
        darkestPanel: '$mauve400',
        darkPanel: '$mauve500',
        panel: '$mauve600',
        lightPanel: '$mauve700',
        lightestPanel: '$mauve800',
        canvas: '$mauve600',
        loContrast: '$violet100',
        hiContrast: 'hsl(206,2%,93%)',
        neutral: '$violet100',
        funky: 'rgba(253,70,0,1)',
        funkyText: 'rgba(250,150,0,0.75)'
    }
});