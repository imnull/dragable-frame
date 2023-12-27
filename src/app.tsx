import { useEffect } from 'react'
import './app.scss'

import { ComponentList, PreviewMobild } from '~/components'
import { getComponentList, getComponentControllers } from '~/services'
import Controller from './controllers'

import {
    useAppDispatch,
    setComponentList,
    setControllerList,
    setActivePath,
    setWidgetActive,
} from './store'


export default () => {

    const dispatch = useAppDispatch()

    // const widgets = useAppSelector(state => state.widgets.list)
    // useEffect(() => {
    //     console.log('All widgets', widgets)
    // }, [widgets])

    useEffect(() => {
        getComponentList().then(list => {
            dispatch(setComponentList(list))
        })
        getComponentControllers().then(ctrls => {
            dispatch(setControllerList(ctrls))
        })
    }, [])

    return <div className="dragable-frame" onClick={() => {
        dispatch(setActivePath([]))
        dispatch(setWidgetActive(''))
    }}>
        <div className="left">
            <ComponentList />
        </div>
        <div className="right">
            <PreviewMobild />
        </div>
        <div className="ctrls" onClick={e => e.stopPropagation()}>
            <Controller />
        </div>
    </div >
}