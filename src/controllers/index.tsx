import { useAppSelector } from '~/store'
import InputInt from './input-int'
import InputText from './input-text'

import { TControlProps, TWidget } from '~/type'
import { useEffect, useState } from 'react'
import { getWidgetByPath } from '~/libs/messager'
import { formatValue } from '~/utils'

const mapper = {
    'input-int': InputInt,
    'input-text': InputText,
} as Record<string, any>


const Controller = (props: {
    path: number[]
    prop: TControlProps
    value: any
}) => {
    const { path, prop, value: propValue } = props

    const { prop: propName, type: propType, component, ...p } = prop
    const { [component]: C } = mapper
    if (!C) {
        return null
    }
    return <C {...p} path={path} prop-set-name={propName} />
}

export default () => {
    const hasActive = useAppSelector(state => state.widgets.activePath.length > 0)
    const path = useAppSelector(state => state.widgets.activePath)
    const widgets = useAppSelector(state => state.widgets.list)
    const ctrls = useAppSelector(state => state.controllers.list)

    const [ctrlProps, setCtrlProps] = useState<TControlProps[]>([])
    const [widgetProps, setWidgetProps] = useState<any>(null)

    useEffect(() => {
        const widget = getWidgetByPath(path, widgets) as TWidget
        if (!widget) {
            return
        }
        const { type, props = null } = widget
        const ctrl = ctrls.find(c => c.type === type)
        if (!ctrl) {
            setWidgetProps(null)
            setCtrlProps([])
            return
        }
        setCtrlProps(ctrl.ctrls)
        setWidgetProps(props)
    }, [path, widgets])

    if (!hasActive || !widgetProps || ctrlProps.length < 1) {
        return null
    }
    return ctrlProps.map((prop, index) => {
        return <Controller path={path} prop={prop} value={widgetProps[prop.prop]} key={index} />
    })
}