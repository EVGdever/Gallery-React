import React, {useCallback, useEffect, useState} from 'react';
import {Gallery} from "./components/Gallery";
import {UploadForm} from "./components/UploadForm";
import {ImagesContext} from "./context/ImagesContext";
import {useHttp} from "./hooks/http.hook";


function App() {
    const {request, loading} = useHttp();
    const [images, setImages] = useState([]);
    const [canDelete, setCanDelete] = useState(true);

    const getImage = useCallback(async () => {
        try {
            const data = await request(`/images/all`, 'GET');

            setImages(data);
            if (data[0].filename.indexOf('https://')) {
                setCanDelete(true);
            } else {
                setCanDelete(false);
            }
        } catch (e) {}
    }, [request, setImages]);

    useEffect(() => {
        getImage();
    }, []);

    return (
        <ImagesContext.Provider value={{
            images,
            setImages,
            getImage,
            canDelete,
            loadingImages: loading
        }}>
            <section className="center">
                <div className="container">
                    <UploadForm/>
                    <Gallery/>
                </div>
            </section>
        </ImagesContext.Provider>
    );
}

export default App;
