declare module '*.svg' {
    const content: string
    export default content
    export const ReactComponent: import('vue').DefineComponent<{}, {}, any>
}