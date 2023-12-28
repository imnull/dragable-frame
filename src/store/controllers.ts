import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TController } from '~/type'

const slice = createSlice({
    name: 'controllers',
    initialState: {
        list: [] as TController[]
    },
    reducers: {
        setControllerList: (state, action: PayloadAction<TController[]>) => {
            state.list = action.payload
        }
    }
})

export const { setControllerList } = slice.actions

export default slice.reducer
