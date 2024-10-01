interface Vector {
    path: {
        x: number;
        y: number;
    }[];
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
    position: {
        x: number;
        y: number;
    };
    style: {
        background: 'none' | 'grid' | 'underline';
        backgroundColor: string;
    };
    data: {
        text: string;
        paint: Vector[];
    }
    children: Array<Canvas>;
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

export type { Vector, Canvas, Color, UI, Theme, ColorPalette };