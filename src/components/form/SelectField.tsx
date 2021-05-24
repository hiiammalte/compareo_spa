import { useField } from 'formik'
 
type PropsType = {
  label?: string,
  name: string,
  options: optionsType
}

export type optionsType = {
    value: string,
    label: string
}[]

function SelectField({label, name, options, ...rest }: PropsType) {
    const [ field, meta, helpers ] = useField({
        name: name
    });

    return (
        <div className="input-group">
            <label className="input-label-static">Category</label>
            <div className="select-group">
                <select>
                    {options && options.map(option => (
                        <option value={ option.value }>{ option.label }</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default SelectField;