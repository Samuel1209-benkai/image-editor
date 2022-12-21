
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
function Gallery(props) {

    const data = props.imgStore
    const [model, setModel] = useState(false);
    const [tempimgSrc, setTempImgSrc] = useState('')
    const getImg = (image) => {
        setTempImgSrc(image)
        setModel(true)
    }
    const gallery = data.map((url, index) => {
        return (
            <div key={index} className='image-container' onClick={() => getImg(url.imgSrc)}>
                <img
                    className='singleImage'
                    src={url.imgSrc}
                    alt=""
                    style={{ width: "100%" }}
                />
            </div>
        )
    })
    return (
        <>
            <div className={model ? "model-open" : "model"}>
                <img src={tempimgSrc} alt='' />
                <FontAwesomeIcon icon={faXmark} className="close" onClick={() => { setModel(false) }} />
            </div>
            <div className='gallery-container'>
                {gallery}
            </div>
        </>
    )
}

export default Gallery