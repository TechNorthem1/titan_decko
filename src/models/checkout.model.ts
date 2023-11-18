interface Checkout {
    email:string | null | undefined,
    name:string | null | undefined,
    lastname: string| null | undefined,
    citizenshipCard: string| null | undefined,
    phone:string| null | undefined,
    departament: string| null | undefined,
    municipaly: string | null | undefined,
    avenue: string | null | "",
    number1: string | null | "",
    number2: string | null | "",
    number3: string | null | "",
    complement_information: string | null | "",
    method: string | null | undefined,
    information_additional: string | null | undefined,
    neighborhood: string | null | undefined,
    addressee: string | null | undefined,
}

export default Checkout;