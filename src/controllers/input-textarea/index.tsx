import { Input, Typography } from 'antd'
import { useState } from 'react'
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

    const widgetPropValue = useAppSelector(state => {
        const w = getWidgetByPath(path, state.widgets.list) as TWidget
        if (!w) {
            return ''
        }
        return formatValue('string', (w.props || {})[_propName])
    }) as string

    return <div className="controller int-input">
        <Typography.Title level={5}>{text}</Typography.Title>
        <Input.TextArea value={widgetPropValue} rows={8} autoCorrect="none" style={{ resize: 'none', fontFamily: `'Courier New', Courier, monospace` }}
            onChange={e => {
                dispatch(changeWidgetProp({ path, prop: _propName, value: e.target.value }))
            }}
        />
    </div>
}