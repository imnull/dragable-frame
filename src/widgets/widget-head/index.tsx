import { TOnMessage } from '../type'
import '../base.scss'

import { TFormattedWidget } from '~/utils'

export default (props: {
    widget?: TFormattedWidget
    active?: TFormattedWidget
    path: number[]
    subName: string
    title: string
    children?: any
    onMessage?: TOnMessage
}) => {
    const { widget, path, children = null, title, subName, active, onMessage } = props

    if(!widget) {
        return <h1>Widget is null</h1>
    }

    return <div className={`widget ${active && active.__id__ === widget.__id__ ? 'active' : ''} ${subName}`}>
        <div className='head' onClick={e => {
            e.stopPropagation()
            if(widget && typeof onMessage === 'function') {
                onMessage('widget-active', path, widget)
            }
        }}>
            {/* <span>{title} | {widget?.__id__}</span> */}
            <span>{title}</span>
            <label onClick={() => widget && typeof onMessage === 'function' && onMessage('remove', path)}>X</label>
        </div>
        {children}
    </div>
}