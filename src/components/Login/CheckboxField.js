function CheckboxField({tytleOfCheckboxField, idOfCheckboxField}) {
    return (
        <div className="form-check fw-600 mb-4">
            <input
                type="checkbox"
                className="form-check-input"
                id={idOfCheckboxField}
            />
            <label
                className="form-check-label small"
                htmlFor={idOfCheckboxField}
            >
                {tytleOfCheckboxField}
            </label>
        </div>
    );
  }
  
  export default CheckboxField;