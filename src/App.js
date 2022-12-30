import React, { useState } from 'react';
import PhotoEditor from './components/photoStudio/main';
import Header from './components/header';
import Gallery from './components/Gallery';
import 'react-image-crop/dist/ReactCrop.css';


function App() {
  const [edit, setEdit] = useState(false)
  const editClic = () => {
    setEdit(prevState => !prevState)
  }
  return (
    <div>
      <div>
        {!edit ? <div>
          <Header />
          <div className='home-body' style={{ display: "flex" }}>
            <Gallery handleEditClic={editClic} />
          </div>
        </div> :
          <PhotoEditor handleEditClic={editClic} />}
      </div>
    </div>
  );
}

export default App;























