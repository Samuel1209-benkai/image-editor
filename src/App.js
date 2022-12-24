
import React, { useState } from 'react';    
import PhotoEditor from './components/photoStudio/main';
import Side from './components/side';
import Header from './components/header';
import Gallery from './components/Gallery';
import storeData from './components/photoStudio/link';
import { AiOutlineRotateLeft, AiOutlineRotateRight } from 'react-icons/ai';
import { CgEditFlipH, CgEditFlipV } from 'react-icons/cg';
import { RiArrowGoBackFill, RiArrowGoForwardFill } from 'react-icons/ri';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { toolCard } from './components/photoStudio/toolCard';
import ReactCrop from 'react-image-crop';
// import Resizer from "react-image-file-resizer"; 
import 'react-image-crop/dist/ReactCrop.css';
import { useSelector } from 'react-redux';



function App() {

  const [edit, setEdit] = useState(false)
  const editClic = () => { setEdit(prevState => !prevState) }


    
    
      const data = [
        {
          id: 1,
          imgSrc: "https://img.20mn.fr/lHjeCGX4SmKymdjPvhQyAik/1200x768_google-illustration",
        },
    
        {
          id: 3,
          imgSrc: "https://semji.com/wp-content/uploads/2020/07/histoire-de-google-700x300.png",
        },
        {
          id: 4,
          imgSrc: "https://pic.clubic.com/v1/images/1862615/raw?fit=max&width=1200&hash=3b0c35819f6e4f879bd826ad6a85a87428ad512d",
        },
    
        {
          id: 6,
          imgSrc: "https://img.20mn.fr/lHjeCGX4SmKymdjPvhQyAik/1200x768_google-illustration",
        },
    
        {
          id: 8,
          imgSrc: "https://semji.com/wp-content/uploads/2020/07/histoire-de-google-700x300.png",
        },
        {
          id: 9,
          imgSrc: "https://pic.clubic.com/v1/images/1862615/raw?fit=max&width=1200&hash=3b0c35819f6e4f879bd826ad6a85a87428ad512d",
        },
    
        {
          id: 11,
          imgSrc: "https://img.20mn.fr/lHjeCGX4SmKymdjPvhQyAik/1200x768_google-illustration",
        },
    
        {
          id: 13,
          imgSrc: "https://semji.com/wp-content/uploads/2020/07/histoire-de-google-700x300.png",
        },
        {
          id: 14,
          imgSrc: "https://pic.clubic.com/v1/images/1862615/raw?fit=max&width=1200&hash=3b0c35819f6e4f879bd826ad6a85a87428ad512d",
        },
    
      ]

      const {galery} = useSelector((state)=>state.galery)
     
      return (
        <div>
            <div>
          {!edit ? <div>
            <Header />
            <div className='home-body' style={{ display: "flex" }}>
              <Side handleEditClic={editClic} />
              <Gallery imgStore={data} />
            </div>
          </div> :
            <PhotoEditor imgStore={data}
            handleEditClic={editClic} />}
        </div>
            </div>
      );
    }
    
    export default App;
  





















  






















