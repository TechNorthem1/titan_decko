"use client"
import Loading from '@component/loading/Loading';
import Method from '@helpers/Method';
import React, { Fragment, useEffect, useState } from 'react'
import Container from '@component/Container';
import Section1 from "@sections/blog/section1/Section1";
import Section2 from "@sections/blog/section2/Section2";

const page = ({params}) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [blog, setBlog] = useState<any>({});
    useEffect( () => {getBlog()}, [])

    const getBlog = async () => {
        let blogRes = await fetch(`${Method.wordpress}posts/${params.id}`, {method: "GET"});
        let blog = await blogRes.json();
        setBlog(blog);
        setLoading(false);
    };

    return (
        <Fragment>
            <Loading active={loading} setActivate={setLoading} classCss={""}/>
            <Container minHeight={800}>
                <Section1 blog={blog}/>
                <Section2 blog={blog} />
            </Container>
        </Fragment>
    )
}

export default page;
