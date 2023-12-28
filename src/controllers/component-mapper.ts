import InputInt from './input-int'
import InputText from './input-text'
import InputTextArea from './input-textarea'
import InputCheckbox from './input-checkbox'
import InputSelect from './input-select'
import InputColor from './input-color'
import InputSlider from './input-slider'

const mapper = {
    'input-int': InputInt,
    'input-text': InputText,
    'input-textarea': InputTextArea,
    'input-checkbox': InputCheckbox,
    'input-select': InputSelect,
    'input-color': InputColor,
    'input-slider': InputSlider,
} as Record<string, any>

export default mapper