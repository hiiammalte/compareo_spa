import { useField } from 'formik';
 
type PropsType = {
    label: string,
    name: string,
}
 
function CheckboxField({label, name, ...rest }: PropsType) {
    const [ field ] = useField({
        name: name,
        type: "checkbox",
    });

    return (
        <label className="checkbox-group">
            <input type="checkbox" {...field} {...rest} checked={field.checked}/>
            <span className="checkmark"></span>
            <span className="checkbox-label">{ label }</span>
        </label>
    );
};
 
export default CheckboxField;