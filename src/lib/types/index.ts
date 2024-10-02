import type { Writable } from "svelte/store";

type Position = {
    x: number;
    y: number;
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
        text?: string;
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

export type { Position, Vector, Canvas, Color, UI, Theme, ColorPalette };