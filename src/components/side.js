import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Side(props) {
  return (

    <nav>
      <div className="upload-button">
        <div>
          <h1>LOGO</h1>
          {/* <label htmlFor='choose' >
            Upload Media
            <input className='image-upload'
              type="file"
              id='choose'
              placeholder=''
            />
          </label> */}
        </div>
      </div>
      <div className='Manage'>
        <p aria-disabled >MANAGE</p>
        <button className='' onClick={props.handleEditClic}>Edite image</button>
        <button className=''>Gallery</button>
      </div>
    </nav>

  )
}

export default Side