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
    useAppSelector,
    setScreenSwitch,
} from './store'
import { parseWidgetForm } from './utils'


export default () => {

    const dispatch = useAppDispatch()

    const screenStatus = useAppSelector(state => state.screen.status)
    const widgets = useAppSelector(state => state.widgets.list)

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
            <div className='screen-tools'>
                <button onClick={() => {
                    dispatch(setScreenSwitch())
                }}>切换到{screenStatus === 'edit' ? `预览` : `编辑`}</button>
                <button onClick={() => {
                    const data = parseWidgetForm(widgets)
                    console.log(2222222, data)
                }}>导出表单数据</button>
            </div>
            <PreviewMobild />
        </div>
        <div className="ctrls" onClick={e => e.stopPropagation()}>
            <Controller />
        </div>
    </div >
}