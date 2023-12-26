

const SerializerForm = (form:any) => {
    const formData = new FormData(form);
    const initialObject:any = {}

    for(let [name, value] of formData){
        initialObject[name] = value;
    }

    return initialObject;
}


export default SerializerForm;