export type TOnMessage = (type: string, path: number[], params?: any) => void
export type TRect = { width: number; height: number; left: number; top: number; }

export type TWidget = {
    type: string
    text: string
    dragging?: boolean,
    rect?: TRect | null
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
    if?: string
} & Record<string, string | number>

export type TControlPropsItem = TControlProps | TControlProps[]

export type TController = {
    type: string
    ctrls: TControlPropsItem[]
}