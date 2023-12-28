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
        text = '文本内容',
        type = '',
        url = '',
        ellipsis = false,
        titleLevel = 5,
        target = '_blank',
        color,
    } = properties

    return <WidgetHead path={path}>
        <div className="content inline center">{
            type === 'title' ? <Typography.Title style={{ color, margin: 0 }} ellipsis={ellipsis} level={titleLevel}>{text}</Typography.Title> :
            type === 'link' ? <Typography.Link style={{ color }} href={url} target={target}>{text}</Typography.Link> :
            <Typography.Text ellipsis={ellipsis} style={{ color }}>{text}</Typography.Text>
        }
        </div>
    </WidgetHead>
}