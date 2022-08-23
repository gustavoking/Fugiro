
import { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    function loadStorage(){
      const storageUser = localStorage.getItem('SistemaUser');

      if(storageUser){
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
  
      setLoading(false);
    }
    
    loadStorage();

  }, [])


  //Fazendo login do usuario
  async function signIn(email, password){
    setLoadingAuth(true);

    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async (value)=> {
      let uid = value.user.uid;

      const userProfile = await firebase.firestore().collection('users')
      .doc(uid).get();

      let data = {
        uid: uid,
        nome: userProfile.data().nome,
        email: value.user.email,
        tipo: userProfile.data().tipo,
        uf: userProfile.data().uf,
        cidade: userProfile.data().cidade,
        sensorLuminosidade: userProfile.data().sensorLuminosidade,
        sensorAgua: userProfile.data().sensorAgua,
        sensorSonar: userProfile.data().sensorSonar,
        sensorTemperatura: userProfile.data().sensorTemperatura
      };

      setUser(data);
      storageUser(data);
      setLoadingAuth(false);
      toast.success('Bem vindo ao sistema!');


    })
    .catch((error)=>{
      console.log(error);
      toast.error('Ops algo deu errado!');
      setLoadingAuth(false);
    })

  }


  //Cadastrando um novo usuario
  async function signUp(email, password, nome, tipo, uf, cidade, lum, agua, sonar, temp){
    setLoadingAuth(true);

    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( async (value)=>{
      let uid = value.user.uid;

      if(tipo == 'master'){
        await firebase.firestore().collection('users')
        .doc(uid).set({
          nome: nome,
          tipo: tipo
        })
        .then( () => {

          setLoadingAuth(false);
          toast.success('Novo usuário cadastrado!');
  
        })

      }else if(tipo == 'comum'){
        await firebase.firestore().collection('users')
        .doc(uid).set({
          nome: nome,
          uf: uf,
          cidade: cidade,
          tipo: tipo,
          sensorLuminosidade: lum,
          sensorAgua: agua,
          sensorSonar: sonar,
          sensorTemperatura: temp
        })
        .then( () => {

          setLoadingAuth(false);
          toast.success('Novo usuário cadastrado!');

        })
        }

    })
    .catch((error)=>{
      console.log(error);
      toast.error('Ops algo deu errado!');
      setLoadingAuth(false);
    })

  }



  function storageUser(data){
    localStorage.setItem('SistemaUser', JSON.stringify(data));
  }



  //Logout do usuario
  async function signOut(){
    await firebase.auth().signOut();
    localStorage.removeItem('SistemaUser');
    setUser(null);
  }


  return(
    <AuthContext.Provider 
    value={{ 
      signed: !!user,  
      user, 
      loading, 
      signUp,
      signOut,
      signIn,
      loadingAuth
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
