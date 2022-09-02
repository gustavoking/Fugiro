import { useState, useContext } from "react";
import { IoLockClosed, IoLockOpenOutline } from "react-icons/io5";
import { FiChevronRight, FiTrash2 } from "react-icons/fi";
import firebase from "../../services/firebaseConnection";
import { AuthContext } from "../../contexts/auth";

import "./styles.css";
import { toast } from "react-toastify";

export default function Sensor({
  sensor,
  image,
  unidade,
  valor,
  usedFor,
  uidUser,
  sensorSelect,
}) {
  const [valorInput, setValorInput] = useState("");
  const [switchInput, setSwitchInput] = useState(true);
  const { user } = useContext(AuthContext);

  const textoClassName = `textoColor ${corTextoSensor(sensor, valor)}`;
  const inputClassName = `sizeInput ${backgroundInput()}`;

  async function deleteSensor(uidUser, sensorSelect, e) {
    e.preventDefault();
    switch (sensorSelect) {
      case "sensorAgua":
        return await firebase
          .firestore()
          .collection("users")
          .doc(uidUser)
          .update({ sensorAgua: -999 })
          .then(() => {
            window.location.reload();
          });

      case "sensorLuminosidade":
        return await firebase
          .firestore()
          .collection("users")
          .doc(uidUser)
          .update({ sensorLuminosidade: -999 })
          .then(() => {
            window.location.reload();
          });

      case "sensorSonar":
        return await firebase
          .firestore()
          .collection("users")
          .doc(uidUser)
          .update({ sensorSonar: -999 })
          .then(() => {
            window.location.reload();
          });

      case "sensorTemperatura":
        return await firebase
          .firestore()
          .collection("users")
          .doc(uidUser)
          .update({ sensorTemperatura: -999 })
          .then(() => {
            window.location.reload();
          });
    }
  }

  function backgroundInput() {
    switch (!switchInput) {
      case false:
        return "transparente";
      case true:
        return "preto";
    }
  }

  function corTextoSensor(sensor, valor) {
    switch (sensor) {
      case "Temperatura":
        return valor < 20 ? "vermelho" : valor > 50 ? "verde" : "laranja";
      case "Água":
        return valor < 20 ? "vermelho" : valor > 50 ? "verde" : "laranja";
      case "Luminosidade":
        return valor < 1 ? "vermelho" : "verde";
      case "Sonar":
        return valor < 20 ? "vermelho" : valor > 50 ? "verde" : "laranja";
    }
  }

  function textoSensorValor(sensor, valor) {
    switch (sensor) {
      case "Temperatura":
        if (valor < 20) {
          return "baixo";
        } else if (valor > 50) {
          return "alto";
        } else {
          return "médio";
        }
      case "Água":
        if (valor < 20) {
          return "baixo";
        } else if (valor > 50) {
          return "alto";
        } else {
          return "médio";
        }
      case "Luminosidade":
        if (valor < 1) {
          return "desligado";
        } else {
          return "ligado";
        }
      case "Sonar":
        if (valor < 20) {
          return "baixo";
        } else if (valor > 50) {
          return "alto";
        } else {
          return "médio";
        }
    }
  }

  function textoSensor(sensor, valor) {
    switch (sensor) {
      case "Temperatura":
        return `aquecimento ${textoSensorValor(sensor, valor)}`;
      case "Água":
        return `reservatório ${textoSensorValor(sensor, valor)}`;
      case "Luminosidade":
        return `luzes ${textoSensorValor(sensor, valor)}`;
      case "Sonar":
        return `armazenamento ${textoSensorValor(sensor, valor)}`;
    }
  }

  const changeInput = () => {
    setSwitchInput((value) => !value);
  };

  const handleChange = async () => {
    if (!switchInput && valorInput !== "") {
      if (
        sensor === "Temperatura" &&
        parseInt(valorInput) > -100 &&
        parseInt(valorInput) < 60
      ) {
        return await firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .update({
            sensorTemperatura: valorInput,
          })
          .then(() => {
            window.location.reload();
          });
      } else if (parseInt(valorInput) >= 0 && parseInt(valorInput) < 101) {
        switch (sensor) {
          case "Água":
            return await firebase
              .firestore()
              .collection("users")
              .doc(user.uid)
              .update({
                sensorAgua: valorInput,
              })
              .then(() => {
                window.location.reload();
              });

          case "Luminosidade":
            return await firebase
              .firestore()
              .collection("users")
              .doc(user.uid)
              .update({
                sensorLuminosidade: valorInput,
              })
              .then(() => {
                window.location.reload();
              });
          case "Sonar":
            return await firebase
              .firestore()
              .collection("users")
              .doc(user.uid)
              .update({
                sensorSonar: valorInput,
              })
              .then(() => {
                window.location.reload();
              });
        }
        setSwitchInput((value) => !value);
      } else {
        if (sensor === "Temperatura") {
          toast.error("A temperatura vai de -100 a 60 ");
        } else if (sensor === "Luminosidade") {
          toast.error("A luminosidade só aceita valores positivos");
        } else if (sensor === "Sonar") {
          toast.error("O nível sonar vai somente de 0 a 100%");
        } else if (sensor === "Água") {
          toast.error("O nível de água vai somente de 0 a 100%");
        }
      }
    } else {
      toast.error("Digite um numero");
    }
  };

  return (
    <div className="container-sensor">
      <div>
        <span>{sensor}</span>
      </div>
      <div>
        <img className="imagem" src={image} />
      </div>
      <div>
        <p className="unity">{unidade}</p>
      </div>
      {usedFor === "comum" && (
        <div className="flexrow">
          {switchInput ? (
            <IoLockClosed
              color="black"
              size={25}
              style={{ marginLeft: 5, cursor: "pointer" }}
              onClick={() => changeInput()}
            />
          ) : (
            <IoLockOpenOutline
              color="black"
              size={25}
              style={{ marginLeft: 5, cursor: "pointer" }}
              onClick={() => changeInput()}
            />
          )}
          <input
            placeholder="..."
            type="number"
            value={valorInput}
            onChange={(e) => setValorInput(e.target.value)}
            className={inputClassName}
            disabled={switchInput}
          ></input>

          <div>
            <button
              disabled={switchInput}
              onClick={() => handleChange()}
              className="handleButton"
            >
              <FiChevronRight
                size={20}
                color={!switchInput ? "black" : "#E2DFD2"}
              />
            </button>
          </div>
        </div>
      )}

      {usedFor === "master" && (
        <button
          className="botao-sens"
          onClick={(e) => deleteSensor(uidUser, sensorSelect, e)}
        >
          <FiTrash2 size={28} color="black" />
        </button>
      )}

      <div className="porfora">
        <p className={textoClassName}>{textoSensor(sensor, valor)}</p>
      </div>
    </div>
  );
}
