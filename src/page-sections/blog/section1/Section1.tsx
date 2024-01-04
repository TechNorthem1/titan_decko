import React, { FC } from 'react'
import { H1 } from '@component/Typography';
import Image from 'next/image';
import { colors } from '@utils/themeColors';
import "./style.css";

type Section1Props = {blog:any}

const Section1:FC<Section1Props> = ({blog}) => {
    return (
        <div style={{minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
           <H1 style={{color: colors.titan.dark}}>{blog.title?.rendered}</H1> 

           <Image 
                className='image_blog'
                src={blog.yoast_head_json?.og_image[0].url}
                width={560}
                height={blog.yoast_head_json?.og_image[0].height}
                alt={blog.title?.rendered}
                style={{marginTop: "20px"}}
            />
        </div>
    )
}

export default Section1;