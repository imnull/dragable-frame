import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import widgets from './widgets'
export { addWidgetToList, setWidgetActive, addIndexedWidgetByPath, flashWidgets, removeWidgetByPath, setActivePath, changeWidgetProp } from './widgets'

import components from './components'
export { addComponentToList, setComponentList } from './components'

import controllers from './controllers'
export { setControllerList } from './controllers'

const store = configureStore({
    reducer: {
        widgets,
        components,
        controllers,
    }
})

type AppDispatch = typeof store.dispatch
type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store