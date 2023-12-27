export type TOnMessage = (type: string, path: number[], params?: any) => void

export type TWidget = {
    type: string
    text: string
    data?: any
    props?: any
    children?: TWidget[]
}

export type TFormattedWidget = {
    __id__: string
    __isWidget__: true
} & TWidget & {
    children?: TFormattedWidget[]
}

export type TControlProps = {
    prop: string
    text: string
    type: 'string' | 'number' | 'boolean'
    component: string
} & Record<string, string | number>

export type TController = {
    type: string
    ctrls: TControlProps[]
}