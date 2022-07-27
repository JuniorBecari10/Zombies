interface ITickable {
    tick(): void;
}

interface IRenderable {
    render(g: Graphics): void;
}
