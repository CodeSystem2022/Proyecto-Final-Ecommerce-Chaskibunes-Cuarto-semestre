import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// Importa las acciones selectActiveFilter y setActiveFilter del archivo "FilterSlice.js" que esta en reducer
import {
  selectActiveFilter,
  setActiveFilter,
} from "../../reducer/FilterSlice.js";

const FilterBar = () => {
  // Obtenemos la función dispatch del store de Redux utilizando el hook useDispatch
  const dispatch = useDispatch();
  // Obtenemos el valor del filtro activo del store de Redux utilizando el selector selectAc
  const activeFilter = useSelector(selectActiveFilter);

  // Definimos un arreglo de objetos que representan diferentes opciones de filtro
  const filters = [
    { name: "All", value: "all" },
    { name: "iPhone", value: "iPhone" },
    { name: "iPad", value: "iPad Air" },
    { name: "TV & Home", value: "TV & Home" },
    { name: "Airpods", value: "Airpods Pro" },
    { name: "Watch", value: "Apple Watch" },
    { name: "Mac", value: "MacBook" },
  ];
  // Define una función para manejar el cambio de filtro
  const handleFilterChange = (filterValue) => {
    // Despacha la acción setActiveFilter para actualizar el filtro activo en el store de Redux
    dispatch(setActiveFilter(filterValue));
  };

  return (
    <ButtonGroup className="mb-2">
      {filters.map((filter) => (
        <ToggleButton
          key={filter.value}
          id={`filter-${filter.value}`}
          type="radio"
          variant="outline-primary"
          name="filters"
          value={filter.value}
          onChange={() => handleFilterChange(filter.value)}
          checked={activeFilter === filter.value}
        >
          {filter.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
};

export default FilterBar;
