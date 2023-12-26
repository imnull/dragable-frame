import '~/widgets/base.scss'

import { Widget } from '../index'
import { TFormattedWidget } from '~/utils'
import { TOnMessage } from '../type'
import WidgetHead from '../widget-head'

export default (props: {
    widgets?: any[]
    widget?: TFormattedWidget
    path?: number[]
    active?: string
    onMessage?: TOnMessage
}) => {
    const { widgets = [], widget, path = [], active = '', onMessage } = props
    const [left = null, right = null] = Array.isArray(widgets) ? widgets : []

    return <WidgetHead onMessage={onMessage} widget={widget} active={active} path={path} subName="col2" title="一行二列">
        <div className='content'>
            <div className='col' onDragOver={e => e.preventDefault()} onDrop={e => {
                e.stopPropagation()
                if (typeof onMessage === 'function') {
                    const text = e.dataTransfer.getData('text/plain')
                    const data = JSON.parse(text)
                    onMessage('col2-add', path, [0, data])
                }
            }}>
                {left ? <Widget active={active} widget={left} path={[...path, 0]} onMessage={onMessage} /> : '拖入组件'}
            </div>
            <div className='col' onDragOver={e => e.preventDefault()} onDrop={e => {
                e.stopPropagation()
                if (typeof onMessage === 'function') {
                    const text = e.dataTransfer.getData('text/plain')
                    const data = JSON.parse(text)
                    onMessage('col2-add', path, [1, data])
                }
            }}>
                {right ? <Widget active={active} widget={right} path={[...path, 1]} onMessage={onMessage} /> : '拖入组件'}
            </div>
        </div>
    </WidgetHead>
}