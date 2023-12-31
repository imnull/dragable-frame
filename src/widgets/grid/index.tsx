import '~/widgets/base.scss'

import { Widget } from '../index'
import { repeat } from '~/utils'
import WidgetHead from '../widget-head'

import {
    useAppDispatch,
    useAppSelector,
    addIndexedWidgetByPath,
} from '~/store'
import { getWidgetByPath } from '~/libs/messager'

export default (props: {
    path: number[]
}) => {
    const { path = [] } = props


    const widget = useAppSelector(state => getWidgetByPath(path, state.widgets.list))

    if (!widget) {
        return null
    }

    const dispatch = useAppDispatch()

    const { props: _props = {} } = widget
    const { row = 2, col = 3 } = _props

    const widgets = useAppSelector(state => getWidgetByPath(path, state.widgets.list).children || [])

    return <WidgetHead path={path}>
        <div className='content' style={{ gridTemplateColumns: `repeat(${col}, 1fr)` }}>
            {
                repeat(m => 
                    repeat(n => {
                        const index = m * col + n
                        return <div key={index} className='cell' onDragOver={e => e.preventDefault()} onDrop={e => {
                            e.stopPropagation()
                            const text = e.dataTransfer.getData('text/plain')
                            const data = JSON.parse(text)
                            dispatch(addIndexedWidgetByPath({ path, data, index }))
                        }}>
                            {widgets[index] ? <Widget type={widgets[index].type} path={[...path, index]} /> : <div className='empty'>{`Cell-${index}`}</div>}
                        </div>
                    }, col)
                , row)
            }
        </div>
    </WidgetHead>
}