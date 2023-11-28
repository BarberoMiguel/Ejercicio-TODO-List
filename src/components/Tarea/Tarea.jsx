// rfce
import React from "react";

function Tarea({title, deleteTarea}) {
  return (
    <article>
      <form>
        <input type="checkbox" name="tarea"></input>
        <label htmlFor="tarea">{title}</label>
        <button onClick={deleteTarea}>Borrar</button>
      </form>
      
    </article>
  );
}

export default Tarea;
