import React, {useContext, useRef} from 'react';
import {useHttp} from "../hooks/http.hook";
import {ImagesContext} from "../context/ImagesContext";


export const UploadForm = () => {
    const {request} = useHttp();
    const refForm = useRef();
    const refInput = useRef();
    const imagesContext = useContext(ImagesContext);

    const sendForm = async e => {
        e.preventDefault();

        const formData = new FormData(refForm.current);
        try {
            const data = await request('/upload/image', 'POST', formData);
            refInput.current.value = '';

            imagesContext.getImage();
        }
        catch (e) {}
    };

    return (
        <div className="formBlock">
            <form method="POST" datatype="multipart/form-data" name="form-image" ref={refForm}>
                <input className="input-file" type="file" name="file" id="file" ref={refInput} required multiple/>
                <button className="btn-upload" type="submit" onClick={sendForm}>Загрузить</button>
            </form>
        </div>
    )

}
