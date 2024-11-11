//Definir la interfaz del estudiante que refleja en la entidad
//del backend (../model/Estudiante.java)
export interface Estudiante {
    id: number; // identificador único del estudiante
    codigo: string; // código del estudiante
    nombre: string; // nombre del estudiante
    apellido: string; // apellido del estudiante
    email: string; // correo electrónico del estudiante

}