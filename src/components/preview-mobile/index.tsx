import { TOnMessage } from '~/widgets/type'
import './index.scss'

import WidgetRender from '~/widgets'
import { useEffect, useState } from 'react'
import { TFormattedWidget, genId } from '~/utils'

export default (props: {
    onDropWidget?: (data: any) => void
    onMessage?: TOnMessage
    active?: TFormattedWidget
    widgets?: any[]
}) => {
    const { onDropWidget, onMessage, widgets = [], active } = props
    const handleDrop = (e: any) => {
        if (typeof onDropWidget === 'function') {
            const textPlain = e.dataTransfer.getData('text/plain')
            onDropWidget(JSON.parse(textPlain))
        }
    }

    return <div className="preview-mobile" onDragOver={e => e.preventDefault()} onDrop={handleDrop}>
        <div className="screen">
            <WidgetRender active={active} widgets={widgets} onMessage={onMessage} />
        </div>
    </div>
}