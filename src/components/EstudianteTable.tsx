//src/components/EstudianteTable.tsx
import React from 'react';
import { Estudiante } from '../types';

//Definimos las propiedades que recibirá este componente
interface EstudianteTableProps {
    //Lista de estudiantes
    estudiantes: Estudiante[];//Lista de estudiantes a mostrar
    onEdit: (estudiante: Estudiante) => void;// Función cuando se edite
    onDelete: (id: number) => void;//Función para eliminar al estudiante    
}

//Definimos el componente funcional EstudianteTable
const EstudianteTable: React.FC<EstudianteTableProps> = ({estudiantes, onEdit, onDelete}) => {
    return (
        <table
        border={1}
        cellPadding={10}
        cellSpacing={0}
        style={{width:'100%', textAlign:'center'}}
        >   
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Acciones</th>
                </tr> 
            </thead>
            <tbody>
                {estudiantes.map((estudiante) => (
                    <tr key={estudiante.id}>
                        {/* Muestra cada campo del estudiante en un celda */}
                        <td>{estudiante.id}</td>
                        <td>{estudiante.codigo}</td>
                        <td>{estudiante.nombre}</td>
                        <td>{estudiante.apellido}</td>
                        <td>{estudiante.email}</td>
                        <td>
                            {/* Botón para editar Estudiante, llama a onEdir*/}
                            <button onClick={() => onEdit(estudiante)}>Editar</button>
                            {/* Botón para Eliminar Estudiante, llama a onDelete*/}
                            {/*Con el id del estudiante*/}
                            <button 
                            onClick={() => onDelete(estudiante.id)}
                            style={{marginLeft:'10px'}}
                            >                                
                            Eliminar</button>
                        </td>
                    </tr>
                 ))}
                    
            </tbody> 
        </table>
    )
};
export default EstudianteTable;
//Exportamos el componente para su uso en otros archivos