import {useRef} from "react";
import {useState} from "react";
import ButtonToShowPassword from "./ButtonToShowPassword";
import "./PasswordInputField.css";

function PasswordInputField({labelOfInputField, idOfInputField, updateFunction}) {
    const inputReference = useRef(null);
    
    const [inputType, setInputType] = useState("password");
    const showOrHidePassword = () => {
        if (inputType === "password") {
            setInputType("text");
        } else {
            setInputType("password");
        }
    }



    const [classNameOfDivOfInputAndButton, setClassNameOfDivOfInputAndButton]
                = useState("input-group form-control p-0");

    const onFocusFunction = () => {
        setClassNameOfDivOfInputAndButton("input-group form-control p-0 highlited-border");
    }

    const onBlurFunction = () => {
        setClassNameOfDivOfInputAndButton("input-group form-control p-0");
    }



    
    return (
        <div className="fw-600 mb-4">
            <label htmlFor={idOfInputField} className="form-label fw-600">
                {labelOfInputField}
            </label>
        
            <div className="row">
                <div className="col">
                    <div className={classNameOfDivOfInputAndButton}>
                        <input 
                            type={inputType}
                            className="form-control m-0 border-0"
                            id={idOfInputField}
                            ref={inputReference}
                            onFocus={onFocusFunction}

                            onChange={() => updateFunction(inputReference.current.value)}
                            onBlur={onBlurFunction}
                        />
                        <ButtonToShowPassword showOrHidePassword={showOrHidePassword} />
                    </div>
                </div>
            </div>
        </div>
  );
}

export default PasswordInputField;