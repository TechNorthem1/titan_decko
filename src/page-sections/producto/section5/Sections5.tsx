import Container from '@component/Container';
import React, { useEffect, useState } from 'react'
import "./style.css"
import Method from '@helpers/Method';
import Image from "next/image";
import Loading from '@component/loading/Loading';

interface Section5Props { activate?:boolean; setActivate?: (active?:boolean) => void}

const Section5 = ({activate, setActivate}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {getPosts();}, [])

  const getPosts = async () => {
    let response = await Method.allPosts("posts/?per_page=8");
    setPosts(response);
  }

  return (
    <Container className='container_tips'>
        <hr />
        <h2>Dejamos algunos concejos para ti</h2>
        
        {activate? <Loading classCss={""} active={activate} setActivate={setActivate} />  :(<div className="carts-tips">
          {posts.map((item:any) => (
            <div className="cart-tip" key={item.id}>
              <div className="mask">
                <Image 
                  src={item.yoast_head_json.og_image[0].url}
                  alt="blogs"
                  height={200}
                  width={200}
                  layout="responsive"
                  loading='lazy'
                />
                
              </div>
              <Image 
                src="/assets/images/titan/user.webp"
                alt="user"
                height={60}
                width={60}
                layout="responsive"
                className='user'
                loading='lazy'
              />
              <div className="content-tip">
                <h1>¿{item.title.rendered}?</h1>
                <p>
                  {item.yoast_head_json.description}
                </p>

                <a href="#">leer mas {">>"}</a>
              </div>
            </div>

          ))}
        </div>)}
    </Container>
  )
}


export default Section5;
