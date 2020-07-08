import React, {useContext, useEffect, useState} from "react";
import {ImagesRow} from "./ImagesRow";
import utils from "../utils";

export const ImagesList =  ({ images }) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        setRows(utils.setupRows(images));
    },[images])

    if (!images.length) {
        return <p className="center">Все картинки были удалены!</p>
    }

    return (
        <div className="images-block">
            {
                rows.map((row, index) => {
                    return (
                        <ImagesRow row={row} key={index}/>
                    )
                })
            }
        </div>
    );
};
