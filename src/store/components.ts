import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TWidget } from '~/type'

const components = createSlice({
    name: 'components',
    initialState: {
        list: [] as TWidget[]
    },
    reducers: {
        addComponentToList: (state, action: PayloadAction<TWidget>) => {
            state.list.push(action.payload)
        },
        setComponentList: (state, action: PayloadAction<TWidget[]>) => {
            state.list = action.payload
        }
    }
})

export const { addComponentToList, setComponentList } = components.actions

export default components.reducer
