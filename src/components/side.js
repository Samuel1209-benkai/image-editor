import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { addPicture, incrementAmount } from '../features/GalerySlice';

function Side(props) {
  const dispatch = useDispatch()
  const { galeryItems, amount } = useSelector((state) => state.galery)
  
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
          }}

  return (
    <nav>
      <div className="upload-button">
          <label htmlFor='chooseimg'>
            Upload Media
            <input className='image-upload'
              type="file"
              id='chooseimg'
              placeholder=''
              onChange={imageHandle}
            />
          </label>
      </div>
      
      <div className='Manage'>
        <p aria-disabled >MANAGE</p>
        <button className='' onClick={props.handleEditClic }>Edite image</button>
        <button className=''>Gallery</button>
      </div>
    </nav>

  )
}

export default Side
