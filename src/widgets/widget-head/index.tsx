import '../base.scss'

import {
    useAppDispatch,
    useAppSelector,
    setWidgetActive,
    setActivePath,
    removeWidgetByPath,
    setWidegetDragging,
} from '~/store'
import { getWidgetByPath } from '~/libs/messager'
import { TFormattedWidget } from '~/type'
import { restoreWidget } from '~/utils'

export default (props: {
    path: number[]
    children?: any
}) => {
    const { path, children = null } = props
    const widget = useAppSelector(state => getWidgetByPath(path, state.widgets.list)) as TFormattedWidget
    const active = useAppSelector(state => state.widgets.activeId)
    const screenStatus = useAppSelector(state => state.screen.status)

    const dispatch = useAppDispatch()

    if (!widget) {
        return <h1>Widget is null</h1>
    }

    if(screenStatus === 'preview') {
        return <div className={`widget ${widget.type} ${screenStatus}`}>
            {children}
        </div>
    } else {
        return <div
            className={`widget ${active === widget.__id__ ? 'active' : ''} ${widget.type}`}
            draggable
            onDragStart={e => {
                e.dataTransfer.setData('text/plain', JSON.stringify(widget))
                const { width, height, left, top } = (e.target as HTMLElement).getBoundingClientRect()
                dispatch(setWidegetDragging({ path, dragging: true }))
            }}
        >
            <div
                className='head'
                onClick={e => {
                    e.stopPropagation()
                    dispatch(setWidgetActive(widget.__id__))
                    dispatch(setActivePath(path))
                }}
            >
                {/* <span>{title} | {widget?.__id__}</span> */}
                <span>{widget.text}</span>
                <label onClick={e => {
                    e.stopPropagation()
                    dispatch(removeWidgetByPath({ path }))
                }}>X</label>
            </div>
            {children}
        </div>
    }
}