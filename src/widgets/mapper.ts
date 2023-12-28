import Col1 from './col1'
import Col2 from './col2'
import ColN from './col-n'
import Grid from './grid'
import Input from './input'
import Form from './form'
import Select from './select'
import TextArea from './textarea'
import Text from './text'
import Checkbox from './checkbox'
import CheckboxGroup from './checkbox-group'
import Radio from './radio'
import RadioGroup from './radio-group'

export default {
    col1: Col1,
    col2: Col2,
    coln: ColN,
    grid: Grid,
    input: Input,
    form: Form,
    select: Select,
    textarea: TextArea,
    text: Text,
    checkbox: Checkbox,
    'checkbox-group': CheckboxGroup,
    radio: Radio,
    'radio-group': RadioGroup,
} as Record<string, any>