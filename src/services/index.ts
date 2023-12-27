import { TWidget, TController } from "~/type"

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
        {
            type: 'input',
            text: '单行文本输入',
            props: {
                title: '标题',
                value: '',
                placeholder: '',
                maxlength: 20,
            }
        }
    ] as TWidget[]
}

export const getComponentControllers = async () => {
    return [
        {
            type: 'grid',
            ctrls: [
                { prop: 'row', text: '行数', component: 'input-int', type: 'number', min: 1, max: 10 },
                { prop: 'col', text: '列数', component: 'input-int', type: 'number', min: 1, max: 10 },
            ]
        },
        {
            type: 'input',
            ctrls: [
                { prop: 'title', text: '标题', component: 'input-text', type: 'string', maxlength: 32 },
                { prop: 'placeholder', text: '水印', component: 'input-text', type: 'string', maxlength: 32 },
                { prop: 'value', text: '预设', component: 'input-text', type: 'string', maxlength: 512 },
                { prop: 'maxlength', text: '字数限制', component: 'input-int', type: 'number', min: 1, max: 512 },
            ]
        }
    ] as TController[]
}