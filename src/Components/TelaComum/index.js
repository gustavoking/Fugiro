import React from "react";
import { useEffect, useState, useContext } from "react";
import firebase from "../../services/firebaseConnection";
import Sensor from "../Sensor";
import { BiLogOut } from "react-icons/bi";

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
      <div className="container-sensores">
        {userVariables.sensorTemperatura > "-1" && (
          <div>
            <Sensor sensor="Temperatura" />
          </div>
        )}

        {userVariables.sensorAgua > "-1" && (
          <div>
            <Sensor sensor="Água" />
          </div>
        )}

        {userVariables.sensorLuminosidade > "-1" && (
          <div>
            <Sensor sensor="Luminosidade" />
          </div>
        )}

        {userVariables.sensorSonar > "-1" && (
          <div>
            {" "}
            <Sensor sensor="Sonar" />{" "}
          </div>
        )}
      </div>
    </div>
  );
}
