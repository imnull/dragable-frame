import { useAppSelector } from '~/store'
import MAPPER from './mapper'
import { TOnMessage, TFormattedWidget } from '~/type'

export const Widget = (props: {
    path: number[],
    type: string,
}) => {
    const { path, type } = props
    const { [type]: C } = MAPPER
    if (C) {
        return <C path={[...path]} />
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
            const { type } = widget
            return <Widget type={type} path={[index]} key={widget.__id__} />
        })
    }</>
}

export default Render