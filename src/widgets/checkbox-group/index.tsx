import { Input, Typography, Checkbox } from 'antd'
import WidgetHead from '../widget-head'
import { useAppDispatch, useAppSelector, changeWidgetFormValue } from '~/store'
import { getWidgetByPath } from '~/libs/messager'
import { TWidget } from '~/type'
import { formatPlainDataToOptions } from '~/utils'

const formatValue = (v: string | string[]): string[] => {
    if(Array.isArray(v)) {
        return v
    } else if(typeof v === 'string') {
        return v.split(/[,\s\|]+/)
    } else {
        return formatValue('')
    }
}

export default (props: {
    path?: number[]
}) => {
    const { path = [] } = props

    const properties = useAppSelector(state => {
        const widget = getWidgetByPath(path, state.widgets.list) as TWidget
        return widget && widget.props ? widget.props : {}
    })
    const dispatch = useAppDispatch()

    const {
        title = 'Title',
        value = '',
        options = []
    } = properties

    return <WidgetHead path={path}>
        <div className="content form-item">
            <Typography.Title level={5}>{title}</Typography.Title>
            <Checkbox.Group
                value={formatValue(value)}
                options={formatPlainDataToOptions(options || '')}
                onChange={value => {
                    dispatch(changeWidgetFormValue({ path, value }))
                }}
            />
        </div>
    </WidgetHead>
}