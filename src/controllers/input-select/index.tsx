import { Input, Typography, Select } from 'antd'
import { getWidgetByPath } from '~/libs/messager'
import { changeWidgetProp, useAppDispatch, useAppSelector } from '~/store'
import { TWidget } from '~/type'
import { formatValue } from '~/utils'

export default (props: {
    ['prop-set-name']: string
    path?: number[]
    text?: string
    options?: any
}) => {

    const {
        ['prop-set-name']: _propName,
        path = [],
        text = '',
        options,
    } = props

    const dispatch = useAppDispatch()

    const value = useAppSelector(state => {
        const w = getWidgetByPath(path, state.widgets.list) as TWidget
        if (!w) {
            return ''
        }
        return formatValue('string', (w.props || {})[_propName])
    }) as string

    return <div className="controller int-input">
        <Typography.Title level={5}>{text}</Typography.Title>
        <Select
            value={value}
            options={options}
            onChange={e => {
                dispatch(changeWidgetProp({ path, prop: _propName, value: e }))
            }}
        />
    </div>
}