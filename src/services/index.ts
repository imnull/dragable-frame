import { TWidget, TController } from "~/type"

export const getComponentList = async () => {
    return [
        {
            type: 'text',
            text: '文本',
            props: {
                text: '文本内容',
                type: 'text',
                url: '',
                ellipsis: false,
                titleLevel: 5,
                target: '_blank',
                color: '#000000',
                fontSize: 14,
            }
        },
        {
            type: 'col1',
            text: '通栏',
        },
        {
            type: 'col2',
            text: '一行2列',
        },
        {
            type: 'form',
            text: '表单',
        },
        {
            type: 'coln',
            text: '一行n列',
            props: {
                col: 2,
            },
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
            text: '单行文本',
            props: {
                title: '展示标题',
                value: '',
                placeholder: '请输入内容',
                formName: 'input',
                maxlength: 20,
            }
        },
        {
            type: 'textarea',
            text: '多行文本',
            props: {
                title: '展示标题',
                value: '',
                placeholder: '请输入内容',
                formName: 'input',
                maxlength: 70,
                rows: 4,
            }
        },
        {
            type: 'select',
            text: '单选下拉',
            props: {
                formName: 'input',
                title: '展示标题',
                value: 'lucy',
                options: 'Jack::jack\nLucy::lucy\nYiminghe::yiminghe::0\nDisabled::disabled::1'
            }
        },
        {
            type: 'checkbox',
            text: 'CheckBox',
            props: {
                formName: 'input',
                label: '说明',
                value: '',
                checked: false,
            }
        },
        {
            type: 'checkbox-group',
            text: '多选',
            props: {
                formName: 'input',
                title: '展示标题',
                value: '',
                options: 'Jack::jack\nLucy::lucy\nYiminghe::yiminghe::0\nDisabled::disabled::1'
            }
        },
        {
            type: 'radio',
            text: 'Radio',
            props: {
                formName: 'input',
                label: '说明',
                value: '',
                checked: false,
            }
        },
        {
            type: 'radio-group',
            text: '单选',
            props: {
                formName: 'input',
                title: '展示标题',
                value: '',
                options: 'Jack::jack\nLucy::lucy\nYiminghe::yiminghe::0\nDisabled::disabled::1'
            }
        },
    ] as TWidget[]
}

export const getComponentControllers = async () => {
    return [
        {
            type: 'coln',
            ctrls: [
                { prop: 'formName', text: '表单名称', component: 'input-text', type: 'string', maxlength: 32 },
                { prop: 'col', text: '列数', component: 'input-slider', type: 'number', min: 1, max: 12 },
            ]
        },
        {
            type: 'grid',
            ctrls: [
                { prop: 'row', text: '行数', component: 'input-slider', type: 'number', min: 1, max: 10 },
                { prop: 'col', text: '列数', component: 'input-slider', type: 'number', min: 1, max: 10 },
            ]
        },
        {
            type: 'input',
            ctrls: [
                { prop: 'formName', text: '表单名称', component: 'input-text', type: 'string', maxlength: 32 },
                { prop: 'title', text: '标题', component: 'input-text', type: 'string', maxlength: 32 },
                { prop: 'placeholder', text: '水印', component: 'input-text', type: 'string', maxlength: 32 },
                { prop: 'value', text: '预设', component: 'input-text', type: 'string', maxlength: 512 },
                { prop: 'maxlength', text: '字数限制', component: 'input-int', type: 'number', min: 1, max: 512 },
            ]
        },
        {
            type: 'select',
            ctrls: [
                { prop: 'formName', text: '表单名称', component: 'input-text', type: 'string', maxlength: 32 },
                { prop: 'title', text: '标题', component: 'input-text', type: 'string', maxlength: 32 },
                { prop: 'value', text: '默认值', component: 'input-text', type: 'string', maxlength: 128 },
                { prop: 'options', text: '选项数据', component: 'input-textarea', type: 'json' },
            ]
        },
        {
            type: 'textarea',
            ctrls: [
                { prop: 'formName', text: '表单名称', component: 'input-text', type: 'string', maxlength: 32 },
                { prop: 'title', text: '标题', component: 'input-text', type: 'string', maxlength: 32 },
                { prop: 'placeholder', text: '水印', component: 'input-text', type: 'string', maxlength: 32 },
                { prop: 'value', text: '预设', component: 'input-text', type: 'string', maxlength: 512 },
                { prop: 'rows', text: '行数', component: 'input-slider', type: 'number', min: 2, max: 20 },
                { prop: 'maxlength', text: '字数限制', component: 'input-int', type: 'number', min: 1, max: 512 },
            ]
        },
        {

            type: 'checkbox',
            ctrls: [
                { prop: 'formName', text: '表单名称', component: 'input-text', type: 'string', maxlength: 32 },
                { prop: 'label', text: '说明', component: 'input-text', type: 'string', maxlength: 32 },
                { prop: 'value', text: '值', component: 'input-text', type: 'string', maxlength: 512 },
                { prop: 'checked', text: '是否选中', component: 'input-checkbox', type: 'boolean' },
            ]
        },
        {

            type: 'radio',
            ctrls: [
                { prop: 'formName', text: '表单名称', component: 'input-text', type: 'string', maxlength: 32 },
                { prop: 'label', text: '说明', component: 'input-text', type: 'string', maxlength: 32 },
                { prop: 'value', text: '值', component: 'input-text', type: 'string', maxlength: 512 },
                { prop: 'checked', text: '是否选中', component: 'input-checkbox', type: 'boolean' },
            ]
        },
        {

            type: 'text',
            ctrls: [
                [
                    { prop: 'type', text: '类型', component: 'input-select', type: 'string', options: [{ value: 'text', label: '文本' }, { value: 'title', label: '标题' }, { value: 'link', label: '链接' }] },
                    { prop: 'color', text: '文本颜色', component: 'input-color', type: 'string' },
                ],
                { prop: 'fontSize', text: '字号', component: 'input-slider', type: 'number', min: 9, max: 72, if: "type!=title" },
                { prop: 'titleLevel', text: '标题大小', component: 'input-select', type: 'number', if: "type==title", options: [{ value: 1, label: 'H1' }, { value: 2, label: 'H2' }, { value: 3, label: 'H3' }, { value: 4, label: 'H4' }, { value: 5, label: 'H5' }] },
                { prop: 'text', text: '内容', component: 'input-textarea', type: 'string', maxlength: 0 },
                { prop: 'ellipsis', text: '文本溢出', component: 'input-checkbox', type: 'boolean', if: "type!=link" },
                { prop: 'url', text: '地址', component: 'input-text', type: 'string', maxlength: 0, if: "type==link" },
            ]
        },
        {
            type: 'checkbox-group',
            ctrls: [
                { prop: 'formName', text: '表单名称', component: 'input-text', type: 'string', maxlength: 32 },
                { prop: 'title', text: '标题', component: 'input-text', type: 'string', maxlength: 32 },
                { prop: 'value', text: '默认值', component: 'input-text', type: 'string', maxlength: 128 },
                { prop: 'options', text: '选项数据', component: 'input-textarea', type: 'json' },
            ]
        },
        {
            type: 'radio-group',
            ctrls: [
                { prop: 'formName', text: '表单名称', component: 'input-text', type: 'string', maxlength: 32 },
                { prop: 'title', text: '标题', component: 'input-text', type: 'string', maxlength: 32 },
                { prop: 'value', text: '默认值', component: 'input-text', type: 'string', maxlength: 128 },
                { prop: 'options', text: '选项数据', component: 'input-textarea', type: 'json' },
            ]
        },
    ] as TController[]
}