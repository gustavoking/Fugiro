import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import firebase from "../../services/firebaseConnection";
import Sensor from "../../Components/Sensor";
import { BiArrowBack } from "react-icons/bi";
import sol from "../../assets/sol-removebg-preview.png";
import waterA from "../../assets/waterA.png";
import term from "../../assets/term.png";
import sonar from "../../assets/sonar.png";

import "./fazenda.css";

export default function ViewFazenda() {
  const { id } = useParams();

  const [userValue, setUserValue] = useState({});

  useEffect(() => {
    async function LoadFazenda() {
      await firebase
        .firestore()
        .collection("users")
        .doc(id)
        .get()
        .then((snapshot) => {
          let data = {
            id: id,
            cidade: snapshot.data().cidade,
            nome: snapshot.data().nome,
            uf: snapshot.data().uf,
            tipo: snapshot.data().tipo,
            sensorLuminosidade: snapshot.data().sensorLuminosidade,
            sensorAgua: snapshot.data().sensorAgua,
            sensorSonar: snapshot.data().sensorSonar,
            sensorTemperatura: snapshot.data().sensorTemperatura,
          };

          console.log(data);
          setUserValue(data);
        });
    }

    LoadFazenda();
  }, []);

  return (
    <div className="container">
      <div className="header-title">
        <span className="title-fugiro">Fugiro</span>
        <span className="title-agro">Agro</span>
      </div>

      <div className="header-user">
        <Link to="/dashboard">
          <BiArrowBack size={30} color="black" className="icon" />
        </Link>

        <span className="title-fazenda">{`Fazenda ${userValue.nome}`}</span>
      </div>

      <div className="container-sensores">
        {parseInt(userValue.sensorTemperatura) < 60 &&
          parseInt(userValue.sensorTemperatura) > -100 && (
            <Sensor
              sensor="Temperatura"
              image={term}
              unidade={userValue.sensorTemperatura + "ºC"}
              valor={parseInt(userValue.sensorTemperatura)}
              usedFor={"master"}
              uidUser={id}
              sensorSelect="sensorTemperatura"
            />
          )}

        {parseInt(userValue.sensorAgua) < 101 &&
          parseInt(userValue.sensorAgua) > -1 && (
            <Sensor
              sensor="Agua"
              image={waterA}
              unidade={userValue.sensorAgua + "%"}
              valor={parseInt(userValue.sensorAgua)}
              usedFor={"master"}
              uidUser={id}
              sensorSelect="sensorAgua"
            />
          )}

        {parseInt(userValue.sensorLuminosidade) > -1 && (
          <Sensor
            sensor="Luminosidade"
            image={sol}
            unidade={userValue.sensorLuminosidade + "lux"}
            valor={parseInt(userValue.sensorLuminosidade)}
            usedFor="master"
            uidUser={id}
            sensorSelect="sensorLuminosidade"
          />
        )}

        {parseInt(userValue.sensorSonar) < 101 &&
          parseInt(userValue.sensorSonar) > -1 && (
            <Sensor
              sensor="Sonar"
              image={sonar}
              unidade={userValue.sensorSonar + "%"}
              valor={parseInt(userValue.sensorSonar)}
              usedFor="master"
              uidUser={id}
              sensorSelect="sensorSonar"
            />
          )}
      </div>
    </div>
  );
}
