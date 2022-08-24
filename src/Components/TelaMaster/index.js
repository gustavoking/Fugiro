import React from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiLogOut, BiUserCheck } from "react-icons/bi";
import { FiUserPlus, FiTrash2 } from "react-icons/fi";
import firebase from "../../services/firebaseConnection";
import { toast } from "react-toastify";

import { AuthContext } from "../../contexts/auth";
import "./master.css";

export default function TelaMaster() {
  const { signOut, user } = useContext(AuthContext);

  const [listaFazendas, setListaFazendas] = useState([]);

  useEffect(() => {
    async function LoadListaFazendas() {
      await firebase
        .firestore()
        .collection("users")
        .get()
        .then((snapshot) => {
          setListaFazendas([]);
          snapshot.forEach((doc) => {
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
            setListaFazendas((oldArray) => [...oldArray, data]);
          });
        });
    }
    LoadListaFazendas();
  }, []);

  const handleDelete = async (id) => {
    await firebase.firestore().collection("users").doc(id).delete();
    toast.success("Usuário Excluido Com Sucesso!");
  };

  return (
    <div className="container">
      <div className="header-title">
        <span className="title-fugiro">Fugiro</span>
        <span className="title-agro">Agro</span>
      </div>
      <div className="header">
        <div className="header-user">
          <button onClick={() => signOut()} className="btn-logout">
            <BiLogOut color="black" size={30} className="icon-out" />
          </button>

          <span> {user.nome} </span>
        </div>

        <Link to="/register">
          <div className="container-adduser">
            <FiUserPlus size={25} color="black" />
            <span>Adicionar usuário</span>
          </div>
        </Link>
      </div>
      <div className="container-fazendas">
        <span className="title-fazendas">Lista de fazendas</span>
        {listaFazendas.map((item) => {
          return (
            <div className="lista-fazendas">
              <div className="item-fazenda">
                <BiUserCheck size={20} color="black" />
                <span>{item.nome}</span>
                <div className="fazenda-options">
                  <FiTrash2
                    size={20}
                    color="#C87D61"
                    onClick={() => handleDelete(item.id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      ;
    </div>
  );
}
