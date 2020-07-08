import React, {useCallback, useContext} from "react";
import {useHttp} from "../hooks/http.hook";
import {ImagesContext} from "../context/ImagesContext";

export const ImagesRow = ({ row }) => {
    const {request} = useHttp();
    const imagesContext = useContext(ImagesContext);

    const deleteImg = useCallback(async (imgName) => {
        try {
            const data = await request(`/images/${imgName}/delete`, 'POST');

            imagesContext.getImage();
        } catch (e) {}
    },[imagesContext, request]);

    if (row.length <= 0) {
        return <p className="center">Проблемы с выгрузкой картинок!</p>
    }

    return (
        <div className="row">
            {row.map((image, index) => {
                const lengthRow = row.length - 1;
                const style = {
                      height: `${image.height}px`,
                      width: `${image.width}px`,
                      marginRight: lengthRow !== index ? `5px` : '0',
                      marginBottom: `2.5px`,
                }

                return (
                    <div className="image-block">
                        <img
                            src={image.filename}
                            className="image"
                            key={index}
                            style={style}
                            alt={`file-${index}`}
                        />
                        <div
                            className="btn-delete"
                            onClick={() => deleteImg(image.filename)}
                            style={{display: imagesContext.canDelete ? 'block' : 'none'}}
                        >X</div>
                    </div>
                )
            })}
        </div>
    )
}
