import '~/widgets/base.scss'

import { Widget } from '../index'
import WidgetHead from '../widget-head'
import {
    useAppDispatch,
    useAppSelector,
    addIndexedWidgetByPath,
} from '~/store'
import { getWidgetByPath } from '~/libs/messager'

export default (props: { path: number[] }) => {
    const { path = [] } = props

    const dispatch = useAppDispatch()

    const child = useAppSelector(state => getWidgetByPath([...path, 0], state.widgets.list))

    return <WidgetHead path={path} subName="col" title="通栏">
        <div className='content' onDragOver={e => e.preventDefault()} onDrop={e => {
            e.stopPropagation()
            const text = e.dataTransfer.getData('text/plain')
            const data = JSON.parse(text)
            dispatch(addIndexedWidgetByPath({ path, data, index: 0 }))
        }}>
            <div className='content'>{child ? <Widget type={child.type} path={[...path, 0]} /> : '拖入组件'}</div>
        </div>
    </WidgetHead>

}