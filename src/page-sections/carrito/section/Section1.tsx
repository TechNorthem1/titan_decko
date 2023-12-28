import React from 'react'
import { Button, IconButton } from '@component/buttons';
import { currency } from '@utils/utils';
import { colors } from "@utils/themeColors";
import Login from "@component/sessions/Login";
import UserLoginDialog from "@component/header/LoginDialog";
import Link from "next/link"
import "./style.css"


const Section1 = ({isAuthenticated, total, sendLocalStorage}) => {
    const LOGIN_HANDLE = (
        <Button ml="1rem" bg="gray.black" p="8px" style={{width: "100%",backgroundColor:colors.titan.yellow, color: colors.titan.dark, marginLeft: "0"}}>
          Comprar Ahora
        </Button>
    );



    return (
        <>
            <div className='content-info-cart'>
                <div className="info-header">
                    <h1>Resumen de compra</h1>
                </div>

                <div className="info-desc" id='info-desc'>
                    <div className="code-desc">
                        <span>Ingresa aqui tu codigo de descuento</span>
                    </div>
                </div>
                
                {/* <div className="info-payment">

                </div>  */}

                <div className="info-value-buy">
                    <p>Subtotal</p>
                    <p>{currency(total)}</p>
                    <p>Total</p>
                    <p>{currency(total)}</p>
                </div>

                <div>
                    {isAuthenticated &&
                        <UserLoginDialog handle={LOGIN_HANDLE}>
                            <div>
                                <Login redirect="/comprar-ahora"/>
                            </div>
                        </UserLoginDialog>
                    }

                    {!isAuthenticated && 
                        <Link href="/comprar-ahora" onClick={sendLocalStorage}>
                            <Button ml="1rem" bg="gray.black" p="8px" style={{width: "100%",backgroundColor:colors.titan.yellow, color: colors.titan.dark, marginLeft: "0"}}>
                                Comprar Ahora
                            </Button>
                        </Link>
                    }
                </div>
            </div>
        </>
    )
}


export default Section1;