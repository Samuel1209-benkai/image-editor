
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUrl } from '../features/imageSlice';


function Gallery(props) {
    const dispatch = useDispatch()
    const edit = props.handleEditClic
    const {galeryItems, amount} = useSelector((state)=>state.galery)
    const [model, setModel] = useState(false);
    const [tempimgSrc, setTempImgSrc] = useState('')
    const getImg = (image) => {
        setTempImgSrc(image)
        dispatch(getUrl(image))
        
    }


    const gallery = galeryItems.map((url) => {
        return (
            <div key={url.id} className='image-container' onClick={() => getImg(url.imageUrl)}>
                <img onClick={props.handleEditClic}
                    className='singleImage'
                    src={url.imageUrl}
                    alt=""
                    style={{ width: "100%" }}
                />
            </div>
        )
    })
    return (
        <>
            {amount<1 ? <div style={{ display:'flex', flexDirection:'column' , alignItems:'center' , justifyContent:'center', width:'100%'  }}>
                <h1>Your Galery</h1>    
                <p>is currently empry</p>
            </div>
            :<div><div className={model ? "model-open" : "model"}>
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