import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from "uuid";
import Tarea from "./components/Tarea";

function App() {
  const initialData = [
    {
      title: "Levantarme",
      id: uuidv4()
    },
    {
      title: "Desayunar",
      id: uuidv4()
    },
    {
      title: "Lavarme los dientes",
      id: uuidv4()
    },
  ];
  const [data, setData] = useState({}); // Tareas actuales
  const [tareas, setList] = useState(initialData); //[{},{},{}] Tareas iniciales
  const [formData, setFormData] = useState({nuevaTarea: ""});

  const [mostrarBotón, setMostrarBotón] = useState(false);

  const handleChange = (e) => {
    // Actualiza el estado del formulario mientras el usuario escribe
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    setMostrarBotón(true);
    setTimeout(() => {
      setMostrarBotón(false);
      setFormData({nuevaTarea: ""});
    }, 20000);
  };

  const deleteTarea = (taskId) => {
    const remainingTasks = tareas.filter((task) => task.id !== taskId);
    setList(remainingTasks);
  };

  const paintTareas = () => {
    // Leer estado array deseos y devolver array componentes producto
    // [{},{},{}] -->[<Product>,<Product>,<Product>]
    return tareas.map((task) => (
      <Tarea
        key={task.id}
        title={task.title}
        deleteTarea={()=>deleteTarea(task.id)}
      />
    ));
  };

  const clearTareas = () => {
    setList([]); // vaciar lista de Tareas (state)
  };

  const resetTareas = () => {
    // Cargar al estado incial
    setList(initialData); // Recargar lista de tareas (state)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.nuevaTarea.value;

    if (title.length < 6) {
      alert("La tarea debe de tener al menos 6 caracteres")
    } else {
      const myNewTask = { id: uuidv4(), title }; // Asignar un id único

      const confirmated = confirm(`¿Desea crear la tarea ${title}?`);

      if(confirmated){
        setData(myNewTask); // {} tarea
        setList([...tareas, myNewTask]); // [{},{},{},{}] lista de tareas
        setFormData({nuevaTarea: ""})
        alert("Tarea creada");
      }
    }
  }

  return (
    <>
      <h2>Lista de Tareas</h2>
      <button onClick={clearTareas}>Limpiar</button>
      <button onClick={resetTareas}>Recargar</button>
      <br /><br />

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Nueva Tarea:  </label>
        <input type="text" name="nuevaTarea" value={formData.nuevaTarea} onChange={handleChange}/><br />

        {mostrarBotón && <button type="submit">Crear Tarea</button>}
      </form>
      <br />

      <section>{paintTareas()}</section>

    </>
  );
}

export default App
