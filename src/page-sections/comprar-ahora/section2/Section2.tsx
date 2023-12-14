'use client'
import Container from '@component/Container';
import React, { useEffect, useState } from 'react';
import "./style.css";
import useForm from '@hooks/useForm';
import Authentication from '@helpers/Autentication';
import Client from '@models/Client.model';
import FirebaseService from '@services/FirebaseService';



const Section2 = ({user, setUser}) => {
  const {form, changed} = useForm({});
  const [isVisible, setVisible] = useState(false)

  useEffect(()=>{
    if(user.lastname?.stringValue?.length === 0){
      setVisible(false)
    }else if(user.departament?.stringValue?.length > 0){
      setVisible(false)
    }
    else{
      setVisible(true)
    }
  }, [])

  const save = async (e:any) => {
    e.preventDefault();
    let client:Client = new Client(
      user.name?.stringValue, user.lastname?.stringValue, user.document?.stringValue, user.email?.stringValue, user.phone?.stringValue, user.address?.stringValue, "", 
      form["departament"], form["municipaly"], form["avenue"], form["address1"], form["address2"], form["address3"], form["method"], form["complement_information"], 
      form["information_aditional"], form["neighborhood"]
    );
    let updateuser:boolean = await FirebaseService.updatedUserAddress(client, user?.email?.stringValue);
    if(updateuser){
      let dataUser = await FirebaseService.getUser(user?.email?.stringValue);
      setUser(dataUser) 
      setVisible(false);
    }
    setVisible(updateuser)
  }
  
  const INITIAL_VALUE = {
    departament: user.departament?.stringValue.length == 0 || user.departament?.stringValue == undefined ? "" : user.departament?.stringValue,
    municipaly: user.departament?.stringValue.length == 0 || user.departament?.stringValue == undefined ? "" : user.municipaly?.stringValue,
    avenue: user.departament?.stringValue.length == 0 || user.departament?.stringValue == undefined ? "" : user.avenue?.stringValue,
    address1: user.departament?.stringValue.length == 0 || user.departament?.stringValue == undefined ? "" : user.address1?.stringValue,
    address2: user.departament?.stringValue.length == 0 || user.departament?.stringValue == undefined ? "" : user.address2?.stringValue,
    address3: user.departament?.stringValue.length == 0 || user.departament?.stringValue == undefined ? "" : user.address3?.stringValue,
    method: user.departament?.stringValue.length == 0 || user.departament?.stringValue == undefined ? "1" : user.method?.stringValue,
    method2: user.departament?.stringValue.length == 0 || user.departament?.stringValue == undefined ? "2" : user.method?.stringValue,
    method3: user.departament?.stringValue.length == 0 || user.departament?.stringValue == undefined ? "3" : user.method?.stringValue,
    complement_information: user.departament?.stringValue.length == 0 || user.departament?.stringValue == undefined ? "" : user.complement_information?.stringValue,
    information_aditional: user.departament?.stringValue.length == 0 || user.departament?.stringValue == undefined ? "" : user.information_aditional?.stringValue,
    neighborhood: user.departament?.stringValue.length == 0 || user.departament?.stringValue == undefined ? "" : user.neighborhood?.stringValue
  }

  useEffect(() => {}, [isVisible, user])

  return (
    <Container className="data_send">
      <h1 className="title">2. Envio</h1>
     {!isVisible && <a className="btn_edit_send activate" onClick={() => setVisible(true)}>editar</a>}

      <hr className="line" /> 
      {isVisible &&
        <form className="form-data_send" onSubmit={save}>
        <div className="form-control departament">
          <label htmlFor="departament">Departamento</label>
          <select 
            name="departament" 
            id="departament"
            onChange={changed}
            
          >
            <option selected disabled>Seleccione un departamento...</option>
            <option value="Bogotá D.C">Bogotá D.C</option>
          </select>
        </div>

        <div className="form-control municipaly">
          <label htmlFor="municipaly">Municipio</label>
          <select 
            name="municipaly" 
            id="municipaly"
            onChange={changed}
            
          >
            <option disabled selected>Seleccione un municipio</option>
            <option value="Bogotá D.C">Bogotá D.C</option>
          </select>
        </div>

        <div className="form-control-address address">
          <label htmlFor="" className='type'>Tipo de via <span className='required'>*</span></label>
          <select 
            name="avenue" 
            id="avenue" 
            className='avenida' 
            onChange={changed}

          >
            <option disabled selected>Selecione tipo de via</option>
            <option value="Avenida">Avenida</option>
          </select>
          <input 
            type="text" 
            name="address1" 
            id="address1" 
            className='numero1'
            onChange={changed}
            defaultValue={INITIAL_VALUE.address1}
          />
          <span className='number'>#</span>
          <input 
            type="text" 
            name="address2" 
            id="address2" 
            className='numero2'
            onChange={changed}
            defaultValue={INITIAL_VALUE.address2}
          />
          <span className='with'>-</span>
          <input 
            type="text" 
            name="address3" 
            id="address3" 
            className='numero3'
            onChange={changed}
            defaultValue={INITIAL_VALUE.address3}
          />
        </div>

        <div className="form-control address_complete">
          <input type="text" 
            name="address_complete" 
            id="address_complete" 
            className='address_complete'
            readOnly
            disabled
          />
        </div>

        <div className="form-control-method methods">
          <h3 className='title_method'>metodo de entrega</h3>

          <div className="content_method">
            <div className="method_send">
              <input 
                type="radio" 
                name="method"
                id="method1"
                onChange={changed}
                value={INITIAL_VALUE.method}
                defaultChecked={INITIAL_VALUE.method === user.method?.stringValue}
              />
              <label htmlFor='method1'>
                <span>recibe hoy</span>
                <span>Mismo dia</span>
              </label>
              <p>$ 9.000</p>
            </div>
            
            <div className="method_send">
              <input 
                type="radio"
                name="method" 
                id="method2"
                onChange={changed}
                value={INITIAL_VALUE.method2}
                defaultChecked={INITIAL_VALUE.method2 === user.method?.stringValue}
              />
              <label htmlFor='method2'>
                <span>recibe hoy</span>
                <span>Mismo dia</span>
              </label>
              <p>$ 9.000</p>
            </div>

            <div className="method_send">
              <input 
                className='text_input' 
                type="radio" 
                name="method" 
                onChange={changed}
                value={INITIAL_VALUE.method3}
                defaultChecked={INITIAL_VALUE.method3 === user.method?.stringValue}
              />
              <label htmlFor='method3'>
                <span>recibe hoy</span>
                <span>Mismo dia</span>
              </label>
              <p>$ 9.000</p>
            </div>
          </div>
        </div>

        <div className="form-control complement_information">
          <label htmlFor="complement_information">informacion complementaria</label>
          <input 
            type="text"
            name="complement_information"
            id="complement_information"
            onChange={changed}
            defaultValue={INITIAL_VALUE.complement_information}
          />
        </div>

        <div className="form-control information_additional">
          <label htmlFor="information_additional">informacion adicional (ej: apto, 201)</label>
          <input 
            type="text" 
            name="information_aditional" 
            id="information_aditional"
            onChange={changed}
            defaultValue={INITIAL_VALUE.information_aditional}
          />
        </div>

        <div className="form-control neighborhood">
          <label htmlFor="neighborhood">barrio</label>
          <input 
            type="text"
            name="neighborhood" 
            id="neighborhood"
            onChange={changed}
            defaultValue={INITIAL_VALUE.neighborhood}
          />
        </div>

        <div className="form-control addresee">
          <label htmlFor="addresee">destinatario</label>
          <input 
            type="text" 
            name="addressee" 
            id="addressee"
            disabled
          />
        </div>
        
        <div className="form-action btn_payment">
          <button>ir para el pago</button>
        </div>
        </form>
      }
      

      {!isVisible && 
        <div className="information_send activate">
        <div className="content-send">
          <p></p>
          <p>11001</p>
          <hr />
          <p>Envio: en 1 dia habil</p>
        </div>
        <span>gratis</span>
        </div>
      }

    </Container> 
  )
}


export default Section2;