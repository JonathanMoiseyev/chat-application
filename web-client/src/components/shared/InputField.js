import {useRef} from "react";

function InputField({labelOfInputField, idOfInputField, updateFunction, inputType}) {
    const inputReference = useRef(null);

    return (
    <div className="fw-600 mb-4">
        <label htmlFor={idOfInputField} className="form-label fw-600">
            {labelOfInputField}
        </label>
        <input
            type={inputType}
            className="form-control"
            id={idOfInputField}
            ref={inputReference}

            onChange={() => updateFunction(inputReference.current.value)}
        />
    </div>
  );
}

export default InputField;