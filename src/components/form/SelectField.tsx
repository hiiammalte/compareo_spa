import { useField } from 'formik'
 
type PropsType = {
  label?: string,
  name: string,
  options: optionType[] | undefined
}

export type optionType = {
    value: string,
    key: string
}

function SelectField({label, name, options, ...rest }: PropsType) {

    const [ field, { error, touched }, helpers ] = useField({
        name: name,
        type: "select"
    });
    const { setValue, setTouched, setError } = helpers;
    const setFieldProps = (selectedOption: string) => {
        setValue(selectedOption) 
        setTouched(true)
        setError(undefined)
    }

    return (
        <div className="input-group">
            <label className="input-label-static">{ label }</label>
            <div className="select-group">
                <select className={`${error && touched && "invalid"}`} {...field} {...rest} onChange={(e) => setFieldProps(e.target.value)} >
                    {options && options.map(option => (
                        <option key={ option.value } value={ option.value }>{ option.key }</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default SelectField;