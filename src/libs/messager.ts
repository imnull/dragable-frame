import { TFormattedWidget, TWidget, formatWidget, genId, repeat } from "~/utils";


const comparePath = (a: number[], b: number[]) => {
    return a.length === b.length && a.every((v, i) => b[i] === v)
}

export const getWidgetByPath = (path: number[], widgets: TFormattedWidget[]): TFormattedWidget | null => {
    if (path.length < 1) {
        return null
    } else if (path.length === 1) {
        return widgets[path[0]] || null
    } else {
        const p = [...path]
        const idx = p.shift()!
        const w = widgets[idx]
        if (!w || !Array.isArray(w.children)) {
            return null
        }
        return getWidgetByPath(p, w.children)
    }
}

export const traverseWidget = (widget: TFormattedWidget[] | TFormattedWidget, callback: (path: number[], widget: TFormattedWidget) => void, path: number[] = []) => {
    if (Array.isArray(widget)) {
        widget.forEach((widget, index) => {
            traverseWidget(widget, callback, [...path, index])
        })
    } else {
        const p = [...path]
        callback(p, widget)
        if (Array.isArray(widget.children)) {
            traverseWidget(widget.children, callback, p)
        }
    }
}

export const findWidgetPath = (widget: null | undefined | TFormattedWidget[] | TFormattedWidget, callback: (widget: TFormattedWidget) => boolean, path: number[] = []): number[] | null => {
    if (Array.isArray(widget)) {
        let w: number[] | null = null
        widget.some((widget, index) => {
            w = findWidgetPath(widget, callback, [...path, index])
            return !!w
        })
        return w
    } else {
        const p = [...path]
        if (!widget) {
            return null
        } else if (callback(widget)) {
            return p
        } else if (Array.isArray(widget.children)) {
            return findWidgetPath(widget.children, callback, p)
        } else {
            return null
        }
    }
}

const updateWidgetByPath = (path: number[], widgets: TFormattedWidget[]) => {
    const p = [...path]
    let ws = [...widgets]
    while (p.length > 0) {
        const idx = p.shift()!
        const w = ws[idx]
        if (!w || !Array.isArray(w.children)) {
            return
        }
        if (p.length < 1) {
            w.__id__ = genId()
            if (Array.isArray(w.children)) {
                w.children = [...w.children]
            }
            return
        }
        ws = w.children
    }
}

export const updateWidgetProps = (path: number[], widgets: TFormattedWidget[], props: Record<string, any>) => {
    const p = [...path]
    let ws = [...widgets]
    while (p.length > 0) {
        const idx = p.shift()!
        const w = ws[idx]
        if (!w) {
            break
        }
        if (p.length < 1) {
            if(!w.props) {
                w.props = {}
            }
            Object.assign(w.props, props)
            w.__id__ = genId()
            if (Array.isArray(w.children)) {
                w.children = [...w.children]
            }
            break
        }
        if(Array.isArray(w.children)) {
            ws = w.children
        } else {
            break
        }
    }
    return [...widgets]
}

const removeWidget = (path: number[], widgets: TFormattedWidget[]): boolean => {
    if (path.length < 1) {
        return false
    } else if (path.length === 1) {
        const [idx] = path
        return widgets.splice(idx, 1).length > 0
    } else {
        const p = [...path]
        const idx = p.shift()!
        const { children } = widgets[idx] || {}
        if (Array.isArray(children)) {
            return removeWidget(p, children)
        } else {
            return false
        }
    }
}

const setWidgetNull = (path: number[], widgets: (TFormattedWidget | null)[]): boolean => {
    if (path.length < 1) {
        return false
    } else if (path.length === 1) {
        const [idx] = path
        widgets[idx] = null
        return true
    } else {
        const p = [...path]
        const idx = p.shift()!
        const { children } = widgets[idx] || {}
        if (Array.isArray(children)) {
            return setWidgetNull(p, children)
        } else {
            return false
        }
    }
}

export const resolveMessage = (type: string, path: number[], widgets: TFormattedWidget[], params?: any) => {
    switch (type) {
        case 'remove': {
            if (setWidgetNull(path, widgets)) {
                updateWidgetByPath(path.slice(0, -1), widgets)
            }
            break
        }
        // case 'remove-widget': {
        //     if (removeWidget(path, widgets)) {
        //         updateWidgetByPath(path.slice(0, -1), widgets)
        //     }
        //     break
        // }
        case 'col1-add': {
            const widget = getWidgetByPath(path, widgets)
            if (widget) {
                widget.children = [formatWidget(params)]
                updateWidgetByPath(path, widgets)
            }
            break
        }
        case 'col2-add': {
            const widget = getWidgetByPath(path, widgets)
            if (widget) {
                const [idx, data] = params
                const { children = [] } = widget
                const _children: TFormattedWidget[] = []
                _children[0] = children[0]
                _children[1] = children[1]
                _children[idx] = formatWidget(data)
                widget.children = _children

                updateWidgetByPath(path, widgets)
            }
            break
        }
        case 'grid-add': {
            const widget = getWidgetByPath(path, widgets)
            if (widget) {
                const [total, idx, data] = params
                const { children = [] } = widget
                const _children = repeat(idx => children[idx], total) as TFormattedWidget[]
                _children[idx] = formatWidget(data)
                widget.children = _children

                updateWidgetByPath(path, widgets)
            }
            break
        }
    }
    return [...widgets]
}