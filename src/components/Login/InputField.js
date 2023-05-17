import './login.css';


function InputField({labelOfInputField, idOfInputField, additionalWritingAfterLabel}) {
  return (
    <div className="fw-600 mb-4">
        <label htmlFor={idOfInputField} className="form-label fw-600">
            {labelOfInputField}
        </label>
        <a className="float-end text-decoration-none darken-on-hover light-purple">
            {additionalWritingAfterLabel}
        </a>
        <input type="text" className="form-control" id={idOfInputField}/>
    </div>
  );
}

export default InputField;