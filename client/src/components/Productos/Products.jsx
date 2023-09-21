import airPodsImage from "../../assets/productos/airpods.jpg";
import appleTVImage from "../../assets/productos/appletv.jpg";
import appleWatchImage from "../../assets/productos/applewatch.jpg";
import ipadAirImage from "../../assets/productos/ipad-air.jpg";
import iPhoneImage from "../../assets/productos/iphone-14-pro.jpg";
import macProImage from "../../assets/productos/macpro.jpg";

const products = [
  {
    id: "1",
    name: "iPhone 13 Pro Max",
    image: iPhoneImage,
    description: "Combina un elegante diseño con un potente rendimiento.",
    price: 999,
  },
  {
    id: "2",
    name: "MacBook Pro",
    image: macProImage,
    description: "Potente y elegante, ideal para profesionales.",
    price: 1999,
  },
  {
    id: "3",
    name: "iPad Air",
    image: ipadAirImage,
    description: "Versátil, portátil e impresionante pantalla.",
    price: 699,
  },
  {
    id: "4",
    name: "Apple Watch Series 7",
    image: appleWatchImage,
    description: "Herramienta de seguimiento de actividad física y salud.",
    price: 500,
  },
  {
    id: "5",
    name: "AirPods Pro",
    image: airPodsImage,
    description: "Sumérgete en un sonido de calidad sin cables.",
    price: 249,
  },
  {
    id: "6",
    name: "Apple TV",
    image: appleTVImage,
    description: "Disfruta de tus contenidos favoritos con Apple TV.",
    price: 149,
  },
];

export default products;