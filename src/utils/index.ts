import { TWidget, TFormattedWidget } from '~/type'

const getWidgetByPath = (widgets: any[], path: number[]) => {
    if (path.length < 1) {
        return null
    }
    const p = [...path]
    let cursor = p.shift()!
    let widget = widgets[cursor]
    while (widget && path.length > 0) {
        cursor = p.shift()!
        widget = widgets[cursor]
    }
    return widget || null
}

const genChildren = (type: string, data: TWidget, widgets: TFormattedWidget[]): TFormattedWidget[] => {
    switch (type) {
        case 'col1-add':
            return [formatWidget(data)]
        case 'col2-add1':
            return [formatWidget(data), widgets[1] || null]
        case 'col2-add2':
            return [widgets[0] || null, formatWidget(data)]
    }
    return widgets
}

export const updateWidgets = (widgets: TFormattedWidget[], path: number[], data: TWidget, type: string) => {
    if (!Array.isArray(widgets)) {
        widgets = []
    }
    if (path.length < 1) {
        return genChildren(type, data, widgets)
    } else {
        const _path = [...path]
        const cursor = _path.shift()!
        const widget = widgets[cursor]
        if (!widget) {
            return widgets
        }
        let { children = [] } = widget
        if (!Array.isArray(children)) {
            children = [children]
        }
        const _children = updateWidgets(children, _path, data, type)
        widget.children = _children

        const _widgets = [...widgets]
        _widgets.splice(cursor, 1, widget)
        return _widgets
    }
}


const GEN_ID_BASE = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const genId = () => {
    const now = Date.now().toString(36)
    const len = 64 - now.length
    const mapper = GEN_ID_BASE.split('').sort(() => 0.5 - Math.random())
    const arr = Array(len).fill('').map(s => s + mapper[GEN_ID_BASE.length * Math.random() >> 0])
    arr.splice((len / 2) >> 0, 0, now)
    return arr.join('').slice(0, len)
}

export const isFormattedWidget = (widget: any): widget is TFormattedWidget => {
    return widget && widget.__isWidget__ === true
}

export const formatWidget = (widget: TWidget): TFormattedWidget => {
    if (isFormattedWidget(widget)) {
        return widget as TFormattedWidget
    }

    const { children, ...rest } = widget

    return {
        __id__: genId(),
        __isWidget__: true,
        ...rest,
        children: Array.isArray(children) ? formatWidgets(children) : undefined,
    } as TFormattedWidget
}

export const restoreWidget = (widget: TFormattedWidget): TWidget => {
    const { __id__, __isWidget__, ...rest } = widget
    return rest
}

export const formatWidgets = (widget: any[]) => {
    return widget.map(formatWidget)
}

export const repeat = <T = void>(callback: (index: number) => T, to: number, from = 0, step = 1) => {
    const arr: T[] = []
    for (let i = from; i < to; i += step) {
        arr.push(callback(i))
    }
    return arr
}

export const formatValue = (type: 'number' | 'string' | 'boolean', val: string) => {
    switch (type) {
        case 'number': return Number(val)
        case 'boolean': return Boolean(val)
    }
    return val
}

export const formatPlainDataToOptions = (data: string) => {
    return data.trim().split(/[\r\n]+/).map(line => {
        const [label, value = label, disabled] = line.split(/\:{2,}/)
        return { label, value, disabled: disabled === '1' || disabled === 'true' }
    })
}


export const comparePath = (a: number[], b: number[]) => {
    return a.length === b.length && a.every((v, i) => b[i] === v)
}

export const isForm = (widget: TWidget) => {
    return !!widget.props && (!!widget.props.formName && typeof widget.props.formName === 'string') && ('value' in widget.props)
}

export const getFormValue = (widget: TWidget) => {
    if (isForm(widget)) {
        if (widget.type === 'checkbox' || widget.type === 'radio') {
            if (widget.props.checked) {
                return { [widget.props.formName]: widget.props.value || true }
            } else {
                return {}
            }
        } else {
            return { [widget.props.formName]: widget.props.value || '' }
        }
    } else {
        return {}
    }
}

export const parseWidgetForm = (widgets: TWidget[]) => {
    const items = widgets.filter(isForm).map(getFormValue)
    return items.reduce((r, v) => ({ ...r, ...v }), {})
}

export const findWidgetDom = (target: HTMLElement | null): HTMLElement | null => {
    if(!target || target.nodeName === 'BODY') {
        return null
    } else if (target.classList.contains('widget')) {
        return target
    } else {
        return findWidgetDom(target.parentElement)
    }
}