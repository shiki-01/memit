import type { Writable } from "svelte/store";

type Position = {
    x: number;
    y: number;
}

type Size = {
    width: number;
    height: number;
}

interface Vector {
    path: Position[];
    style: {
        strokeColor: string;
        fillColor: string;
        lineWidth: number;
    };
}

interface Canvas {
    size: {
        width: number;
        height: number;
    };
    position: Writable<Position>;
    style: {
        background: 'none' | 'grid' | 'underline';
        backgroundColor: Color;
    };
    data?: {
        text?: {
            content: string;
            justify: 'center' | 'start' | 'end';
            align: 'center' | 'start' | 'end';
            color: Color;
            size: number;
            font: string;
        };
        paint?: Vector[];
    }
    children?: Array<Canvas>;
}

type Color = 'stone' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'teal' | 'cyan' | 'blue' | 'indigo' | 'purple' | 'pink' | 'rose' | 'brown' | 'grey';

type UI = 'primary' | 'secondary' | 'background' | 'text' | 'shadow' | 'marker' | 'link';

type Theme = 'light' | 'dark';

type ColorPalette = {
    [key in Color]: {
        [key in UI]: {
            [key in Theme]: string;
        };
    };
};

export type { Position, Size, Vector, Canvas, Color, UI, Theme, ColorPalette };