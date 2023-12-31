
import './index.scss'

import WidgetRender from '~/widgets'

import {
    useAppDispatch,
    addWidgetToList,
    useAppSelector,
    setWidegetDragging,
} from '~/store'
import { isFormattedWidget } from '~/utils'
import { findWidgetPath } from '~/libs/messager'
import { useState } from 'react'
import { TRect } from '~/type'

const findWidgetDom = (target: HTMLElement | null): HTMLElement | null => {
    if (!target || target.nodeName === 'BODY') {
        return null
    } else if (target.classList.contains('widget')) {
        return target
    } else {
        return findWidgetDom(target.parentElement)
    }
}

export default () => {

    const widgets = useAppSelector(state => state.widgets.list)
    const dispatch = useAppDispatch()

    const [screen, setScreen] = useState<HTMLDivElement | null>(null)

    return <div
        className="preview-mobile"
        onDragOver={e => {
            e.preventDefault()
            const widgetDom = findWidgetDom(e.target as HTMLElement)
            if (!widgetDom) {
                return
            }
            const rect = widgetDom.getBoundingClientRect()
            const { clientX, clientY } = e
            // console.log(e)
            // console.log({ clientX, clientY }, rect)
        }}
        onDrop={e => {
            const textPlain = e.dataTransfer.getData('text/plain')
            const data = JSON.parse(textPlain)
            if (isFormattedWidget(data)) {
                const path = findWidgetPath(widgets, w => w.__id__ === data.__id__)
                dispatch(setWidegetDragging({ path, dragging: false }))
            } else {
                dispatch(addWidgetToList(data))
            }
        }}
    >
        <div className="screen" ref={setScreen} onMouseDown={() => {
            console.log(screen)
            if(!screen) {
                return
            }
            const els = Array.from(screen.childNodes).filter(n => n.nodeType === 1)
            const rects = els.map(el => (el as HTMLElement).getBoundingClientRect()).map(({ width, height, left, top }) => ({ width, height, left, top })) as TRect[]
            console.log(rects)
        }}>
            <WidgetRender />
        </div>
    </div>
}