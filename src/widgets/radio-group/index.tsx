import { Typography, Radio } from 'antd'
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
        value = '',
        options = []
    } = properties

    return <WidgetHead path={path}>
        <div className="content form-item">
            <Typography.Title level={5}>{title}</Typography.Title>
            <Radio.Group
                value={value}
                options={formatPlainDataToOptions(options || '')}
                onChange={e => {
                    dispatch(changeWidgetFormValue({ path, value: e.target.value || '' }))
                }}
            />
        </div>
    </WidgetHead>
}