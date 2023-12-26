import { TFormattedWidget } from '~/utils'
import IntInput from './input-int'

export type TControlProps = {
    prop: string
    text: string
    type: 'string' | 'number' | 'boolean'
    component: string
} & Record<string, string | number>

export type TController = {
    type: string
    ctrls: TControlProps[]
}

const mapper = {
    'int-input': IntInput,
} as Record<string, any>

const formatValue = (type: 'number' | 'string' | 'boolean', val: string) => {
    switch(type) {
        case 'number': return Number(val)
        case 'boolean': return Boolean(val)
    }
    return val
}

const Controller = (props: {
    widgetId: string
    widgetProps: Record<string, any> | null
    propValue: any
    property: TControlProps
    onPropsChange: (id: string, prop: string, value: any) => void
}) => {
    const { property, widgetId, widgetProps, propValue, onPropsChange } = props
    if (!property || !widgetProps) {
        return null
    }
    const { prop, type, component, ...p } = property
    const { [component]: C } = mapper
    if (!C) {
        return null
    }
    return <C { ...p } value={propValue} widgetId={widgetId} prop={prop} onPropsChange={(id: string, prop: string, val: any) => {
        onPropsChange(id, prop, formatValue(type, val))
    }} />
}

export default (props: {
    widgetId: string
    widgetProps: Record<string, any> | null
    ctrlProps: TControlProps[]
    onPropsChange: (id: string, prop: string, value: any) => void
}) => {
    const { ctrlProps = [], widgetId, widgetProps, onPropsChange } = props
    if(!widgetProps) {
        return null
    }
    return ctrlProps.map((prop, index) => {
        return <Controller
            onPropsChange={onPropsChange}
            widgetId={widgetId}
            widgetProps={widgetProps}
            propValue={widgetProps[prop.prop]}
            property={prop}
            key={`${widgetId}-${prop.prop}-${index}`}
        />
    })
}