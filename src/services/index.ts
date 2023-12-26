import { TController } from "~/controllers"
import { TWidget } from "~/utils"

export const getComponentList = async () => {
    return [
        {
            type: 'col1',
            text: '通栏',
        },
        {
            type: 'col2',
            text: '一行2列',
        },
        {
            type: 'grid',
            text: 'Grid布局',
            props: {
                row: 2,
                col: 3
            },

        },
    ] as TWidget[]
}

export const getComponentControllers = async () => {
    return [
        {
            type: 'grid',
            ctrls: [
                { prop: 'row', text: '行数', component: 'int-input', type: 'number', min: 1, max: 10 },
                { prop: 'col', text: '列数', component: 'int-input', type: 'number', min: 1, max: 10 },
            ]
        }
    ] as TController[]
}