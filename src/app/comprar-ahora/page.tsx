"use client"
import Box from '@component/Box'
import Container from '@component/Container'
import { Footer1 } from '@component/footer'
import Grid from '@component/grid/Grid'
import { HeaderTitan } from '@component/header_titan'
import React, { Fragment, useState, useEffect } from 'react'
import Section1 from "@sections/comprar-ahora/section1/"
import Section2 from "@sections/comprar-ahora/section2/"
import Section3 from "@sections/comprar-ahora/section3/"
import Section4 from "@sections/comprar-ahora/section4/"
import { useRouter } from 'next/navigation'
import User from '@utils/__api__/user'
import FirebaseService from '@services/FirebaseService'
import { setDefaultResultOrder } from 'dns/promises'




const page = () => {
    const [user, setUser] = useState<any>();
    
    useEffect(() => {
        getUser();
    }, [])

    useEffect(()=> {}, [user]);
    

    const getUser = async () => {
        let data = User.getUser("dataUser"); 
        const dataUser:any = await FirebaseService.getUser(data.email);
        setUser(dataUser[0]._document?.data?.value.mapValue.fields);
    }

    return (
        <Fragment>
            <HeaderTitan />

            <Box className='content-box'>
                <Container style={{"flex": "1"}}>
                    <Grid container spacing={4} style={{"marginBottom": "30px"}}>
                        <Grid item lg={8} xs={12}>

                            {user && <Section1 
                                user={user}
                                setUser={setUser}
                            />}

                           {user && 
                                <Section2 
                                    user={user} 
                                    setUser={setUser}
                                />
                            }

                            <Section3 />
                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <Section4 />
                        </Grid>
                    </Grid>

                </Container>
            </Box>

            <Footer1 />
        </Fragment>
        )
}


export default page;
