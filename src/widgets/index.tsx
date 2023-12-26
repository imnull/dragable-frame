import { TFormattedWidget } from '~/utils'
import MAPPER from './mapper'
import { TOnMessage } from './type'

export const Widget = (props: {
    widget: TFormattedWidget
    active?: TFormattedWidget
    path: number[],
    onMessage?: TOnMessage
}) => {
    const { path, widget, active, onMessage } = props
    const { type, children } = widget
    if (!type) {
        return null
    }
    const { [type]: C } = MAPPER
    if (C) {
        const widgets = children ? Array.isArray(children) ? children : [children] : []
        return <C active={active} widget={widget} path={[...path]} widgets={widgets} onMessage={onMessage} />
    } else {
        return null
    }
}

const Render = (props: {
    widgets: TFormattedWidget[]
    active?: TFormattedWidget
    path: number[]
    onMessage?: TOnMessage
}) => {
    const { widgets, path = [], active, onMessage } = props
    if (!widgets || widgets.length < 1) {
        return null
    }
    return <>{
        widgets.map((widget, index) => {
            if (!widget) {
                return null
            }
            return <Widget active={active} widget={widget} path={[...path, index]} key={widget.__id__} onMessage={onMessage} />
        })
    }</>
}

export default Render