import { useField } from 'formik';
 
type PropsType = {
  label?: string,
  name: string,
}

function CompactCheckbox({label, name, ...rest }: PropsType) {
    const [ field ] = useField({
        name: name,
        type: 'checkbox'
    });

    return (
        <div className="input-group input-group-compact">
            <label className="compact-checkbox-group">
                <input type="checkbox" {...field} {...rest} checked={field.checked}/>
                <span className="checkmark"></span>
                <span className="checkbox-label">{ label }</span>
            </label>
        </div>
    );
}

export default CompactCheckbox;