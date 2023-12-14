"use client"
import Container from '@component/Container';
import "./style.css";
import { useEffect, useState } from 'react';
import useForm from '@hook/useForm';
import Client from '@models/Client.model';
import FirebaseService from '@services/FirebaseService';
import Authentication from '@helpers/Autentication';
import { useRouter } from "next/navigation";

const Section1 = ({ user, setUser }) => {
  const {form, changed } = useForm({});
  const [isVisible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.lastname?.stringValue?.length == 0){
      setVisible(false);
    }else{
      setVisible(true)
    }

  }, [])
  
  const saveUser = async (e:any) => {
    e.preventDefault();
    let client = new Client(form["name"], form["lastname"], form["citizenshipCard"], form["email"], form["phone"], "", ""); 

    if(Object.keys(form).length !== 0){
      let updateUser = await FirebaseService.updatedUser(client, user.email?.stringValue);
      if(updateUser){
        let {key, param} = Authentication.encryp("dataSend", JSON.stringify(client));
        localStorage.setItem(key, param)
        let dataUser:any = await FirebaseService.getUser(form["email"]);
        setUser(dataUser[0]._document?.data?.value?.mapValue?.fields)
      }
      setVisible(updateUser)
    }else{
      setVisible(true);
    }

  }
  
  
  useEffect(() => {}, [isVisible, user])

  const InitialValues:any = {
    name: user?.lastname?.stringValue.length == 0 ? "" : user?.name?.stringValue,
    lastname: user?.lastname?.stringValue.length == 0 ? "" : user?.lastname?.stringValue,
    document: user?.lastname?.stringValue.length == 0 ? "" : user?.document?.stringValue,
    email: user?.lastname?.stringValue.length == 0 ? "" : user?.email?.stringValue,
    phone: user?.lastname?.stringValue.length == 0 ? "" : user?.phone?.stringValue
    
  }

  const close = () => {
    FirebaseService.logout();
    let keyUser:string = Authentication.encriptKey("dataUser");
    let keyToken:string = Authentication.encriptKey("token_user");
    localStorage.removeItem(keyUser);
    localStorage.removeItem(keyToken);
    router.push("/");
  }

  
  return (
    <Container className='data_person'>
      <h1 className='title'>1. Datos personales</h1>
      {isVisible && <a className='btn_edit activate' onClick={() => setVisible(false)}>editar</a>}

      <div className="information">
        <span>solicitamos unicamente la informacion esencial para la finalizacion de la compra</span>
        <hr />
      </div>


      {!isVisible && 
      <form className='form-data_person' onSubmit={saveUser}>
        <div className="form-control email">
          <label htmlFor="email">Correo <span className='required'>*</span></label>
          <input
            type="email" 
            name="email" 
            id="email"
            defaultValue={InitialValues.email}
            onChange={changed}
          />
        </div>

        <div className="form-control name">
          <label htmlFor="name">Nombre <span className='required'>*</span></label>
          <input 
            type="text" 
            name="name" 
            id="name"
            defaultValue={InitialValues.name}
            onChange={changed}
          />
        </div>

        <div className="form-control lastname">
          <label htmlFor="lastname">Apellidos <span className='required'>*</span></label>
          <input 
            type="text" 
            name="lastname" 
            id="lastname"
            defaultValue={InitialValues.lastname}
            onChange={changed}
          />
        </div>

        <div className="form-control citizenshipCard">
          <label htmlFor="citizenshipCard">Cedula de ciudadania <span className="required">*</span></label>
          <input 
            type="text" 
            name="citizenshipCard" 
            id="citizenshipCard"
            defaultValue={InitialValues.document}
            onChange={changed}
          />
        </div>

        <div className="form-control phone">
          <label htmlFor="phone">Telefono / movil <span className='required'>*</span></label>
          <input 
            type="tel" 
            name="phone" 
            id="phone"
            defaultValue={InitialValues.phone}
            onChange={changed}
          />
        </div>

        <div className="form-actions btn">
          <button id='btn_continue'>continuar</button>
        </div>
      </form>}
      

      {isVisible && 
        <div className="info_personal activate">
          <div className="data_sent">
            <span>correo: {InitialValues.email}</span>
            <span>nombre: {InitialValues.name} {InitialValues.lastname}</span>
            <span>telefono / movil: {InitialValues.phone}</span>
          </div>
          <a onClick={close} className='close-a'>no soy yo, cerrar sesion</a>
        </div>
      }
    </Container>
  )
}


export default Section1;