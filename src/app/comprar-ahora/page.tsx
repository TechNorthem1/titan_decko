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



const page = () => {
    const [model, setModel] = useState({
        email: "",
        name: "",
        lastname: "",
        citizenshipCard :"",
        phone: "",
        departament: "",
        municipaly: "",
        avenue: "",
        number1: "",
        number2: "",
        number3: "",
        complement_information: "",
        method: "",
        information_additional: "",
        neighborhood: "",
        addressee: ""
    });

    const [isVisible, setVisibleForm] = useState(false);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("info_pago"));
        if( data !== null && data.name !== "" && data.departament !== ""){
            setModel(data);
            action_continue();
            btn_continue_send();
        }else if(data !== null && data.name !==""){
            setModel(data);
            action_continue();
        }else{
            btn_continue_send();
        }
    }, [])

    const action_continue = () => {
        try{
            let btn_edit = document.querySelector(".btn_edit");
            let form = document.querySelector(".form-data_person");
            let information = document.querySelector(".info_personal");
            
            form.classList.add("deactivate");
            btn_edit.classList.add("activate");
            information.classList.add("activate");
        }catch(error){
            error;
        }

    }

    const btn_continue_send = () => {
        try{
            let form = document.querySelector(".form-data_send");
            let btn_edit = document.querySelector(".btn_edit_send");
            let information_send = document.querySelector(".information_send");
            
            form.classList.add("deactivate");
            btn_edit.classList.add("activate");
            information_send.classList.add("activate_grid");
        }catch(error){
            error
        }
    }

    const show_form_send = () => {
        try{
          let form = document.querySelector(".form-data_send");
          let btn_edit = document.querySelector(".btn_edit_send");
          let information_send = document.querySelector(".information_send");
          
          form.classList.remove("deactivate");
          btn_edit.classList.remove("activate");
          information_send.classList.remove("activate_grid");
        }catch(error){
          error;
        }
    }

    const handleChange = (event:any) => {
        const { name, value } = event.target;
        setModel({
          ...model,
          [name]: value
        })   
    };


    return (
        <Fragment>
            <HeaderTitan />

            <Box className='content-box'>
                <Container style={{"flex": "1"}}>
                    <Grid container spacing={4} style={{"marginBottom": "30px"}}>
                        <Grid item lg={8} xs={12}>
                            <Section1 
                                model={model} 
                                setModel={setModel} 
                                action_continue={action_continue}
                                show_form_send={show_form_send}
                                handleChange={handleChange}
                                visibleForm={isVisible}
                                setVisibleForm={setVisibleForm}
                            />

                            <Section2 
                                model={model} 
                                setModel={setModel}
                                btn_continue_send={btn_continue_send}
                                show_form_send={show_form_send}
                                handleChange={handleChange}
                                visibleForm={isVisible}
                                setVisibleForm={setVisibleForm}
                            />

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
