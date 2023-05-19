import './login.css';
import {useRef} from "react";

function InputField({labelOfInputField, idOfInputField, updateFunction, additionalWritingAfterLabel}) {
    const inputReference = useRef(null);

    return (
    <div className="fw-600 mb-4">
        <label htmlFor={idOfInputField} className="form-label fw-600">
            {labelOfInputField}
        </label>
        <a className="float-end text-decoration-none darken-on-hover light-purple">
            {additionalWritingAfterLabel}
        </a>
        <input 
            type="text"
            className="form-control"
            id={idOfInputField}
            ref={inputReference}

            onChange={() => updateFunction(inputReference.current.value)}
        />
    </div>
  );
}

export default InputField;