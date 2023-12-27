import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getWidgetByPath, updateWidgetByPath } from '~/libs/messager'
import { TWidget, TFormattedWidget } from '~/type'

import { formatWidget } from '~/utils'

const widgets = createSlice({
    name: 'widgets',
    initialState: {
        list: [] as TFormattedWidget[],
        activeId: '',
        activePath: [] as number[],
    },
    reducers: {
        addWidgetToList: (state, action: PayloadAction<TWidget | TFormattedWidget>) => {
            state.list.push(formatWidget(action.payload))
        },
        setWidgetActive: (state, action: PayloadAction<string>) => {
            state.activeId = action.payload
        },
        setActivePath: (state, action: PayloadAction<number[]>) => {
            state.activePath = [...action.payload]
        },
        flashWidgets: (state) => {
            state.list = [...state.list]
        },
        addIndexedWidgetByPath: (state, action: PayloadAction<{ path: number[]; index: number; data: TWidget }>) => {
            const { path, index, data } = action.payload
            const widget = getWidgetByPath(path, state.list)
            if (widget) {
                const { children = [] } = widget
                const _children: TFormattedWidget[] = []
                children.forEach((c: TFormattedWidget, i: number) => {
                    _children[i] = c
                })
                _children[index] = formatWidget(data)
                widget.children = _children
                updateWidgetByPath(path, state.list)
            }
        },
        removeWidgetByPath: (state, action: PayloadAction<{ path: number[] }>) => {
            const { path } = action.payload
            if(path.length < 1) {
                return
            } else if(path.length === 1) {
                state.list.splice(path[0], 1)
            } else {
                const p = [...path]
                const tail = p.pop()
                if(typeof tail === 'number' && !isNaN(tail) && tail >= 0) {
                    const w = getWidgetByPath(p, state.list) as TFormattedWidget
                    if(!w) {
                        return
                    }
                    if(Array.isArray(w.children) && tail < w.children.length) {
                        w.children.splice(tail, 1, undefined as any)
                    }
                }
                
            }
        },
        changeWidgetProp: (state, action: PayloadAction<{ path: number[], prop: string, value: any }>) => {
            const { path, prop, value } = action.payload
            const widget = getWidgetByPath(path, state.list) as TWidget
            if(!widget) {
                return
            }
            if(!widget.props) {
                widget.props = {}
            }
            widget.props[prop] = value
        }
    }
})

export const { addWidgetToList, setWidgetActive, addIndexedWidgetByPath, flashWidgets, removeWidgetByPath, setActivePath, changeWidgetProp } = widgets.actions

export default widgets.reducer
