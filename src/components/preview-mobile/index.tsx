import { TOnMessage } from '~/type'
import './index.scss'

import WidgetRender from '~/widgets'

import {
    useAppDispatch,
    addWidgetToList,
} from '~/store'
import { isFormattedWidget } from '~/utils'

const findWidgetDom = (target: HTMLElement | null): HTMLElement | null => {
    if(!target || target.nodeName === 'BODY') {
        return null
    } else if (target.classList.contains('widget')) {
        return target
    } else {
        return findWidgetDom(target.parentElement)
    }
}

export default () => {

    const dispatch = useAppDispatch()

    return <div
        className="preview-mobile"
        onDragOver={e => {
            e.preventDefault()
            const widgetDom = findWidgetDom(e.target as HTMLElement)
            if(!widgetDom) {
                return
            }
            const rect = widgetDom.getBoundingClientRect()
            const { clientX, clientY } = e
            console.log({ clientX, clientY }, rect)
        }}
        onDrop={e => {
            const textPlain = e.dataTransfer.getData('text/plain')
            const data = JSON.parse(textPlain)
            if(isFormattedWidget(data)) {

            } else {
                dispatch(addWidgetToList(data))
            }
        }}
    >
        <div className="screen">
            <WidgetRender />
        </div>
    </div>
}