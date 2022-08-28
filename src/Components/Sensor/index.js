import { useState, useContext } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiRightArrowCircle } from "react-icons/bi";
import firebase from "../../services/firebaseConnection";
import { AuthContext } from "../../contexts/auth";

import "./styles.css";

export default function Sensor({ sensor, image, unidade, valor }) {
  const [valorInput, setValorInput] = useState("");
  const [switchInput, setSwitchInput] = useState(true);
  const { user } = useContext(AuthContext);

  const textoClassName = `textoColor ${corTextoSensor(sensor, valor)}`;

  function corTextoSensor(sensor, valor) {
    switch (sensor) {
      case "Temperatura":
        return valor < 20 ? "vermelho" : valor > 50 ? "verde" : "laranja";
      case "Água":
        return valor < 20 ? "vermelho" : valor > 50 ? "verde" : "laranja";
      case "Luminosidade":
        return valor < 10 ? "vermelho" : "verde";
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
        if (valor < 10) {
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
      switch (sensor) {
        case "Água":
          return await firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .update({
              sensorAgua: valorInput,
            });
        case "Temperatura":
          return await firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .update({
              sensorTemperatura: valorInput,
            });
        case "Luminosidade":
          return await firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .update({
              sensorLuminosidade: valorInput,
            });
        case "Sonar":
          return await firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .update({
              sensorSonar: valorInput,
            });
      }

      setSwitchInput((value) => !value);
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
      <div className="flexrow">
        {switchInput ? (
          <AiFillEyeInvisible
            color="black"
            size={25}
            style={{ marginLeft: 5, cursor: "pointer" }}
            onClick={() => changeInput()}
          />
        ) : (
          <AiFillEye
            color="black"
            size={25}
            style={{ marginLeft: 5, cursor: "pointer" }}
            onClick={() => changeInput()}
          />
        )}
        <input
          placeholder="  Insira o valor"
          value={valorInput}
          onChange={(e) => setValorInput(e.target.value)}
          className="inputChange"
          disabled={switchInput}
        ></input>

        <div>
          <button onClick={() => handleChange()} className="handleButton">
            <BiRightArrowCircle size={20} color="black" />
          </button>
        </div>
      </div>

      <div>
        <p className={textoClassName}>{textoSensor(sensor, valor)}</p>
      </div>
    </div>
  );
}
