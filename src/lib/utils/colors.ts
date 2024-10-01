import type { ColorPalette, Color as ColorType, UI, Theme } from '../types';

const ColorPalettes: ColorPalette ={
    stone: {
        primary: {
            light: '#f5f5f5',
            dark: '#333333',
        },
        secondary: {
            light: '#f5f5f5',
            dark: '#333333',
        },
        background: {
            light: '#f5f5f5',
            dark: '#333333',
        },
        text: {
            light: '#333333',
            dark: '#f5f5f5',
        },
        shadow: {
            light: '#333333',
            dark: '#f5f5f5',
        },
        marker: {
            light: '#333333',
            dark: '#f5f5f5',
        },
        link: {
            light: '#333333',
            dark: '#f5f5f5',
        },
    },
    red: {
        primary: {
            light: '#ff0000',
            dark: '#ff0000',
        },
        secondary: {
            light: '#ff0000',
            dark: '#ff0000',
        },
        background: {
            light: '#ff0000',
            dark: '#ff0000',
        },
        text: {
            light: '#ff0000',
            dark: '#ff0000',
        },
        shadow: {
            light: '#ff0000',
            dark: '#ff0000',
        },
        marker: {
            light: '#ff0000',
            dark: '#ff0000',
        },
        link: {
            light: '#ff0000',
            dark: '#ff0000',
        },
    },
    orange: {
        primary: {
            light: '#ffa500',
            dark: '#ffa500',
        },
        secondary: {
            light: '#ffa500',
            dark: '#ffa500',
        },
        background: {
            light: '#ffa500',
            dark: '#ffa500',
        },
        text: {
            light: '#ffa500',
            dark: '#ffa500',
        },
        shadow: {
            light: '#ffa500',
            dark: '#ffa500',
        },
        marker: {
            light: '#ffa500',
            dark: '#ffa500',
        },
        link: {
            light: '#ffa500',
            dark: '#ffa500',
        },
    },
    amber: {
        primary: {
            light: '#ffbf00',
            dark: '#ffbf00',
        },
        secondary: {
            light: '#ffbf00',
            dark: '#ffbf00',
        },
        background: {
            light: '#ffbf00',
            dark: '#ffbf00',
        },
        text: {
            light: '#ffbf00',
            dark: '#ffbf00',
        },
        shadow: {
            light: '#ffbf00',
            dark: '#ffbf00',
        },
        marker: {
            light: '#ffbf00',
            dark: '#ffbf00',
        },
        link: {
            light: '#ffbf00',
            dark: '#ffbf00',
        },
    },
    yellow: {
        primary: {
            light: '#ffff00',
            dark: '#ffff00',
        },
        secondary: {
            light: '#ffff00',
            dark: '#ffff00',
        },
        background: {
            light: '#ffff00',
            dark: '#ffff00',
        },
        text: {
            light: '#ffff00',
            dark: '#ffff00',
        },
        shadow: {
            light: '#ffff00',
            dark: '#ffff00',
        },
        marker: {
            light: '#ffff00',
            dark: '#ffff00',
        },
        link: {
            light: '#ffff00',
            dark: '#ffff00',
        },
    },
    lime: {
        primary: {
            light: '#00ff00',
            dark: '#00ff00',
        },
        secondary: {
            light: '#00ff00',
            dark: '#00ff00',
        },
        background: {
            light: '#00ff00',
            dark: '#00ff00',
        },
        text: {
            light: '#00ff00',
            dark: '#00ff00',
        },
        shadow: {
            light: '#00ff00',
            dark: '#00ff00',
        },
        marker: {
            light: '#00ff00',
            dark: '#00ff00',
        },
        link: {
            light: '#00ff00',
            dark: '#00ff00',
        },
    },
    green: {
        primary: {
            light: '#00ff00',
            dark: '#00ff00',
        },
        secondary: {
            light: '#00ff00',
            dark: '#00ff00',
        },
        background: {
            light: '#00ff00',
            dark: '#00ff00',
        },
        text: {
            light: '#00ff00',
            dark: '#00ff00',
        },
        shadow: {
            light: '#00ff00',
            dark: '#00ff00',
        },
        marker: {
            light: '#00ff00',
            dark: '#00ff00',
        },
        link: {
            light: '#00ff00',
            dark: '#00ff00',
        },
    },
    teal: {
        primary: {
            light: '#008080',
            dark: '#008080',
        },
        secondary: {
            light: '#008080',
            dark: '#008080',
        },
        background: {
            light: '#008080',
            dark: '#008080',
        },
        text: {
            light: '#008080',
            dark: '#008080',
        },
        shadow: {
            light: '#008080',
            dark: '#008080',
        },
        marker: {
            light: '#008080',
            dark: '#008080',
        },
        link: {
            light: '#008080',
            dark: '#008080',
        },
    },
    cyan: {
        primary: {
            light: '#00ffff',
            dark: '#00ffff',
        },
        secondary: {
            light: '#00ffff',
            dark: '#00ffff',
        },
        background: {
            light: '#00ffff',
            dark: '#00ffff',
        },
        text: {
            light: '#00ffff',
            dark: '#00ffff',
        },
        shadow: {
            light: '#00ffff',
            dark: '#00ffff',
        },
        marker: {
            light: '#00ffff',
            dark: '#00ffff',
        },
        link: {
            light: '#00ffff',
            dark: '#00ffff',
        },
    },
    blue: {
        primary: {
            light: '#0000ff',
            dark: '#0000ff',
        },
        secondary: {
            light: '#0000ff',
            dark: '#0000ff',
        },
        background: {
            light: '#0000ff',
            dark: '#0000ff',
        },
        text: {
            light: '#0000ff',
            dark: '#0000ff',
        },
        shadow: {
            light: '#0000ff',
            dark: '#0000ff',
        },
        marker: {
            light: '#0000ff',
            dark: '#0000ff',
        },
        link: {
            light: '#0000ff',
            dark: '#0000ff',
        },
    },
    indigo: {
        primary: {
            light: '#4b0082',
            dark: '#4b0082',
        },
        secondary: {
            light: '#4b0082',
            dark: '#4b0082',
        },
        background: {
            light: '#4b0082',
            dark: '#4b0082',
        },
        text: {
            light: '#4b0082',
            dark: '#4b0082',
        },
        shadow: {
            light: '#4b0082',
            dark: '#4b0082',
        },
        marker: {
            light: '#4b0082',
            dark: '#4b0082',
        },
        link: {
            light: '#4b0082',
            dark: '#4b0082',
        },
    },
    purple: {
        primary: {
            light: '#800080',
            dark: '#800080',
        },
        secondary: {
            light: '#800080',
            dark: '#800080',
        },
        background: {
            light: '#800080',
            dark: '#800080',
        },
        text: {
            light: '#800080',
            dark: '#800080',
        },
        shadow: {
            light: '#800080',
            dark: '#800080',
        },
        marker: {
            light: '#800080',
            dark: '#800080',
        },
        link: {
            light: '#800080',
            dark: '#800080',
        },
    },
    pink: {
        primary: {
            light: '#ff69b4',
            dark: '#ff69b4',
        },
        secondary: {
            light: '#ff69b4',
            dark: '#ff69b4',
        },
        background: {
            light: '#ff69b4',
            dark: '#ff69b4',
        },
        text: {
            light: '#ff69b4',
            dark: '#ff69b4',
        },
        shadow: {
            light: '#ff69b4',
            dark: '#ff69b4',
        },
        marker: {
            light: '#ff69b4',
            dark: '#ff69b4',
        },
        link: {
            light: '#ff69b4',
            dark: '#ff69b4',
        },
    },
    rose: {
        primary: {
            light: '#ff007f',
            dark: '#ff007f',
        },
        secondary: {
            light: '#ff007f',
            dark: '#ff007f',
        },
        background: {
            light: '#ff007f',
            dark: '#ff007f',
        },
        text: {
            light: '#ff007f',
            dark: '#ff007f',
        },
        shadow: {
            light: '#ff007f',
            dark: '#ff007f',
        },
        marker: {
            light: '#ff007f',
            dark: '#ff007f',
        },
        link: {
            light: '#ff007f',
            dark: '#ff007f',
        },
    },
    brown: {
        primary: {
            light: '#a52a2a',
            dark: '#a52a2a',
        },
        secondary: {
            light: '#a52a2a',
            dark: '#a52a2a',
        },
        background: {
            light: '#a52a2a',
            dark: '#a52a2a',
        },
        text: {
            light: '#a52a2a',
            dark: '#a52a2a',
        },
        shadow: {
            light: '#a52a2a',
            dark: '#a52a2a',
        },
        marker: {
            light: '#a52a2a',
            dark: '#a52a2a',
        },
        link: {
            light: '#a52a2a',
            dark: '#a52a2a',
        },
    },
    grey: {
        primary: {
            light: '#808080',
            dark: '#808080',
        },
        secondary: {
            light: '#808080',
            dark: '#808080',
        },
        background: {
            light: '#808080',
            dark: '#808080',
        },
        text: {
            light: '#808080',
            dark: '#808080',
        },
        shadow: {
            light: '#808080',
            dark: '#808080',
        },
        marker: {
            light: '#808080',
            dark: '#808080',
        },
        link: {
            light: '#808080',
            dark: '#808080',
        },
    },
}

const Color = (color: ColorType, ui: UI, theme: Theme) => {
    return ColorPalettes[color][ui][theme];
}

export default Color;