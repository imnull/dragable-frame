import { Typography, ColorPicker } from 'antd'
import { getWidgetByPath } from '~/libs/messager'
import { changeWidgetProp, useAppDispatch, useAppSelector } from '~/store'
import { TWidget } from '~/type'
import { formatValue } from '~/utils'

export default (props: {
    ['prop-set-name']: string
    path?: number[]
    text?: string
    value?: any
}) => {

    const {
        ['prop-set-name']: _propName,
        path = [],
        text = '',
    } = props

    const dispatch = useAppDispatch()

    const value = useAppSelector(state => {
        const w = getWidgetByPath(path, state.widgets.list) as TWidget
        if (!w) {
            return false
        }
        return formatValue('string', (w.props || {})[_propName])
    }) as string

    return <div className="controller">
        <Typography.Title level={5}>{text}</Typography.Title>
            <ColorPicker
                value={value}
                onChange={e => {
                    dispatch(changeWidgetProp({ path, prop: _propName, value: `#${e.toHex()}` }))
                }}
            />
    </div>
}