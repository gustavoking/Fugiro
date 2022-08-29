import React from "react";
import { useEffect, useState, useContext } from "react";
import firebase from "../../services/firebaseConnection";
import Sensor from "../Sensor";
import { BiLogOut } from "react-icons/bi";
import sol from "../../assets/sol-removebg-preview.png";
import waterA from "../../assets/waterA.png";
import term from "../../assets/term.png";
import sonar from "../../assets/sonar.png";

import { AuthContext } from "../../contexts/auth";

import "./comum.css";

export default function TelaComum() {
  const { signOut, user } = useContext(AuthContext);

  const [userVariables, setUserVariables] = useState({});

  useEffect(() => {
    async function LoadUserVariables() {
      await firebase
        .firestore()
        .collection("users")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            if (doc.id === user.uid) {
              let data = {
                id: doc.id,
                cidade: doc.data().cidade,
                nome: doc.data().nome,
                uf: doc.data().uf,
                tipo: doc.data().tipo,
                sensorLuminosidade: doc.data().sensorLuminosidade,
                sensorAgua: doc.data().sensorAgua,
                sensorSonar: doc.data().sensorSonar,
                sensorTemperatura: doc.data().sensorTemperatura,
              };
              setUserVariables(data);
            }
          });
        });
    }
    LoadUserVariables();
  }, []);

  return (
    <div className="container">
      <div className="header-title">
        <span className="title-fugiro">Fugiro</span>
        <span className="title-agro">Agro</span>
      </div>
      <div className="header-user">
        <button onClick={() => signOut()} className="btn-logout">
          <BiLogOut color="black" size={30} className="icon-out" />
        </button>
        <span> {user.nome} </span>
      </div>
      <span className="title-fazenda">Fazenda do {user.nome}</span>
      <div className="container-sensores">
        {parseInt(userVariables.sensorTemperatura) > parseInt("-1") && (
          <Sensor
            sensor="Temperatura"
            image={term}
            unidade={userVariables.sensorTemperatura + "ºC"}
            valor={parseInt(userVariables.sensorTemperatura)}
          />
        )}

        {parseInt(userVariables.sensorAgua) > parseInt("-1") && (
          <Sensor
            sensor="Água"
            image={waterA}
            unidade={userVariables.sensorAgua + "%"}
            valor={parseInt(userVariables.sensorAgua)}
          />
        )}

        {parseInt(userVariables.sensorLuminosidade) > parseInt("-1") && (
          <Sensor
            sensor="Luminosidade"
            image={sol}
            unidade={userVariables.sensorLuminosidade + "lux"}
            valor={userVariables.sensorLuminosidade}
          />
        )}

        {parseInt(userVariables.sensorSonar) > parseInt("-1") && (
          <Sensor
            sensor="Sonar"
            image={sonar}
            unidade={userVariables.sensorSonar + "%"}
            valor={userVariables.sensorSonar}
          />
        )}
      </div>
    </div>
  );
}
