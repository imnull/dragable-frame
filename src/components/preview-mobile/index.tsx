import { TOnMessage } from '~/type'
import './index.scss'

import WidgetRender from '~/widgets'

import {
    useAppDispatch,
    addWidgetToList,
} from '~/store'

export default () => {

    const dispatch = useAppDispatch()

    return <div className="preview-mobile" onDragOver={e => e.preventDefault()} onDrop={e => {
        const textPlain = e.dataTransfer.getData('text/plain')
        dispatch(addWidgetToList(JSON.parse(textPlain)))
    }}>
        <div className="screen">
            <WidgetRender />
        </div>
    </div>
}