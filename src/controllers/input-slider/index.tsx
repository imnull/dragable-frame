import { InputNumber, Typography, Slider } from 'antd'
import { getWidgetByPath } from '~/libs/messager'
import { changeWidgetProp, useAppDispatch, useAppSelector } from '~/store'
import { TWidget } from '~/type'
import { formatValue } from '~/utils'

export default (props: {
    ['prop-set-name']: string
    path?: number[]
    text?: string
    min?: number
    max?: number
}) => {
    const {
        ['prop-set-name']: _propName,
        path = [],
        min = 0, max = 9, text = '',
    } = props

    const dispatch = useAppDispatch()

    const widgetPropValue = useAppSelector(state => {
        const w = getWidgetByPath(path, state.widgets.list) as TWidget
        if (!w) {
            return 0
        }
        return formatValue('number', (w.props || {})[_propName])
    }) as number



    return <div className="controller row">
        <Typography.Title level={5}>{text}</Typography.Title>
        <div className='component'>
            <Slider
                min={min} max={max} value={widgetPropValue}
                onChange={val => {
                    dispatch(changeWidgetProp({ path, prop: _propName, value: val }))
                }}
            />
        </div>
    </div>
}