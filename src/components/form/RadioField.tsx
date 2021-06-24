import { useField } from 'formik'
import { optionType } from './SelectField';
 
type PropsType = {
  label: string,
  name: string,
  options: optionType[] | undefined,
  initialValue: string
}

function RadioField({label, name, options, initialValue, ...rest }: PropsType) {
    
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
            {options &&
                options.map(option => (
                    <label key={option.key} className={`radio-group ${error && touched && "invalid"}`} {...field} {...rest}>
                        <input type="radio" defaultChecked={option.value === initialValue} name={ name } value={ option.value } onChange={(e) => setFieldProps(e.target.value)} />
                        <span className="checkmark"></span>
                        <span className="radio-label">{ option.key }</span>
                    </label>
                ))
            }
            <label className="input-label-static">{ label }</label>
        </div>
    );
}

export default RadioField;