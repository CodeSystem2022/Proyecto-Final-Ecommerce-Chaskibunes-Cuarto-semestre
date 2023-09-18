import './layoutStyle.css';
const layout = ({children}) => {
  return (
    <div>
        <div>{children}</div> {/* Renderizamos los elementos hijos dentro de un contenedor div. */}
    </div>
  )
}

export default layout;
