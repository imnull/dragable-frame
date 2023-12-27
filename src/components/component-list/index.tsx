import './index.scss'
import { useAppSelector } from '~/store'



export default () => {
    const list = useAppSelector(state => state.components.list)
    return <div className="component-list">{
        list.map((item, index) => <div className="item" key={index} draggable onDragStart={e => e.dataTransfer.setData('text/plain', JSON.stringify(item))}>
            <div className="thumb"></div>
            <div className="name">{item.text}</div>
        </div>)
    }</div>
}