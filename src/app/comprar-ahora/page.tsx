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
import User from '@utils/__api__/user'
import FirebaseService from '@services/FirebaseService'
import { useAppContext } from '@context/AppContext'
import Helpers from '@helpers/Helpers'
import MobileNavigationBar from '@component/mobile-navigation'





const page = () => {
    const [user, setUser] = useState<any>();
    const {state, dispatch} =  useAppContext();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
        getUser();
    }, [])

    useEffect(() => {
        let authenticated = Helpers.isAuthenticated("dataUser");
        setIsAuthenticated(authenticated)
    }, [isAuthenticated, user])

    

    const getUser = async () => {
        let data = JSON.parse(User.getUser("dataUser")); 
        const dataUser:any = await FirebaseService.getUser(data.email);
        setUser(dataUser[0]._document?.data?.value.mapValue.fields);
    }

    return (
        <Fragment>
            <HeaderTitan isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>

            <Box className='content-box'>
                <Container style={{"flex": "1", padding: "0 20px"}}>
                    <Grid container spacing={4} style={{"marginBottom": "30px"}}>
                        <Grid item lg={8} xs={12}>

                            <Section1 
                                user={user}
                                setUser={setUser}
                            />

                            
                            <Section2 
                                user={user} 
                                setUser={setUser}

                            />
                    

                            <Section3 />
                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <Section4 state={state} />
                        </Grid>
                    </Grid>

                </Container>
            </Box>
            <MobileNavigationBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <Footer1 />
        </Fragment>
        )
}


export default page;
