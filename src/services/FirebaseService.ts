import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { collection, getDocs, query, where, addDoc} from "firebase/firestore";
import Client from "@models/Client.model";



class FirebaseService {

    static initialize = () => {
        // Configurar Firebase (reemplaza esto con tu propia configuración)
        const firebaseConfig = {
            apiKey: "AIzaSyD0exYpKoypZiePwp6wzA1cJMFOJdqL9QM",
            authDomain: "registro-login-titan-decko.firebaseapp.com",
            projectId: "registro-login-titan-decko",
            storageBucket: "registro-login-titan-decko.appspot.com",
            messagingSenderId: "694168934533",
            appId: "1:694168934533:web:9ed5558397dbf3ba6271ec",
            measurementId: "G-QY431RHVK2"
        };

        // Inicializar Firebase
        const app = initializeApp(firebaseConfig);

        // Referencia a la base de datos
        const db = getFirestore(app);
        return db;
    };

    static getUser = async (email:string) => {
        try {
            const db = FirebaseService.initialize();
            let userRef = collection(db, "users");
            let q = query(userRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);
            const user = querySnapshot.docs;
            return user;
        } catch (error) {
            throw new Error("se ha generado un error al obtener los usuarios");
        }
    }

    static createUser = async (client:Client) => {
       try {
        const db = FirebaseService.initialize();
        const docRef = await addDoc(collection(db, "users"), client.toFirestore());
        return docRef;
       } catch (error) {
        console.log(error)
       }
    }
}

export default FirebaseService;