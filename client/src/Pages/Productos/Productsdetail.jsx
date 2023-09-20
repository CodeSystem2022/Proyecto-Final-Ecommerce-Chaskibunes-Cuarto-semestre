import airPodsImage from "../../assets/productos/airpods.jpg";
import appleTVImage from "../../assets/productos/appletv.jpg";
import appleWatchImage from "../../assets/productos/applewatch.jpg";
import ipadAirImage from "../../assets/productos/ipad-air.jpg";
import iPhoneImage from "../../assets/productos/iphone-14-pro.jpg";
import macProImage from "../../assets/productos/macbookpro.jpg";

const products = [
  {
    id: "1",
    name: "iPhone 13 Pro Max",
    image: iPhoneImage,
    description: `El iPhone 13 Pro Max es el modelo más avanzado de la última
    generación de iPhones. Con una potente cámara triple, un rendimiento
    excepcional y una pantalla Super Retina XDR, ofrece una experiencia
    incomparable en un smartphone`,
    price: 999,
    category: "iPhone"
  },
  {
    id: "2",
    name: "MacBook Pro",
    image: macProImage,
    description: `La Mac Pro es una potente estación de trabajo diseñada para
    profesionales creativos y técnicos. Con un rendimiento excepcional y
    una capacidad de personalización sin igual, es ideal para tareas de
    diseño, edición de video, desarrollo de software y más.`,
    price: 1999,
    category: "MacBook",
  },
  {
    id: "3",
    name: "iPad Air",
    image: ipadAirImage,
    description: `El iPad Air combina potencia y versatilidad en un diseño delgado y ligero.
    Con su impresionante pantalla Liquid Retina y el potente chip A14 Bionic,
    es perfecto para trabajar y jugar en cualquier lugar.`,
    price: 699,
    category: "iPad Air",
  },
  {
    id: "4",
    name: "Apple Watch Series 7",
    image: appleWatchImage,
    description: `El Apple Watch es mucho más que un reloj. Con características como
    monitorización de la salud, seguimiento de actividad y acceso a
    notificaciones, te ayuda a mantenerte conectado y en forma durante
    todo el día.`,
    price: 500,
    category: "Apple Watch",
  },
  {
    id: "5",
    name: "AirPods Pro",
    image: airPodsImage,
    description: `El Apple TV te brinda acceso a una amplia variedad de contenido de
    entretenimiento, desde películas y programas de televisión hasta
    juegos y aplicaciones. Disfruta de una experiencia de visualización
    inmersiva y conéctate con tus plataformas de transmisión favoritas.`,
    price: 249,
    category: "Airpods Pro",
  },
  {
    id: "6",
    name: "Apple TV",
    image: appleTVImage,
    description: `Los AirPods Pro ofrecen un sonido envolvente con cancelación de ruido
    activa para una experiencia auditiva excepcional. Su diseño compacto y
    ergonómico los hace cómodos de usar durante todo el día. Conéctate
    fácilmente a tus dispositivos Apple y disfruta de una calidad de audio
    superior.`,
    price: 149,
    category: "TV & Home",
  },
];

export default products;