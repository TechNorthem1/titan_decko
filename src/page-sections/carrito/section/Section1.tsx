import React from 'react'
import "./style.css"
import Link from 'next/link';
import Login from "@component/sessions/Login";
import { Button, IconButton } from '@component/buttons';
import UserLoginDialog from "@component/header/LoginDialog";
import { colors } from "@utils/themeColors";

const Section1 = ({isAuthenticated}) => {
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
                <p>$ 249.000</p>
                <p>Total</p>
                <p>$ 249.000</p>
            </div>

            <div>
                {isAuthenticated &&
                    <UserLoginDialog handle={LOGIN_HANDLE}>
                        <div>
                            <Login redirect="/comprar-ahora"/>
                        </div>
                    </UserLoginDialog>
                }
            </div>
        </div>
    </>
  )
}


export default Section1;