import { useAppSelector } from '~/store'
import MAPPER from './mapper'
import { TRect } from '~/type'

export const Widget = (props: {
    path: number[],
    type: string,
    dragging?: boolean,
}) => {
    const { path, type, dragging = false } = props
    const { [type]: C } = MAPPER
    if (C) {
        return <div className='widget-wrapper'>
            <C path={[...path]} />
            {dragging ? <div className='widget-frame'></div> : null}
        </div>
    } else {
        return null
    }
}

const Render = () => {
    const widgets = useAppSelector(state => state.widgets.list)
    return <>{
        widgets.map((widget, index) => {
            if (!widget) {
                return null
            }
            const { type, dragging = false, rect } = widget
            return <Widget type={type} dragging={dragging} path={[index]} key={widget.__id__} />
        })
    }</>
}

export default Render