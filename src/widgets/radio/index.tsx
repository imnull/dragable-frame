import { Typography, Radio } from 'antd'
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
        label = 'description',
        value = '',
        checked,
    } = properties

    return <WidgetHead path={path}>
        <div className="content inline" style={{ alignItems: 'center' }}>
            <Radio style={{ marginRight: 6 }} checked={checked} value={value} />
            <Typography.Text>{label}</Typography.Text>
        </div>
    </WidgetHead>
}