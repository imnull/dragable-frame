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
    const { col = 3 } = _props

    const widgets = useAppSelector(state => getWidgetByPath(path, state.widgets.list).children || [])

    return <WidgetHead path={path}>
        <div className='content' style={{ gridTemplateColumns: `repeat(${col}, 1fr)` }}>
            {
                repeat(n => {
                    const index = n
                    return <div key={index} className='col' onDragOver={e => e.preventDefault()} onDrop={e => {
                        e.stopPropagation()
                        const text = e.dataTransfer.getData('text/plain')
                        const data = JSON.parse(text)
                        dispatch(addIndexedWidgetByPath({ path, data, index }))
                    }}>
                        {widgets[index] ? <Widget type={widgets[index].type} path={[...path, index]} /> : <div className='empty'>{`c${index}`}</div>}
                    </div>
                }, col)
            }
        </div>
    </WidgetHead>
}