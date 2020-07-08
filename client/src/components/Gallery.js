import React, {useEffect, useContext} from 'react';
import {Loader} from "./Loader";

import {ImagesList} from "./ImagesList";
import {ImagesContext} from "../context/ImagesContext";

export const Gallery = () => {
    const imagesContext = useContext(ImagesContext);

    useEffect(() => {
        imagesContext.getImage();
    }, [imagesContext.images.length]);

    if (imagesContext.loadingImages) {
        return <Loader />
    }

    return (
        <>
            {!imagesContext.loadingImages && <ImagesList images={imagesContext.images}/> }
        </>
    )
};
