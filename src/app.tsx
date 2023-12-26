import { useEffect, useState } from 'react'
import './app.scss'

import { ComponentList, PreviewMobild } from '~/components'
import { getComponentList, getComponentControllers } from '~/services'
import { formatWidget, TWidget, TFormattedWidget } from '~/utils'
import { findWidgetPath, resolveMessage, updateWidgetProps } from '~/libs/messager'
import Controller, { TControlProps, TController } from './controllers'

export default () => {

    const [componentList, setComponentList] = useState<TWidget[]>([])
    const [widgets, setWidgets] = useState<TFormattedWidget[]>([])
    const [ctrls, setCtrls] = useState<TController[]>([])
    const [active, setActive] = useState<TFormattedWidget | undefined>(undefined)
    const [controlProps, setControlProps] = useState<TControlProps[]>([])
    const [widgetProps, setWidgetProps] = useState<any>(null)

    useEffect(() => {
        getComponentList().then(list => {
            setComponentList(list)
        })
        getComponentControllers().then(ctrls => {
            setCtrls(ctrls)
        })
    }, [])

    const handleDropWidget = (widget: any) => {
        const w = formatWidget(widget)
        setWidgets([...widgets, w])
    }

    useEffect(() => {
        console.log('All widgets', widgets)
    }, [widgets])

    return <div className="dragable-frame" onClick={() => {
        setActive(undefined)
    }}>
        <div className="left">
            <ComponentList list={componentList} />
        </div>
        <div className="right">
            <PreviewMobild active={active} widgets={widgets} onDropWidget={handleDropWidget} onMessage={(type, path, params) => {
                if(type === 'widget-active') {
                    setActive(params)
                    const constroller = ctrls.find(it => it.type === params.type) || null
                    if(constroller && params.props) {
                        setControlProps([...constroller.ctrls])
                        setWidgetProps({ ...params.props })
                    }
                } else {
                    const _widgets = resolveMessage(type, path, widgets, params)
                    setWidgets(_widgets)
                }
            }} />
        </div>
        {active && controlProps && controlProps.length > 0 && widgetProps ? <div className="ctrls" onClick={e => e.stopPropagation()}>
            <Controller widgetId={active.__id__} widgetProps={widgetProps} ctrlProps={controlProps} onPropsChange={(id, prop, value) => {
                const path = findWidgetPath(widgets, w => w.__id__ === id)
                if(path) {
                    const _widgets = updateWidgetProps(path, widgets, { [prop]: value })
                    setWidgets(_widgets)
                    setWidgetProps({ ...widgetProps, [prop]: value })
                }
            }} />
        </div> : null}
    </div >
}