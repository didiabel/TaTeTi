import React, { useState, createContext } from "react";

export const Context = createContext(null);

const PageContextProvider = ({ children }) => {
  //nombres de jugadores
  const [jugador1, setJugador1] = useState("");
  const [jugador2, setJugador2] = useState("");

  //A quien le toca?
  const [XoO, setXoO] = useState(null);

  //array of players
  const [players, setPlayers] = useState([
    { player: false, puntaje: 0, jug: "X" },
    { player: false, puntaje: 0, jug: "O" },
  ]);

  //error
  const [errorNoHayJug1, seterrorNoHayJug1] = useState(true);
  const [errorNoHayJug2, seterrorNoHayJug2] = useState(true);

  //states para game.js
  const [confeti, setConfeti] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [empate, setEmpate] = useState(false);
  const [ganno, setGanno] = useState(false);

//estilos para modal
  const customModalStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255,0.15)",
    },
    content: {
      position: "absolute",
      backgroundColor: "white",
      top: "50%",
      left: "50%",
      right: "10%",
      bottom: "-20%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      transition: "linear",
      height: '85%',
      opacity: "100%",
    },
  };
  //clsemodal
  function closeModal() {
    setIsOpen(false);
  }
//datos para game.js
  const [posiciones, setPosiciones] = useState([
    { celda: "A1", valor: "" },
    { celda: "A2", valor: "" },
    { celda: "A3", valor: "" },
    { celda: "B1", valor: "" },
    { celda: "B2", valor: "" },
    { celda: "B3", valor: "" },
    { celda: "C1", valor: "" },
    { celda: "C2", valor: "" },
    { celda: "C3", valor: "" },
  ]);
  let posicionesCopia = [
    { celda: "A1", valor: "" },
    { celda: "A2", valor: "" },
    { celda: "A3", valor: "" },
    { celda: "B1", valor: "" },
    { celda: "B2", valor: "" },
    { celda: "B3", valor: "" },
    { celda: "C1", valor: "" },
    { celda: "C2", valor: "" },
    { celda: "C3", valor: "" },
  ];

  return (
    <Context.Provider
      value={{
        jugador1,
        setJugador1,
        jugador2,
        setJugador2,
        setXoO,
        XoO,
        players,
        setPlayers,
        errorNoHayJug1,
        seterrorNoHayJug1,
        errorNoHayJug2,
        seterrorNoHayJug2,
        customModalStyles,
        posiciones,
        setPosiciones,
        posicionesCopia,
        confeti,
        setConfeti,
        modalIsOpen,
        setIsOpen,
        empate,
        setEmpate,
        ganno,
        setGanno,closeModal
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default PageContextProvider;
