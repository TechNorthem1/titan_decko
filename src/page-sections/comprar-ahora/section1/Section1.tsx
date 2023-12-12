"use client"
import Container from '@component/Container';
import "./style.css";
import { useForm } from "react-hook-form";


const Section1 = ({user,model, setModel, action_continue, show_form_send, handleChange, visibleForm, setVisibleForm}) => {
  const { register, handleSubmit, formState: {errors} } = useForm({});


  const show_form = () => {
    try {
      let btn_edit = document.querySelector(".btn_edit");
      let form = document.querySelector(".form-data_person");
      let information = document.querySelector(".info_personal");

      form.classList.remove("deactivate");
      btn_edit.classList.remove("activate");
      information.classList.remove("activate");
    } catch (error) {
      error;
    }
  }

  const onSubmit = (data:any) => {
    setModel({
      ...model,
      email: data.email,
      name: data.name,
      lastname: data.lastname,
      citizenshipCard: data.citizenshipCard,
      phone: data.phone
    });
    localStorage.setItem("info_pago", JSON.stringify(model));
    setVisibleForm((valor:boolean) => !valor);
    console.log(visibleForm);
    action_continue();
    show_form_send();
  }

  const get_data = () => {
    let data = JSON.parse(localStorage.getItem("info_pago")); 
    setModel( data );
    show_form();
  }


  return (
    <Container className='data_person'>
      <h1 className='title'>1. Datos personales</h1>
      <a className='btn_edit' onClick={get_data}>editar</a>

      <div className="information">
        <span>solicitamos unicamente la informacion esencial para la finalizacion de la compra</span>
        <hr />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='form-data_person'>
        <div className="form-control email">
          <label htmlFor="email">Correo <span className='required'>*</span></label>
          <input
            type="email" 
            name="email" 
            id="email"
            {...register("email", {required: "el campo es requerido", pattern: { value: /\S+@\S+\.\S+/, message: 'Ingrese un correo invalido' }})}
            value={user.email.stringValue ?? ""}
            onChange={handleChange}
          />
          {errors.email && <p className='validate-field'>{errors.email.message as string}</p>}
        </div>

        <div className="form-control name">
          <label htmlFor="name">Nombre <span className='required'>*</span></label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            {...register("name", {
              required: "el campo es requerido", 
              minLength: {value: 3, message: "El campo debe tener mas de 3 caracteres"}, 
              maxLength: {value: 20, message: "el campo debe tener menos de 20 caracteres"},
              pattern: {value: /^[a-zA-Z\s]*$/, message: "el campo no debe llevar numeros"}
            })} 
            value={ user.name.stringValue ?? ""}
            onChange={handleChange}
          />
          {errors.nameUser && <p className='validate-field'>{errors.nameUser.message as string}</p>}
        </div>

        <div className="form-control lastname">
          <label htmlFor="lastname">Apellidos <span className='required'>*</span></label>
          <input 
            type="text" 
            name="lastname" 
            id="lastname" 
            {...register("lastname", {
              required: "el campo es requerido",
              minLength: {value: 3, message: "El campo debe tener mas de 3 caracteres"}, 
              maxLength: {value: 20, message: "el campo debe tener menos de 20 caracteres"},
              pattern: {value: /^[a-zA-Z\s]*$/, message: "el campo no debe llevar numeros"}
            })} 
            value={user.lastname.stringValue ?? ""}
            onChange={handleChange}
          />
          {errors.lastname && <p className='validate-field'>{errors.lastname.message as string}</p>}
        </div>

        <div className="form-control citizenshipCard">
          <label htmlFor="citizenshipCard">Cedula de ciudadania <span className="required">*</span></label>
          <input 
            type="text" 
            name="citizenshipCard" 
            id="citizenshipCard" 
            {...register("citizenshipCard", {
              required: "el campo es requerido",
              minLength: {value: 7, message: "el campo debe contener mas de 7 numeros"},
              maxLength: {value: 10, message: "el campo debe contener menos de 10 numeros"},
              pattern: {value: /^\d*$/, message:"el campo no debe contener caracteres"}
            })} 
            value={model?.citizenshipCard ?? ""}
            onChange={handleChange}
          />

          {errors.citizenshipCard && <p className='validate-field'>{errors.citizenshipCard.message as string}</p>}
        </div>

        <div className="form-control phone">
          <label htmlFor="phone">Telefono / movil <span className='required'>*</span></label>
          <input 
            type="tel" 
            name="phone" 
            id="phone"
            {...register("phone", {
              required: "el campo es requerido",
              maxLength: {value: 10,  message: "el campo debe contener 10 numeros"},
              minLength: {value: 10,  message: "el campo debe contener 10 numeros"},
              pattern: {value: /^\d*$/, message:"el campo no debe contener caracteres"}
            })}
            value={user.phone.stringValue ?? ""}
            onChange={handleChange}
          />

          {errors.phone && <p className='validate-field'>{errors.phone.message as string}</p>}
        </div>

        <div className="form-actions btn">
          <button id='btn_continue'>continuar</button>
        </div>
      </form>

      <div className="info_personal">
        <div className="data_sent">
          <span>correo: {user && user.email.stringValue }</span>
          <span>nombre: {user && user.name.stringValue} {model && model.lastname}</span>
          <span>telefono / movil: {user && user.phone.stringValue}</span>
        </div>
        <a>no soy yo, cerrar sesion</a>
      </div>
    </Container>
  )
}


export default Section1;