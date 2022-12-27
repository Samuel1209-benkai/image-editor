
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUrl } from '../features/imageSlice';
import { addPicture, incrementAmount } from '../features/GalerySlice';


function Gallery(props) {
    const dispatch = useDispatch()
    const edit = props.handleEditClic
    const { galeryItems, amount } = useSelector((state) => state.galery)
    const [model, setModel] = useState(false);
    const [tempimgSrc, setTempImgSrc] = useState('')

    const getImg = (image) => {
        setTempImgSrc(image)
        // dispatch(getUrl(image))
    }

    const imageHandle = (e) => {
        if (e.target.files.length !== 0) {
            const reader = new FileReader()
            reader.onload = () => {
                const ImageGallery= ({    
                    id: amount ,
                    imageUrl :  reader.result
                })
                dispatch(addPicture(ImageGallery))
                dispatch(incrementAmount())
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const gallery = galeryItems.map((url) => {
        return (
            <div key={url.id} className='image-container' onClick={() => getImg(url.imageUrl)}>
                <img 
                    className='singleImage'
                    src={url.imageUrl}
                    alt=""
                    style={{ width: "100%" }}
                />
                <button onClick={props.handleEditClic} className="hide">edit</button>
            </div>
        )
    })
    return (
        <>
            {amount < 1 ? <div className='image-upload' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <div className='editor'>
                    <div className='image-view' style={{ backgroundColor: 'white' }}>
                        <div className='image'>
                            <label htmlFor='choose'> <h1>Your Galery</h1>
                                <p>is currently empry</p>
                                <div className='upload-button'>
                                    Upload Media
                                </div></label>
                        </div>
                        <div className='image-upload'>
                            <label htmlFor='choose' >
                                <input
                                    type="file"
                                    id='choose'
                                    placeholder=''
                                    onChange={imageHandle}
                                />
                            </label>
                        </div>
                    </div></div>
                </div>
                : <div><div className={model ? "model-open" : "model"}>
                    <img src={tempimgSrc} alt='' />
                    <FontAwesomeIcon icon={faXmark} className="close" onClick={() => { setModel(false) }} />
                </div>
                    <div className='gallery-container'>
                        {gallery}
                    </div></div>}
        </>
    )
}

export default Gallery


