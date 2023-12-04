'use client'
import Container from '@component/Container';
import React from 'react';
import "./style.css";
import { useForm } from 'react-hook-form';

const Section2 = ({model, setModel, btn_continue_send, show_form_send, handleChange, visibleForm, setVisibleForm}) => {
  const { register, handleSubmit, formState: {errors} } = useForm({
  });



  const onSubmit = (data:any) => {
    setModel({
      ...model, 
      departament: data.departament,
      municipaly: data.municipaly,
      avenue: data.avenue,
      address_complete: data.address_complete,
      method: data.method,
      complement_information: data.complement_information,
      information_additional: data.information_additional,
      neighborhood: data.neighborhood
    })
    localStorage.setItem("info_pago", JSON.stringify(model));
    btn_continue_send()
  }

  const isCheckedInput = (value:String) => {
    return model && model.method === value;
  }

  
  return (
    <Container className="data_send">
      <h1 className="title">2. Envio {visibleForm}</h1>
      { model.departament !== "" ? (
        <a className="btn_edit_send activate" onClick={show_form_send}>editar</a> ): "" 
      }
      
      <hr className="line" />
      <form className="form-data_send" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control departament">
          <label htmlFor="departament">Departamento</label>
          <select 
            name="departament" 
            id="departament"
            {...register("departament", {
              required: {value: true, message: "el campo es requerido"}
            })}
            onChange={handleChange}
            value={model?.departament ?? ""}
          >
            <option value="">Seleccione un departamento...</option>
            <option value="Bogotá D.C">Bogotá D.C</option>
          </select>
          {/* {model && <p className='validate-field'>{ errors.departament.message as string }</p>} */}
        </div>

        <div className="form-control municipaly">
          <label htmlFor="municipaly">Municipio</label>
          <select 
            name="municipaly" 
            id="municipaly"
            {...register("municipaly",  {
              required: "el campo es requerido"
            })}
            onChange={handleChange}
            value={model?.municipaly ?? ""}
          >
            <option value="">Seleccione un municipio</option>
            <option value="Bogotá D.C">Bogotá D.C</option>
          </select>
          {/* {model && <p className='validate-field'>{errors.municipaly.message as string}</p>} */}
        </div>

        <div className="form-control-address address">
          <label htmlFor="" className='type'>Tipo de via <span className='required'>*</span></label>
          <select 
            name="avenue" 
            id="avenue" 
            className='avenida'
            {...register("avenue", {
              required: "el campo es requerido"
            })}
            onChange={handleChange}
            value={model?.avenue ?? ""}
          >
            <option value="Avenida">Avenida</option>
          </select>
          <input 
            type="text" 
            name="number1" 
            id="number1" 
            className='numero1'
            {...register("number1", {
              required: "el campo es requerido"
            })}
            value={model?.number3 ?? ""}
            onChange={handleChange}
          />
          <span className='number'>#</span>
          <input 
            type="text" 
            name="number2" 
            id="number2" 
            className='numero2'
            {...register("number2", {
              required: "el campo es requerido"
            })} 
            onChange={handleChange}
            value={model?.number2 ?? ""}
          />
          <span className='with'>-</span>
          <input 
            type="text" 
            name="number3" 
            id="number3" 
            className='numero3'
            {...register("number3", {
              required: "el campo es requerido"
            })}
            onChange={handleChange}
            value={model?.number3 ?? ""}
          />
        </div>

        <div className="form-control address_complete">
          <input type="text" 
            name="address_complete" 
            id="address_complete" 
            className='address_complete'
            readOnly
            disabled
            {...register("address_complete")}
            onChange={handleChange}
            value={
              `${model?.avenue} ${model?.number1} # ${model?.number2} - ${model?.number3}` 
              ?? ""}
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
                {...register("method", {
                  required: "seleccione un metodo de envio"
                })}
                
                onChange={handleChange}
                value={model?.method === "Normal" ? model.method : "Normal"}
                checked={isCheckedInput("Normal")}
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
                {...register("method", {
                  required: "seleccione un metodo de envio"
                })}
                checked={isCheckedInput("Pago contra entrega")}
                onChange={handleChange}
                value={model?.method === "Pago contra entrega" ? model.method : "Pago contra entrega"}
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
                id="method3" 
                {...register("method", {
                  required: "seleccione un metodo de envio"
                })}
                onChange={handleChange}
                value={model?.method === "otro" ? model.method : "otro" }
                checked={isCheckedInput("otro")}
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
            {...register("complement_information", {
              minLength: {value: 7, message: "el campo debe contener mas de 7 caracteres"}
            })}
            onChange={handleChange}
            value={model?.complement_information ?? ""}
          />
          {/* {model && <p>{errors.complement_information.message as string}</p>} */}
        </div>

        <div className="form-control information_additional">
          <label htmlFor="information_additional">informacion adicional (ej: apto, 201)</label>
          <input 
            type="text" 
            name="information_additional" 
            id="information_additional" 
            {...register("information_additional", {
              validate: {
                minLength: value => value.length >= 7 || "el campo debe contener mas de 7 caracteres",
                // Otras validaciones personalizadas pueden ir aquí
              }
            })}
            value={model?.information_additional ?? ""}
            onChange={handleChange}
          />

          {/* {model && <p>{errors.information_additional.message as string}</p>} */}
        </div>

        <div className="form-control neighborhood">
          <label htmlFor="neighborhood">barrio</label>
          <input 
            type="text"
            name="neighborhood" 
            id="neighborhood"
            {...register("neighborhood", {
              required: {value: true, message: "el campo es requerido"}
            })}
            onChange={handleChange}
            value={model?.neighborhood ?? ""}
          />
        </div>

        <div className="form-control addresee">
          <label htmlFor="addresee">destinatario</label>
          <input 
            type="text" 
            name="addressee" 
            id="addressee"
            disabled
            value={`${model?.name} ${model?.lastname}` ?? ""}
          />
        </div>
        
        <div className="form-action btn_payment">
          <button>ir para el pago</button>
        </div>
      </form>
      
      {/* {
        model && model.departament !== "" ?
        ( */}
          <div className="information_send">
            <div className="content-send">
              <p>{ `${model?.avenue}  ${model?.number1} # ${model?.number2} - ${model?.number3}`}</p>
              <p>11001 {`${model?.departament} ${model?.municipaly}`}</p>
              <hr />
              <p>Envio: en 1 dia habil</p>
            </div>
            <span>gratis</span>
          </div>
        {/* ) : ""
      }*/}
    </Container> 
  )
}


export default Section2;