const returnMousePosition = (e: MouseEvent) => {
    return {
        x: e.clientX,
        y: e.clientY
    };
}

export { returnMousePosition };