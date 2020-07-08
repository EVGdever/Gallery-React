import {createContext} from 'react';

function noop() {}

export const ImagesContext = createContext({
    images: null,
    loadingImages: null,
    canDelete: null,
    setImages: noop,
    getImage: noop,
});
