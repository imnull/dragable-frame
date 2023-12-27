import '../base.scss'

import {
    useAppDispatch,
    useAppSelector,
    setWidgetActive,
    setActivePath,
    removeWidgetByPath,
} from '~/store'
import { getWidgetByPath } from '~/libs/messager'
import { TFormattedWidget } from '~/type'

export default (props: {
    path: number[]
    subName: string
    title: string
    children?: any
}) => {
    const { path, children = null, title, subName } = props
    const widget = useAppSelector(state => getWidgetByPath(path, state.widgets.list)) as TFormattedWidget
    const active = useAppSelector(state => state.widgets.activeId)
    const dispatch = useAppDispatch()

    if (!widget) {
        return <h1>Widget is null</h1>
    }

    return <div className={`widget ${active === widget.__id__ ? 'active' : ''} ${subName}`}>
        <div className='head' onClick={e => {
            e.stopPropagation()
            dispatch(setWidgetActive(widget.__id__))
            dispatch(setActivePath(path))
        }}>
            {/* <span>{title} | {widget?.__id__}</span> */}
            <span>{title}</span>
            <label onClick={e => {
                e.stopPropagation()
                dispatch(removeWidgetByPath({ path }))
            }}>X</label>
        </div>
        {children}
    </div>
}