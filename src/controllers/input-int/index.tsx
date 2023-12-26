
export default (props: {
    text?: string
    prop?: string
    value?: any
    widgetId?: string
    onPropsChange: (id: string, prop: string, value: any) => void
    min?: number
    max?: number
}) => {
    const { value = 0, min = 0, max = 9, text = '', onPropsChange, widgetId, prop = '' } = props
    return <div className="controller int-input">
        <span>{text}</span>
        <input type="number" min={min} max={max} value={value} onChange={e => {
            const val = e.target.value
            prop && widgetId && typeof onPropsChange === 'function' && onPropsChange(widgetId, prop, val)
        }} />
    </div>
}