import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import firebase from "../../services/firebaseConnection";
import Sensor from "../../Components/Sensor";
import { BiArrowBack } from "react-icons/bi";
import { BsPlusCircle } from 'react-icons/bs'
import Modal from 'react-modal'

import sol from "../../assets/sol-removebg-preview.png";
import waterA from "../../assets/waterA.png";
import term from "../../assets/term.png";
import sonar from "../../assets/sonar.png";

import "./fazenda.css";

export default function ViewFazenda() {
    const { id } = useParams();

    const [userValue, setUserValue] = useState({}) 
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [sensorLuminosidade, setSensorLuminosidade] = useState("-1");
    const [sensorAgua, setSensorAgua] = useState("-1");
    const [sensorSonar, setSensorSonar] = useState("-1");
    const [sensorTemperatura, setSensorTemperatura] = useState("-1");

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

    Modal.setAppElement('#root');

    function openModal(){
        setModalIsOpen(true)
    }

    function closeModal(){
        setModalIsOpen(false)
    }

    async function addSensores(e){
        e.preventDefault()
        if(sensorLuminosidade === '1'){
            await firebase.firestore().collection('users').doc(id)
            .update({sensorLuminosidade: '0'})
        }
        
        if(sensorAgua === '1'){
            await firebase.firestore().collection('users').doc(id)
            .update({sensorAgua: '0'})
        }
        
        if(sensorSonar === '1'){
            await firebase.firestore().collection('users').doc(id)
            .update({sensorSonar: '0'})
        }
        
        if(sensorTemperatura === '1'){
            await firebase.firestore().collection('users').doc(id)
            .update({sensorTemperatura: '0'})
        }

        window.location.reload()
    }


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
            usedFor={'master'}
            uidUser={id}
            sensorSelect='sensorSonar'
            />
        )}
        
        </div>

                <div className='container-button'>
                    <button className='buttonAdd-sensor' onClick={openModal}>
                        <BsPlusCircle size={20} color='black'/>
                        <span>Adicionar sensor</span>
                    </button>

                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        overlayClassName='modal-overlay'
                        className='modal-content'
                    >
                        <button onClick={closeModal}>Close</button>

                        <div className='container-options'>

                            {userValue.sensorLuminosidade < 0 && (
                                <div className='sensor-option'>
                                <span>Sensor de Luminosidade</span>
                                <input
                                type='checkbox'
                                value={sensorLuminosidade}
                                onChange={() => {
                                    {
                                      sensorLuminosidade === "-1"
                                        ? setSensorLuminosidade("1")
                                        : setSensorLuminosidade("-1");
                                    }
                                  }}/>
                            </div>)}

                            {userValue.sensorAgua < 0 && (
                                <div className='sensor-option'>
                                <span>Sensor de Agua</span>
                                <input
                                type='checkbox'
                                value={sensorAgua}
                                onChange={() => {
                                    {
                                      sensorAgua === "-1"
                                        ? setSensorAgua("1")
                                        : setSensorAgua("-1");
                                    }
                                  }}/>
                            </div>)}

                            {userValue.sensorSonar < 0 && (
                                <div className='sensor-option'>
                                <span>Sensor Sonar</span>
                                <input
                                type='checkbox'
                                value={sensorSonar}
                                onChange={() => {
                                    {
                                      sensorSonar === "-1"
                                        ? setSensorSonar("1")
                                        : setSensorSonar("-1");
                                    }
                                  }}/>
                            </div>)}

                            {userValue.sensorTemperatura < 0 && (
                                <div className='sensor-option'>
                                <span>Sensor de Temperatura</span>
                                <input
                                type='checkbox'
                                value={sensorTemperatura}
                                onChange={() => {
                                    {
                                      sensorTemperatura === "-1"
                                        ? setSensorTemperatura("1")
                                        : setSensorTemperatura("-1");
                                    }
                                  }}/>
                            </div>)}

                            
                            {userValue.sensorAgua > -1 &&
                            userValue.sensorLuminosidade > -1 &&
                            userValue.sensorSonar > -1 &&
                            userValue.sensorTemperatura > -1 &&
                            <span>Todos os sensores estão habilitados</span>}

                            <button className='add-sensores' onClick={(e) => addSensores(e)}>Ok</button>

                        </div>
                    </Modal>
                </div>

        </div>
    );
}  
    
