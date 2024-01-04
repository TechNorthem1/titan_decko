import React, {FC} from 'react'
import { colors } from '@utils/themeColors'
import "./style.css"

type Section2Props = {blog:any}

const Section2:FC<Section2Props> = ({blog}) => {
  
    return (
        <div className='blog_text' dangerouslySetInnerHTML={{ __html: blog.content?.rendered }}></div>
    )
}

export default Section2;
