import { useField } from 'formik';
 
type PropsType = {
  label?: string,
  name: string,
  placeholder?: string,
  type: "text" | "email" | "password" | "number"
}
 
function InputField({label, name, placeholder, type, ...rest }: PropsType) {
  const [ field, { error, touched } ] = useField({
    name: name,
    type: type,
  });

  return (
    <div className="input-group">
        <input className={`${error && touched && "invalid"}`} {...field} {...rest} /> 
        <label className="input-label" htmlFor={name}>{ label }</label>
    </div>
  );
};
 
export default InputField;