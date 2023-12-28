import { Typography, Checkbox } from 'antd'
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

    const checked = useAppSelector(state => {
        const w = getWidgetByPath(path, state.widgets.list) as TWidget
        if (!w) {
            return false
        }
        return formatValue('boolean', (w.props || {})[_propName])
    }) as boolean

    return <div className="controller inline" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
        <div
            className='wrapper'
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px 0', flexGrow: 0, alignSelf: 'flex-start', cursor: 'pointer', userSelect: 'none' }}
            onClick={() => {
                dispatch(changeWidgetProp({ path, prop: _propName, value: !checked }))
            }}
        >
            <Typography.Text style={{ marginRight: 6 }}>{text}</Typography.Text>
            <Checkbox title={text} checked={checked}
                onChange={e => {
                    // dispatch(changeWidgetProp({ path, prop: _propName, value: e.target.checked }))
                }}
            />
        </div>
    </div>
}