import React from 'react';

function ImgField({ name, text, id, value, handleChange}) {
    const [imageBlob, setImageBlob] = React.useState('');

    const onImageChange = (event) => {
        event.preventDefault();
        const fr = new FileReader();
        const img = event.target.files[0];
        fr.onload = () => {
            setImageBlob(fr.result);
            handleChange(fr.result);
        }

        fr.readAsDataURL(img);
    }

    const placeImage = () => {
        if (!imageBlob) {
            return '';
        }
        return (
            <div className='d-flex justify-content-center'>
                <img alt="avatar" src={imageBlob} className="rounded-circle register-avatar" />
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