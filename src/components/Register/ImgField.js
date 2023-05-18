import React from 'react';

function ImgField({ name, text, id, value, handleChange}) {
    const [image, setImage] = React.useState(null)

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }

        handleChange(event);
    }

    const placeImage = () => {
        if (!image) {
            return '';
        }
        return (
            <div className='d-flex justify-content-center'>
                <img src={image} className="rounded-circle register-avatar" alt='avatar' /><img />
            </div>
        );
    }
            

    return (
        <div className="fw-600 mb-4">
            {/* <img src={image} className="rounded-circle" alt="avatar" /> */}
            <label htmlFor={"register-" + name} className="form-label">
                {text}
            </label>
            <input type="file" name={name}
                className="form-control input filetype mb-4"
                    id={id} value={value} 
                onChange={onImageChange} accept="image/*"
            />

            {placeImage()}
        </div>
    );
}

export default ImgField;