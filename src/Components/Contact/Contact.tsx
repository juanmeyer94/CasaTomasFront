import React, { useState } from "react";
import { Contact } from "../../Interfaces/interfacesIndex";
import useUserContext from "../../Utils/contextUserHook";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const { sendContact } = useUserContext();
  const [contactMessage, setContactMessage] = useState<Contact>({
    userName: "",
    userEmail: "",
    userPhone: "",
    userMessage: "",
    userLocation: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactMessage((prevMessage) => ({
      ...prevMessage,
      [name]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendContact(contactMessage);
    Swal.fire({
      title: "Mensaje enviado",
      text: "Gracias por contactarnos. Nos comunicaremos contigo a la brevedad.",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Ir al inicio",
      cancelButtonText: "Cerrar",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });

    setContactMessage({
      userName: "",
      userEmail: "",
      userMessage: "",
      userLocation: "",
      userPhone: "",
    });
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full flex-shrink-0 overflow-hidden">
        <img
          src="/carousel2.jpg"
          alt=""
          className="w-full h-[38vh] object-fill hidden sm:flex"
        />
        <img
          src="/CarouselCelular2.png"
          alt=""
          className="w-full h-[38vh] object-fill flex sm:hidden "
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full p-6 md:p-12">
        <div className="md:w-1/2 w-full p-4">
          <h2 className="text-2xl font-semibold mb-4">Contacto / Ubicación</h2>
          <p className="mb-4">
            Si desea realizarnos una consulta, por favor complete el siguiente
            formulario y a la brevedad nos comunicaremos con Usted. Muchas
            gracias.
          </p>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Apellido y Nombres
              </label>
              <input
                type="text"
                id="name"
                name="userName"
                value={contactMessage.userName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="userEmail"
                value={contactMessage.userEmail}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="userPhone"
                value={contactMessage.userPhone}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Dirección / Ciudad
              </label>
              <input
                type="text"
                id="address"
                name="userLocation"
                value={contactMessage.userLocation}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <textarea
                id="message"
                name="userMessage"
                rows={4}
                value={contactMessage.userMessage}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Mensaje"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 text-white rounded-md py-2"
            >
              ENVIAR
            </button>
          </form>
        </div>
        <div className="md:w-1/2 w-full p-4">
          <h2 className="text-2xl font-semibold mb-4 border-l-4 border-sky-600 p-10">
            Ubicación
          </h2>
          <div className="w-full h-64 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d213.17740741803863!2d-61.48549166639526!3d-31.252893309368893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95caae5027daa73d%3A0xa2d2614d7776f0d0!2sCasa%20Tomas%20-%20Maquinas%20Para%20Coser%2C%20reparaciones%20y%20Mercer%C3%ADa!5e0!3m2!1ses!2sar!4v1721911671189!5m2!1ses!2sar"
              width="100%"
              height="100%"
              allowFullScreen={true}
              loading="lazy"
              style={{ border: "0" }}
            ></iframe>
            <div className="flex justify-center gap-4 mt-4">
              <a
                href="https://www.facebook.com/casa.tomas.rafaela/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl text-blue-600"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/casatomas.rafaela/?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl text-pink-600"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://wa.me/+5493492279892"
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl text-green-600"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
