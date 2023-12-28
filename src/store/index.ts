import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import widgets from './widgets'
export { addWidgetToList, setWidgetActive, addIndexedWidgetByPath, flashWidgets, removeWidgetByPath, setActivePath, changeWidgetProp, changeWidgetFormValue } from './widgets'

import components from './components'
export { addComponentToList, setComponentList } from './components'

import controllers from './controllers'
export { setControllerList } from './controllers'

import screen from './screen'
export { setScreenEdit, setScreenPreview, setScreenSwitch } from './screen'

const store = configureStore({
    reducer: {
        widgets,
        components,
        controllers,
        screen,
    }
})

type AppDispatch = typeof store.dispatch
type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store