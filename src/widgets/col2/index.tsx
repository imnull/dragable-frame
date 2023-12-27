import '~/widgets/base.scss'

import { Widget } from '../index'
import { TOnMessage, TFormattedWidget } from '~/type'
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

    const dispatch = useAppDispatch()

    const left = useAppSelector(state => getWidgetByPath([...path, 0], state.widgets.list))
    const right = useAppSelector(state => getWidgetByPath([...path, 1], state.widgets.list))

    return <WidgetHead path={path} subName="col2" title="一行二列">
        <div className='content'>
            <div className='col' onDragOver={e => e.preventDefault()} onDrop={e => {
                e.stopPropagation()
                const text = e.dataTransfer.getData('text/plain')
                const data = JSON.parse(text)
                dispatch(addIndexedWidgetByPath({ path, data, index: 0 }))
            }}>
                {left ? <Widget type={left.type} path={[...path, 0]} /> : '拖入组件'}
            </div>
            <div className='col' onDragOver={e => e.preventDefault()} onDrop={e => {
                e.stopPropagation()
                const text = e.dataTransfer.getData('text/plain')
                const data = JSON.parse(text)
                dispatch(addIndexedWidgetByPath({ path, data, index: 1 }))
            }}>
                {right ? <Widget type={right.type} path={[...path, 1]} /> : '拖入组件'}
            </div>
        </div>
    </WidgetHead>
}