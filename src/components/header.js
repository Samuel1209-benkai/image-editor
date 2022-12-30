import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addPicture, incrementAmount } from '../features/GalerySlice';
import { select } from '../features/selectSlice';


function Header() {

  const dispatch = useDispatch()
  const { amount } = useSelector((state) => state.galery)
  const imageHandle = (e) => {
    if (e.target.files.length !== 0) {
      const reader = new FileReader()
      reader.onload = () => {
        const ImageGallery = ({
          id: amount,
          imageUrl: reader.result
        })
        dispatch(addPicture(ImageGallery))
        dispatch(incrementAmount())
        dispatch(select(ImageGallery.imageUrl));

      }
      reader.readAsDataURL(e.target.files[0])
    }
  }
  return (
    <div className='editor-head'>
      <div className='head-right-items'>
        <h3>Image Editor</h3>
      </div>
      <div className="upload-button">
        <label htmlFor='chooseimg' style={{ cursor:"pointer" }}>
          Upload Media
          <input className='image-upload'
            type="file"
            id='chooseimg'
            placeholder=''
            onChange={imageHandle}
          />
        </label>
      </div>

    </div>
  )
}

export default Header