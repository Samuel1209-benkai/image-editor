import {ImContrast,ImBrightnessContrast} from 'react-icons/im'
import {RiContrastDropFill,RiCropLine} from 'react-icons/ri'


export const toolCard = [
    {
        id:1,
        name:"crop and resize",
        maxValue:200,
        icone:<RiCropLine className='icon-space'/>
    },
    {
        id:2,
        name:"Brightness",
        maxValue:200,
        icone:<ImBrightnessContrast className='icon-space'/>
    },
    {
        id:3,
        name:"Contrast",
        maxValue:200,
        icone:<ImContrast className='icon-space'/>
    },
    {
        id:4,
        name:"Saturate",
        maxValue:200,
        icone:<RiContrastDropFill className='icon-space'/>
    }
]
