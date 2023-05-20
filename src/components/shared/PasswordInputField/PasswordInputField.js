import {useRef} from "react";
import {useState} from "react";
import ButtonToShowPassword from "./ButtonToShowPassword";

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



    return (
        <div className="fw-600 mb-4">
            <label htmlFor={idOfInputField} className="form-label fw-600">
                {labelOfInputField}
            </label>
        

        <div className="row">
            <div className="col">
                <div className="input-group form-control p-0">
                    <input 
                        type={inputType}
                        className="form-control m-0 border-0"
                        id={idOfInputField}
                        ref={inputReference}
                
                        onChange={() => updateFunction(inputReference.current.value)}
                    />
                    <div className="input-group-btn">
                        <ButtonToShowPassword showOrHidePassword={showOrHidePassword} />
                    </div>
                </div>
            </div>
        </div>
        </div>
  );
}

export default PasswordInputField;