import React, { useContext, useEffect } from "react";
import { Context } from "../../Store/appContext";
import "./Game.css";
import Confetti from "react-confetti";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import ShareButton from "react-social-share-buttons";

const Game = () => {
  const {
    XoO,
    setXoO,
    jugador1,
    jugador2,
    players,
    setPlayers,
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
  } = useContext(Context);

  //funcion ir a inicio
  let navigate = useNavigate();

  const inicio = () => {
    setEmpate(false);
    setConfeti(false);
    setIsOpen(false);
    setPosiciones(posicionesCopia);
    navigate("/TaTeTi/");
  };

  //si algun jugador no tiene nombre ir al inicio
  if (!jugador1 || !jugador2) {
    setTimeout(() => {
      navigate("/TaTeTi/");
    }, 3000);
  }

  const bloque = (celda) => {
    let newPosiciones = posiciones.map((item) => {
      if (item.celda === celda && item.valor === "") {
        if (XoO === "X") {
          item.valor = 1;
          setXoO("O");
        } else {
          item.valor = 0;
          setXoO("X");
        }
      } else {
        return item;
      }
      return item;
    });

    setPosiciones(newPosiciones);
  };

  let a1 = posiciones[0].valor;
  let a2 = posiciones[1].valor;
  let a3 = posiciones[2].valor;
  let b1 = posiciones[3].valor;
  let b2 = posiciones[4].valor;
  let b3 = posiciones[5].valor;
  let c1 = posiciones[6].valor;
  let c2 = posiciones[7].valor;
  let c3 = posiciones[8].valor;

  const otraRonda = () => {
    setPosiciones(posicionesCopia);
    if (XoO === "X") {
      setXoO("O");
    } else {
      setXoO("X");
    }
    closeModal();
    setEmpate(false);
    setConfeti(false);
  };
  const resetPuntaje = () => {
    let reseted = players.map((l) => {
      l.puntaje = 0;
      return l;
    });
    setPlayers(reseted);
  };
  useEffect(() => {
    if (
      a1 + a2 + a3 === 3 ||
      a1 + a2 + a3 === 0 ||
      b1 + b2 + b3 === 3 ||
      b1 + b2 + b3 === 0 ||
      c1 + c2 + c3 === 3 ||
      c1 + c2 + c3 === 0 ||
      a1 + b1 + c1 === 3 ||
      a1 + b1 + c1 === 0 ||
      a2 + b2 + c2 === 3 ||
      a2 + b2 + c2 === 0 ||
      a3 + b3 + c3 === 3 ||
      a3 + b3 + c3 === 0 ||
      a1 + b2 + c3 === 3 ||
      a1 + b2 + c3 === 0 ||
      a3 + b2 + c1 === 3 ||
      a3 + b2 + c1 === 0
    ) {
      setGanno(true);
      let nuevoPunto = players.map((jug) => {
        if (jug.jug !== XoO) {
          jug.puntaje++;
          setIsOpen(true);
          setConfeti(true);
          setTimeout(function () {
            setConfeti(false);
          }, 100000);
        }
        return jug;
      });
      setPlayers(nuevoPunto);
    } else {
      setGanno(false);
      if (
        a1 !== "" &&
        a2 !== "" &&
        a3 !== "" &&
        b1 !== "" &&
        b2 !== "" &&
        b3 !== "" &&
        c1 !== "" &&
        c2 !== "" &&
        c3 !== ""
      ) {
        setEmpate(true);
        setIsOpen(true);
      }
    }
  }, [posiciones]);
  return (
    <div>
      {!jugador1 || !jugador2 ? (
        <div className="d-flex justify-content-around align-items-center vh-100">
          <TailSpin color="#00BFFF" height={40} width={40} />
        </div>
      ) : (
        <div className="vh-100 ">
          {" "}
          <button className="btn outline-primary m-1">
            <h1 className="text-primary float" onClick={() => inicio()}>
              ⬅
            </h1>
          </button>
          <div className="d-flex justify-content-around align-items-center ">
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customModalStyles}
              ariaHideApp={false}
            >
              <div className="d-flex justify-content-around align-items-center">
                <h2>
                  {empate
                    ? "Empataron :("
                    : XoO === players[1].jug
                    ? "Ganaste! " + players[0].player
                    : "Ganaste! " + players[1].player}
                </h2>
              </div>
              <div className="d-flex justify-content-around align-items-center">
                <div>
                  <h5 className="d-flex justify-content-around">
                    El conteo va:{" "}
                  </h5>
                  <div className="d-flex justify-content-around align-items-center">
                    <div className="m-3">
                      <p className="bg-secondary rounded p-3">
                        {players[0].puntaje}
                      </p>
                    </div>
                    <h4>
                      {players[0].player} vs {players[1].player}
                    </h4>
                    <div className="m-3">
                      <p className="bg-secondary rounded p-3">
                        {players[1].puntaje}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-around">
                    <button
                      className="btn btn-success "
                      onClick={() => resetPuntaje()}
                    >
                      Resetear Conteo
                    </button>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-around align-items-center m-4 ">
                <div className="cajaModal row d-flex justify-content-center align-items-center">
                  {posiciones.map((element) => {
                    return (
                      <div
                        key={element.celda}
                        id={element.celda}
                        className="celdaModal col-4 border d-flex justify-content-around align-items-center"
                      >
                        <h1
                          className={element.valor === 1 ? "colorx" : "coloro"}
                        >
                          {element.valor === 1
                            ? "X"
                            : element.valor === 0
                            ? "O"
                            : ""}
                        </h1>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="d-flex justify-content-around align-items-center m-3 ">
                <button className="btn btn-dark" onClick={() => inicio()}>
                  Inicio
                </button>
                <button className="btn btn-success" onClick={() => otraRonda()}>
                  Jugar Otra Ronda
                </button>
                <button className="btn btn-danger" onClick={closeModal}>
                  Cerrar
                </button>
              </div>
              <div className="d-flex justify-content-around align-items-center">
                <ShareButton
                  compact
                  socialMedia={"facebook"}
                  url={"https://didiabel.github.io/TaTeTi/"}
                  text="Juga Al TaTeTi"
                />
                <ShareButton
                  compact
                  socialMedia={"twitter"}
                  url={"https://didiabel.github.io/TaTeTi/"}
                  text="Juga Al TaTeTi"
                />
              </div>
            </Modal>
            {confeti ? <Confetti className="confeti" /> : ""}
            <div className="startUpBox border rounded p-5">
              <div className="d-flex justify-content-between">
                <h1>
                  {players[0].player} "{players[0].jug}"
                </h1>
                <p></p>
                <h1> vs </h1>
                <p></p>
                <h1>
                  "{players[1].jug}" {players[1].player}
                </h1>
              </div>
              <div className="d-flex justify-content-between">
                {players.map((l) => {
                  return (
                    <div key={l.jug} className="d-flex ">
                      <h1> {l.puntaje}</h1>
                    </div>
                  );
                })}
              </div>
              <h2
                className={ganno ? "d-none" : "d-flex justify-content-around"}
              >
                {XoO === "X"
                  ? "Le toca a: " + players[0].player
                  : "Le toca a: " + players[1].player}
              </h2>
              <h2
                className={ganno ? "d-flex justify-content-around" : "d-none"}
              >
                {XoO === "X"
                  ? "Ganaste: " + players[0].player
                  : "Ganaste: " + players[1].player}
              </h2>
              <div className="d-flex justify-content-around align-items-center ">
                <div className="caja row d-flex justify-content-center align-items-center">
                  {posiciones.map((element) => {
                    return (
                      <div
                        key={element.celda}
                        id={element.celda}
                        className="celda col-4 border d-flex justify-content-around align-items-center"
                        onClick={
                          ganno
                            ? () => setIsOpen(true)
                            : () => bloque(element.celda)
                        }
                      >
                        <h1
                          className={element.valor === 1 ? "colorx" : "coloro"}
                        >
                          {element.valor === 1
                            ? "X"
                            : element.valor === 0
                            ? "O"
                            : ""}
                        </h1>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="d-flex justify-content-around  align-items-center vh-100"></div>
    </div>
  );
};

export default Game;
