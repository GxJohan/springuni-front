//src/App.tsx
//Aplicacion principal
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Estudiante } from './types';
import EstudianteForm from './components/EstudianteForm';
import EstudianteTable from './components/EstudianteTable';

const App: React.FC = () => {
  //Estado para almacenar la lista de estudiantes
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  //Estado para almacenar el estudiante que se está editando
  const[estudianteEdit, setEstudianteEdit] = useState<Estudiante | null>(null);
  //Hook que se ejecuta una vez al mostrar el componente para tener
  //la lista de estudiantes
  useEffect(() => {
    //Llamar a la función para obtener la lista de estudiantes
    obtenerEstudiantes();
  }, []);
  //Función para obtener la lista de estudiantes desde el Backend
  const obtenerEstudiantes = async () => {
    try {
      //Hace una solicitud GET a la API de estudiantes /api/estudiantes
      const respuesta = await axios.get('/api/estudiantes');
      //Actualiza el estado (Información de los estudiantes)
      setEstudiantes(respuesta.data);
    } catch (error) {
      //Muestra el error
      console.error(error);
    }  
  };
  //Función para manejar la creación de un nuevo estudiante
  const manejarCrear = async (estudiante: Omit<Estudiante, 'id'>) => {
    try {
      //Hace una solicitud POST a la API de estudiantes /api/estudiantes
      await axios.post('/api/estudiantes', estudiante);
      //Obtiene la lista de estudiantes actualizada
      obtenerEstudiantes();
    } catch (error) {
      //Muestra el error en la consola
      console.error(error);
    }
  };
  //Función para manejar la Actualización de un estudiante
  const manejarActualizar = async (estudiante: Omit <Estudiante,'id'>) => {
    //Si no hay estudiante para editar, no hace nada
    if(!estudianteEdit) return;
    try {
      //Hace una solicitud PUT a la API de estudiantes /api/estudiantes
      await axios.put(`/api/estudiantes/${estudianteEdit.id}`, estudiante);
      //Obtiene la lista de estudiantes actualizada
      obtenerEstudiantes();
      setEstudianteEdit(null);
    } catch (error) {
      //Muestra el error en la consola
      console.error(error);
    }
  };
  //Función para manejar la eliminación de un estudiante
  const manejarEliminar = async (id: number) => {
    try {
      //Hace una solicitud DELETE a la API de estudiantes /api/estudiantes
      await axios.delete(`/api/estudiantes/${id}`);
      //Obtiene la lista de estudiantes actualizada
      obtenerEstudiantes();
    } catch (error) {
      //Muestra el error en la consola
      console.error(error);
    }
  };
  //Funcion para iniciar la edición de un estudiante
  const iniciarEdicion = (estudiante: Estudiante) => {
    //Establece el estudiante que se está editando
    setEstudianteEdit(estudiante);
  };
  //Función para cancelar la edición reseteando el estudiante que se está editando
  const cancelarEdicion = () => {
    //Limpiar el estudiante que se está editando(resetea)
    setEstudianteEdit(null);
  };
  return (
    <div
    style={{margin:'20px', padding:'20px', border:'1px solid #ccc'}}
    >
      <h1>CRUD de Estudiantes</h1>
      {/*Componente de Formulario para crear o editar estudiantes*/}
      <EstudianteForm
        onSubmit={estudianteEdit ? manejarActualizar : manejarCrear} // Determina qué función ejecutar al enviar el formulario
        initialData={estudianteEdit || undefined} // Pasa los datos iniciales si se está editando
        onCancel={estudianteEdit ? cancelarEdicion : undefined} // Pasa la función para cancelar si se está editando
      />
      {/*Componente de tabla para mostrar la lista de estudiantes*/}
      <EstudianteTable
      estudiantes={estudiantes}//Lista de estudiantes a mostrar
      onEdit={iniciarEdicion}//Función para editar al estudiante
      onDelete={manejarEliminar}//Función para eliminar al estudiante
      
      />

    </div>
  );


};
export default App;