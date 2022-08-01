import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { Context } from '../../Store/appContext';

const StartUp = () => {
  const {
    setJugador1,
    setJugador2,
    setXoO,
    jugador1,
    jugador2,
    players,
    setPlayers,
    errorNoHayJug1,
    seterrorNoHayJug1,
    errorNoHayJug2,
    seterrorNoHayJug2,
  } = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [sameNames, setSameNames] = useState(false);

  const setJugador1Function = (e, jug) => {
    let newPlayer = players.map((pl) => {
      if (pl.jug === jug) {
        pl.player = e;
      }
      return pl;
    });
    setPlayers(newPlayer);
    if (jugador1.length >= 10) {
      setJugador1(jugador1.slice(0, -1));
    } else {
      setJugador1(e);
    }
    seterrorNoHayJug1(false);
    if (e === '') {
      seterrorNoHayJug1(true);
    }
  };
  const setJugador2Function = (e, jug) => {
    let newPlayer = players.map((pl) => {
      if (pl.jug === jug) {
        pl.player = e;
      }
      return pl;
    });
    setPlayers(newPlayer);
    if (jugador2.length >= 10) {
      setJugador2(jugador2.slice(0, -1));
    } else {
      setJugador2(e);
    }
    seterrorNoHayJug2(false);
    if (e === '') {
      seterrorNoHayJug2(true);
    }
  };
  let navigate = useNavigate();
  const arranca = (empieza) => {
    setSameNames(false);
    let playersAreValid = true;
    for (let i = 0; i < players.length; i++) {
      if (!players[i].player || !(players[i].player.length <= 9)) {
        playersAreValid = false;
        console.log();
        break;
      }
    }
    if (players[0].player === players[1].player) {
      return setSameNames(true);
    } else if (!playersAreValid && sameNames === false) return;
    setLoading(true);
    setTimeout(function () {
      setXoO(empieza);
      navigate('/TaTeTi/juego');
    }, 2000);
  };
  return (
    <>
      <div className="d-flex justify-content-around  align-items-center vh-100">
        <div className="startup">
          {loading ? (
            <div className="d-flex justify-content-around  align-items-center">
              <TailSpin color="#00BFFF" height={40} width={40} />
            </div>
          ) : (
            <div className="startUpBox border rounded shadow-xl p-5">
              <div className="text-center ">
                <h1>TaTeTi</h1>
                <h3>Elijan sus nombres y luego quien empieza</h3>
                <p className={sameNames ? 'text-danger' : 'd-none'}>
                  Los nombres no pueden ser iguales
                </p>
              </div>
              <div className="d-flex justify-content-center mt-5">
                <div className=" palabraStartUp text-center m-3">
                  <h1
                    className="palabraStartUp d-flex justify-content-around align-items-center"
                    style={{ height: '100px' }}
                  >
                    {jugador1}
                  </h1>
                  <input
                    className={'m-2 '}
                    value={jugador1}
                    onChange={(e) => setJugador1Function(e.target.value, 'X')}
                    placeholder="Jugador 1"
                  ></input>
                  <div style={{ height: '40px' }}>
                    <h6 className={errorNoHayJug1 ? 'text-danger' : 'd-none'}>
                      Completa el Jugador 1
                    </h6>
                    <h6
                      className={
                        jugador1.length >= 10 ? 'text-danger' : 'd-none'
                      }
                    >
                      (Debe ser menos de 10 letras)
                    </h6>
                  </div>
                </div>
                <h2 className="d-flex justify-content-around align-items-center mt-5">
                  vs
                </h2>
                <div className="palabraStartUp text-center m-3">
                  <h1
                    className=" d-flex justify-content-around align-items-center"
                    style={{ height: '100px' }}
                  >
                    {jugador2}
                  </h1>
                  <input
                    className={'m-2'}
                    value={jugador2}
                    onChange={(e) => setJugador2Function(e.target.value, 'O')}
                    placeholder="Jugador 2"
                  ></input>
                  <div style={{ height: '40px' }}>
                    <h6 className={errorNoHayJug2 ? 'text-danger' : 'd-none'}>
                      Completa el Jugador 2
                    </h6>
                    <h6
                      className={
                        jugador2.length >= 10 ? 'text-danger' : 'd-none'
                      }
                    >
                      (Debe ser menos de 10 letras)
                    </h6>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-around">
                <div
                  className="btn btn-dark m-1 text-center"
                  onClick={() => arranca('X')}
                >
                  <h4>X</h4>
                </div>
                <div
                  className="btn btn-dark m-1 text-center"
                  onClick={() => arranca('O')}
                >
                  <h4>O</h4>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-around  align-items-center vh-100"></div>
    </>
  );
};

export default StartUp;
