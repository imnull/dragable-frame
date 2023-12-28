import { Input, Typography, Select } from 'antd'
import WidgetHead from '../widget-head'
import { changeWidgetFormValue, useAppDispatch, useAppSelector } from '~/store'
import { getWidgetByPath } from '~/libs/messager'
import { TWidget } from '~/type'
import { formatPlainDataToOptions } from '~/utils'

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
        options = '',
        value = '',
    } = properties

    return <WidgetHead path={path}>
        <div className="content form-item">
            <Typography.Title level={5}>{title}</Typography.Title>
            <Select
                value={value}
                options={formatPlainDataToOptions(options || '')}
                onChange={value => {
                    dispatch(changeWidgetFormValue({ path, value }))
                }}
            />
        </div>
    </WidgetHead>
}