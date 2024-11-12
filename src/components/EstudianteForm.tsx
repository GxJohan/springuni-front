import React, {useState,useEffect} from "react";//Importamos useState y useEffect
import { Estudiante } from "../types"// Importamos la interfaz Estudiante

//Definimos las propiedades que recibirá este componente
interface EstudianteFormProps {
    //Función que se ejecutará cuando se envíe el formulario
    onSubmit: (estudiante:Omit<Estudiante,'id'>) => void;
    //Datos Iniciales para editar
    initialData?: Estudiante;
    //Función para cancelar la edición
    onCancel?: () => void;
}
const EstudianteForm: React.FC<EstudianteFormProps> = ({onSubmit, initialData, onCancel}) => {
    //Estados de los campos del formulario
    const [codigo, setCodigo] = useState(initialData?.codigo || '');//Estado para el campo código
    const [nombre, setNombre] = useState(initialData?.nombre || '');//Estado para el campo nombre
    const [apellido, setApellido] = useState(initialData?.apellido || '');//Estado para el campo apellido
    const [email, setEmail] = useState(initialData?.email || '');//Estado para el
    //Hook que actualiza los campos del formulario cuando
    //se cambia el valor de initialData
    useEffect(()=>{
        if(initialData){
            setCodigo(initialData.codigo);
            setNombre(initialData.nombre);
            setApellido(initialData.apellido);
            setEmail(initialData.email);
        }else{
            setCodigo('');
            setNombre('');
            setApellido('');
            setEmail('');
        }
    }
    ,[initialData]);
    //Función que maneja el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        //Prevenir el comportamiento por defecto del formulario
        e.preventDefault();
        //Llamar a la función onSubmit con los datos del formulario
        onSubmit({codigo,nombre,apellido,email});
        
        //Si no se esta editando
        //Limpiar los campos del formulario después enviar
        if (!initialData){
            setCodigo('');
            setNombre('');
            setApellido('');
            setEmail('');
        }

    };

    return (
        <form onSubmit={handleSubmit} style={{marginBottom:'20px'}}  > 
        {/*Título del formulario que cambia según si se está editando o creando*/}
        <h2>{initialData? 'Editar Estudiante': 'Crear Estudiante'}</h2>
        {/*Campo de texto para el código*/}
        <input
        type="text"
        placeholder="Código"
        value={codigo}
        //Actualizar el estado del código cuando cambie el valor del campo
        onChange={(e) => setCodigo(e.target.value)}
        required //Campo requerido obligatorio
        style={{marginBottom:'10px', marginRight:'10px'}}        
        />
        {/*Campo de texto para el nombre*/}
        <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        //Actualizar el estado del nombre cuando cambie el valor del campo
        onChange={(e) => setNombre(e.target.value)}
        required //Campo requerido obligatorio
        style={{marginBottom:'10px', marginRight:'10px'}}
        />
        {/*Campo de texto para el apellido*/}
        <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        //Actualizar el estado del apellido cuando cambie el valor del campo
        onChange={(e) => setApellido(e.target.value)}
        required //Campo requerido obligatorio
        style={{marginBottom:'10px', marginRight:'10px'}}
        />
        {/*Campo de texto para el correo electrónico*/}
        <input
        type="email"
        placeholder="Email"
        value={email}
        //Actualizar el estado del correo electrónico cuando cambie el valor del campo
        onChange={(e) => setEmail(e.target.value)}
        required //Campo requerido obligatorio
        style={{marginBottom:'10px', marginRight:'10px'}}
        />
        {/*Botón para enviar el formulario*/}
        {/*Cambia el texto del botón según si se está editando o creando*/}
        <button
        type="submit">
        {initialData? 'Actualizar': 'Crear'}
        </button>
        {/*Botón para cancelar la edición*/}
        {/*Muestra el botón solo si se está editando*/}
        { initialData && onCancel && (
            <button
            type="button"
            onClick={onCancel}
            style={{marginLeft:'10px'}}
            >
            Cancelar
            </button>
        )}  
        </form>
    );

};
export default EstudianteForm;//Exportamos el componente EstudianteForm

