import '~/widgets/base.scss'

import { Widget } from '../index'
import { TFormattedWidget, repeat } from '~/utils'
import { TOnMessage } from '../type'
import WidgetHead from '../widget-head'

export default (props: {
    widgets?: any[]
    widget?: TFormattedWidget
    active?: TFormattedWidget
    path?: number[]
    onMessage?: TOnMessage
}) => {
    const { widgets = [], widget, path = [], active, onMessage } = props
    if (!widget) {
        return null
    }
    const _widgets = Array.isArray(widgets) ? widgets : []

    const { props: _props = {} } = widget

    const { row = 2, col = 3 } = _props

    const total = row * col

    return <WidgetHead onMessage={onMessage} widget={widget} active={active} path={path} subName="grid" title="Grid布局">
        <div className='content' style={{ gridTemplateColumns: `repeat(${col}, 1fr)` }}>
            {
                repeat(n => repeat(m => <div key={n * col + m} className='cell' onDragOver={e => e.preventDefault()} onDrop={e => {
                    e.stopPropagation()
                    if (typeof onMessage === 'function') {
                        const text = e.dataTransfer.getData('text/plain')
                        const data = JSON.parse(text)
                        onMessage('grid-add', path, [total, n * col + m, data])
                    }
                }}>
                    {_widgets[n * col + m] ? <Widget active={active} widget={_widgets[n * col + m]} path={[...path, n * col + m]} onMessage={onMessage} /> : <div className='empty'>{`Cell-${n * col + m}`}</div>}
                </div>, col), row)
            }
        </div>
    </WidgetHead>
}