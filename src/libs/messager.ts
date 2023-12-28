import { genId } from "~/utils";
import { TFormattedWidget } from "~/type";


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

export const updateWidgetByPath = (path: number[], widgets: TFormattedWidget[]) => {
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

export const removeWidgetByPath = (path: number[], widgets: TFormattedWidget[]): boolean => {
    if (path.length < 1) {
        return false
    } else if (path.length === 1) {
        return widgets.splice(path[0], 1).length > 0
    } else {
        const p = [...path]
        const idx = p.shift()!
        const { children } = widgets[idx] || {}
        if (Array.isArray(children)) {
            return removeWidgetByPath(p, children)
        } else {
            return false
        }
    }
}
