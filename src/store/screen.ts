import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const slice = createSlice({
    name: 'screen',
    initialState: {
        status: 'edit' as 'edit' | 'preview',
    },
    reducers: {
        setScreenPreview: (state) => {
            state.status = 'preview'
        },
        setScreenEdit: (state) => {
            state.status = 'edit'
        },
        setScreenSwitch: (state) => {
            state.status = state.status === 'preview' ? 'edit' : 'preview'
        },
    }
})

export const { setScreenPreview, setScreenEdit, setScreenSwitch } = slice.actions

export default slice.reducer
