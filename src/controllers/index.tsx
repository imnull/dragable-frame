import { useAppSelector } from '~/store'
import MAPPER from './component-mapper'

import { TControlProps, TControlPropsItem, TWidget } from '~/type'
import { useEffect, useState } from 'react'
import { getWidgetByPath } from '~/libs/messager'

import '~/controllers/index.scss'



const anylizeExpression = (exp: string) => {
    const ms = exp.replace(/\s+/g, '').match(/(^[^\s\<\>\!\=]+)\s*([<>\!\=]+)\s*(.+)$/)
    if (!ms) {
        return () => true
    } else {
        const [, key, op, val = ''] = ms
        switch (op) {
            case '==': return (props: any) => props[key] == val
            case '===': return (props: any) => props[key] === val
            case '!=': return (props: any) => props[key] != val
            case '<>': return (props: any) => props[key] != val
            case '!==': return (props: any) => props[key] !== val
            case '>': return (props: any) => props[key] > val
            case '>=': return (props: any) => props[key] >= val
            case '<': return (props: any) => props[key] < val
            case '<=': return (props: any) => props[key] <= val
        }
        return () => true
    }
}

const shouldShow = (prop: TControlProps, props: Record<string, any>) => {
    let { if: exp } = prop
    if (!exp) {
        return true
    }
    return anylizeExpression(exp)(props)
}

const Controller = (props: {
    path: number[]
    prop: TControlProps
    value: any
}) => {
    const { path, prop, value: propValue } = props

    const { prop: propName, type: propType, component, ...p } = prop
    const { [component]: C } = MAPPER
    if (!C) {
        return null
    }
    return <C {...p} path={path} prop-set-name={propName} />
}

const Row = (props: {
    widgetProps: any
    ctrlProps: TControlProps[]
    path: number[]
}) => {
    const { path, widgetProps, ctrlProps } = props
    return <div className='ctrls-row'>{
        ctrlProps.map((prop, index) => {
            const show = shouldShow(prop, widgetProps)
            if (show) {
                return <Controller path={path} prop={prop} value={widgetProps[prop.prop]} key={index} />
            } else {
                return null
            }
        })
    }</div>
}

export default () => {
    const hasActive = useAppSelector(state => state.widgets.activePath.length > 0)
    const path = useAppSelector(state => state.widgets.activePath)
    const widgets = useAppSelector(state => state.widgets.list)
    const ctrls = useAppSelector(state => state.controllers.list)

    const [ctrlProps, setCtrlProps] = useState<TControlPropsItem[]>([])
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
        if (Array.isArray(prop)) {
            return <Row path={path} widgetProps={widgetProps} ctrlProps={prop} key={index} />
        } else {
            const show = shouldShow(prop, widgetProps)
            if (show) {
                return <Controller path={path} prop={prop} value={widgetProps[prop.prop]} key={index} />
            } else {
                return null
            }
        }
    })
}