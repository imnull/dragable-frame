import { Input, Typography } from 'antd'
import WidgetHead from '../widget-head'
import { useAppSelector } from '~/store'
import { getWidgetByPath } from '~/libs/messager'
import { TWidget } from '~/type'


export default (props: {
    path?: number[]
}) => {
    const { path = [] } = props

    const properties = useAppSelector(state => {
        const widget = getWidgetByPath(path, state.widgets.list) as TWidget
        return widget && widget.props ? widget.props : {}
    })

    const {
        title = 'Title',
        value = '',
        placeholder = '',
        maxlength = 12,
    } = properties

    return <WidgetHead path={path} subName="input" title="单行文本输入">
        <div className="content">
            <Typography.Title level={5}>{title}</Typography.Title>
            <Input placeholder={placeholder} value={value} maxLength={maxlength} />
        </div>
    </WidgetHead>
}