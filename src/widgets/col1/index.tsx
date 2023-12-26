import '~/widgets/base.scss'

import { TOnMessage } from '../type'
import { Widget } from '../index'
import { TFormattedWidget } from '~/utils'
import WidgetHead from '../widget-head'

export default (props: {
    widgets?: TFormattedWidget[]
    widget?: TFormattedWidget
    path?: number[]
    active?: string
    onMessage?: TOnMessage
}) => {
    const { widgets = null, widget, path = [], active = '', onMessage } = props
    const [child = null] = Array.isArray(widgets) ? widgets : []

    return <WidgetHead onMessage={onMessage} widget={widget} active={active} path={path} subName="col" title="通栏">
        <div className='content' onDragOver={e => e.preventDefault()} onDrop={e => {
            e.stopPropagation()
            if (typeof onMessage === 'function') {
                const text = e.dataTransfer.getData('text/plain')
                const data = JSON.parse(text)
                onMessage('col1-add', path, data)
            }
        }}>
            <div className='content'>{!child ? '拖入组件' : <Widget active={active} widget={child} path={[...path, 0]} onMessage={onMessage} />}</div>
        </div>
    </WidgetHead>

}