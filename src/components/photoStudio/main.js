import React, { useState } from 'react'
import { AiOutlineRotateLeft, AiOutlineRotateRight } from 'react-icons/ai';
import { CgEditFlipH, CgEditFlipV } from 'react-icons/cg';
import { RiArrowGoBackFill, RiArrowGoForwardFill } from 'react-icons/ri';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { select } from '../../features/selectSlice';
import { toolCard } from './toolCard';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import storeData from './link';
import { useDispatch, useSelector } from 'react-redux';
import { addPicture, incrementAmount } from '../../features/GalerySlice';
import { useOnKeyPress } from '../keypress';


function PhotoEditor(props) {

    const url = useSelector(state => state.image.imgUrl)
    const dispatch = useDispatch()
    const [size, setSize] = useState({
        height: "",
        width: "",
    })
    const { amount } = useSelector((state) => state.galery)

    const [propity, setPropity] = useState(
        {
            name: "crop and resize",
            maxValue: 200,
        },)

    const [imgstate, setImgState] = useState(
        {
            image: url,
            Brightness: 100,
            Contrast: 100,
            Saturate: 100,
            Inversion:0,
            Grayscale:0,
            rotate: 0,
            vertical: 1,
            horizontal: 1,
        }
    )

    const [initialImage, setinitialImage] = useState({
        image: url,
        Brightness: 100,
        Contrast: 100,
        Saturate: 100,
        // Inversion:0,
        // Grayscale:0,
        rotate: 0,
        vertical: 1,
        horizontal: 1,
    })
    const [crop, setCrop] = useState(''
        // Start with initial crop but i have one probleme with this methode i resolve it later 
        //  ({
        //     unit: '%', // Can be 'px' or '%'
        //     x: 25,
        //     y: 25,
        //     width: 100,
        //     height: 100
        //   })
    );
    const [isCorp, setIsCrop] = useState(false)
    const [detail, setDetail] = useState('')

    // tool function 
    // rotate
    const leftRotate = () => {
        setImgState({
            ...imgstate,
            rotate: imgstate.rotate - 90
        })
        const imageData = imgstate
        imageData.rotate = imgstate.rotate - 90
        storeData.insert(imageData)
    }

    const rightRotate = () => {
        setImgState({
            ...imgstate,
            rotate: imgstate.rotate + 90
        })
        const imageData = imgstate
        imageData.rotate = imgstate.rotate + 90
        storeData.insert(imageData)
    }
    // flip
    const verticalFlip = () => {
        setImgState({
            ...imgstate,
            vertical: imgstate.vertical === 1 ? -1 : 1
        })
        const imageData = imgstate
        imageData.vertical = imgstate.vertical === 1 ? -1 : 1
        storeData.insert(imageData)
    }
    const horizontalFlip = () => {
        setImgState({
            ...imgstate,
            horizontal: imgstate.horizontal === 1 ? -1 : 1
        })
        const imageData = imgstate
        imageData.horizontal = imgstate.horizontal === 1 ? -1 : 1
        storeData.insert(imageData)
    }

    //crop 
    const imageCrop = () => {
        const canvas = document.createElement('canvas');
        const scaleX = detail.naturalWidth / detail.width
        const scaleY = detail.naturalHeight / detail.height
        canvas.width = crop.width
        canvas.height = crop.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(
            detail,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0, 0,
            crop.width,
            crop.height
        )
        const base64Url = canvas.toDataURL('image/jpg');
        setImgState({
            ...imgstate,
            image: base64Url,
        })
        const imageData = imgstate
        imageData.image = imgstate.image
        storeData.insert(imageData)
        setCrop(0);
        setIsCrop(false)
    }
    //keyListerner
    useOnKeyPress(imageCrop , 'Enter')

    // prev next state , reset and save function 
    const previous = () => {
        const data = storeData.prevEdit()
        if (data) {
            setImgState(data)
        }
    }

    const next = () => {
        const data = storeData.nextEdit()
        if (data) {
            setImgState(data)
        }
    }

    const saveImage = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')
        canvas.width = detail.naturalWidth
        canvas.height = detail.naturalHeight

        ctx.filter = `brightness(${imgstate.Brightness}%)
        contrast(${imgstate.Contrast}%) saturate(${imgstate.Saturate}%)`
        console.log(detail.height , detail.width)
        ctx.scale(1,1)
        ctx.translate = (canvas.width / 2, canvas.height / 2)
        ctx.rotate(imgstate.rotate * Math.PI /180) 
    //
        ctx.drawImage(
            detail,
            -canvas.width / 1000,
            -canvas.height / 1000,
            canvas.width,
            canvas.height
        )
        const link = document.createElement('a')
        // link.download = "image_edit.jpg"
        link.href = canvas.toDataURL()
        const ImageGallery = ({
            id: amount,
            imageUrl: link.href
        })
        dispatch(addPicture(ImageGallery))
        dispatch(select(ImageGallery.imageUrl));
        dispatch(incrementAmount())
        props.handleEditClic()
    }


    const resetImage = () => {
        setImgState({
            ...imgstate,
            image: initialImage.image,
            Brightness: 100,
            Contrast: 100,
            Saturate: 100,
            Inversion:0,
            Grayscale:0,
            rotate: 0,
            vertical: 1,
            horizontal: 1,
        })
    }

    // input handle Change function
    const inputHandle = (e) => {
        setImgState({
            ...imgstate,
            [e.target.name]: e.target.value,
        })
        const imageData = imgstate
        storeData.insert(imageData)
    }


    const imageHandle = (e) => {
        if (e.target.files.length !== 0) {
            const reader = new FileReader()
            reader.onload = () => {
                setImgState({
                    ...imgstate,
                    image: reader.result
                })
                setinitialImage({
                    ...initialImage,
                    image: reader.result
                }
                )
                const imageData = {
                    image: reader.result,
                    Brightness: 100,
                    Contrast: 100,
                    Saturate: 100,
                    Inversion:0,
                    Grayscale:0,
                    rotate: 0,
                    vertical: 1,
                    horizontal: 1,
                }
                storeData.insert(imageData)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }
    const sizeHandleChange = (e) => {
        setSize(
            {
                ...size,
                [e.target.name]: e.target.value,
            }
        )
    }
    // eslint-disable-next-line no-sequences
    const handleCrop = c => (setCrop(c), setIsCrop(true))


    // Card of editing tool sidebar
    const tool = toolCard.map((items) => {
        return (
            <button className={propity.name === items.name ? 'active' : ''}
                key={items.id} disabled={isCorp} onClick={() => setPropity(items)}>{items.icone} {items.name} </button>
        )
    })

    return (
        <div>
            {/* header */}
            <div className='editor-head'>
                <div className='head-right-items'>
                    <h3>Photo Studio</h3>
                </div>
                <div className='head-left-items'>
                    <div className="revert">
                        <button onClick={resetImage}>Revert to Original</button>
                    </div>
                    <div className='aioutline-button'>
                        <button onClick={previous}><RiArrowGoBackFill className='aiOutlineCloseButton space' /></button>
                        <button onClick={next}><RiArrowGoForwardFill className='aiOutlineCloseButton space' /></button>
                    </div>
                    <div>
                        <button className='cancel-button' onClick={props.handleEditClic} >Cancel</button>
                        <button className='Save-button' onClick={saveImage}> Save</button>
                    </div>
                </div>
            </div>

            {/* body  */}
            <div className='editor-body'>
                {/* Editing-tool-items */}
                <div className='Editing-tool'>
                    <h3>Editing tools</h3>
                    <div className='top-tool-items'>
                        {tool}
                    </div> 
                    <div className='bottom-tool-items' >
                        <h4>Rotate anf Flip</h4>
                        <button className='rotate-button' onClick={leftRotate} disabled={isCorp} > <AiOutlineRotateLeft /></button>
                        <button className='rotate-button r-button' onClick={rightRotate} disabled={isCorp}> <AiOutlineRotateRight /></button>
                        <button className='rotate-button r-button' onClick={verticalFlip} disabled={isCorp}> <CgEditFlipH /></button>
                        <button className='rotate-button r-button' onClick={horizontalFlip} disabled={isCorp}> <CgEditFlipV /></button>
                    </div>
                </div>
                {/* image-editor-view */}
                <div className='editor'>
                    <div className='image-view'>
                        <div className='image'>
                            {
                                imgstate.image ?
                                    <div>
                                        {propity.name === 'crop and resize' ? <ReactCrop crop={crop} onChange={handleCrop}  >
                                            <img onLoad={(e) => setDetail(e.currentTarget)}
                                                style={{
                                                    filter: `brightness(${imgstate.Brightness}%)
                            contrast(${imgstate.Contrast}%) saturate(${imgstate.Saturate}%) invert(${imgstate.Inversion}) grayscale(${imgstate.Grayscale})` ,
                                                    transform:`rotate(${imgstate.rotate}deg) scale(${imgstate.vertical},${imgstate.horizontal})`,
                                                    height: `${size.height}px`,
                                                    width: `${size.width}px`,
                                                }} src={imgstate.image} alt='imge' />
                                        </ReactCrop> :
                                            <img onLoad={(e) => setDetail(e.currentTarget)}
                                                style={{
                                                    filter: `brightness(${imgstate.Brightness}%)
                    contrast(${imgstate.Contrast}%) saturate(${imgstate.Saturate}%)  invert(${imgstate.Inversion}) grayscale(${imgstate.Grayscale})`,
                                                    transform: `rotate(${imgstate.rotate}deg) scale(${imgstate.vertical},${imgstate.horizontal})`,
                                                    height: `${size.height}px`,
                                                    width: `${size.width}px`,
                                                }} src={imgstate.image} alt='imge' />}
                                    </div> :
                                    <label htmlFor='choose' style={{ height:"75vh" }}> Choose image</label>
                            }
                        </div>
                        <div className='image-upload'>
                            <label htmlFor='choose' >
                                <input
                                    type="file"
                                    id='choose'
                                    placeholder=''
                                    onChange={imageHandle} />
                            </label>
                        </div>
                    </div>
                    {/* tool-proprity */}
                    <div className='crop-resize'>
                        {propity.name === "crop and resize" ? <div><h4>Crop and Resize</h4> <div className='crop-and-resize'>
                            <div className='crop-prop' >
                                <h5>Crop: </h5>
                                <button className='crop-button' onClick={imageCrop} > Crop image </button>
                            </div>
                            <div className='resize-prop' style={{ display: "none" }}>
                                <h5>Images size (px)</h5>
                                <form className='size-form'>
                                    <label className='width-label'>
                                        w : <input name="width" value={size.width} onChange={sizeHandleChange} className='size' type="text" />
                                    </label>
                                    <label className='heigth-label'>
                                        H : <input name="height" value={size.height} onChange={sizeHandleChange} className='size' type="text" />
                                    </label>
                                    <button className="resize-button">Resize image</button>
                                </form>
                            </div>
                        </div></div> :
                            <div className='label-bar'>
                                <label htmlFor='range' style={{display:'flex' ,  justifyContent:'space-between'}}> <span>{propity.name} </span> <span>{imgstate[propity.name]} %</span></label>
                                <input name={propity.name}
                                    onChange={inputHandle}
                                    disabled={isCorp}
                                    type="range"
                                    value={imgstate[propity.name]}
                                    max={propity.maxValue} />
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhotoEditor