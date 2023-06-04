import {useState} from "react";


function ButtonToShowPassword({showOrHidePassword}) {
    const [icon, setIcon] = useState("bi bi-eye");
    
    const onClickFunction = (event) => {
        event.preventDefault();
        showOrHidePassword();

        if (icon === "bi bi-eye") {
            setIcon("bi bi-eye-slash");
        }
        else {
            setIcon("bi bi-eye");
        }
    }

    return (
        <button
            className="btn"
            type="button"
            onClick={onClickFunction}
        >
            <i className={icon}></i>

        </button>
    );
}

export default ButtonToShowPassword;