import { toast } from 'react-toastify';
import { useState, useContext} from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';

import './signup.css'

import BrazilStates from '../../Components/Forms/BrazilStates'
import BrazilCities from '../../Components/Forms/BrazilCities';
import { LocalContext, LocalProvider } from '../../contexts/local';

function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipo, setTipo] = useState('')
  
  const [sensorLuminosidade, setSensorLuminosidade] = useState('0')
  const [sensorAgua, setSensorAgua] = useState('0')
  const [sensorSonar, setSensorSonar] = useState('0')
  const [sensorTemperatura, setSensorTemperatura] = useState('0')

  const [formValues, setFormValus] = useState({})

  const { signUp, loadingAuth } = useContext(AuthContext);
  const {setUf, uf, setCidade, cidade} = useContext(LocalContext)

  async function handleSubmit(e){
    e.preventDefault();

    if(tipo == 'master'){

      if(nome !== '' && email !== '' && password !== '' && tipo !== ''){
        // {
        await signUp(email, password, nome, tipo)
          setNome('')
          setEmail('')
          setPassword('')
          setTipo('')
          setUf('')
          setCidade('')
        }else{
          toast.error('Preencha todos os campos!')
        }

    }else{
      if(nome !== '' && email !== '' && password !== '' && tipo !== '' && uf !== '' && cidade !== ''){
        if(sensorLuminosidade || sensorAgua || sensorSonar || sensorTemperatura){
          await signUp(email, password, nome, tipo, uf, cidade, sensorLuminosidade, sensorAgua, sensorSonar, sensorTemperatura )
          setNome('')
          setEmail('')
          setPassword('')
          setTipo('')
          setUf('')
          setCidade('')
        }else{
          toast.error('Cadastre ao menos 1 sensor!')
        }

      }else{
        toast.error('Preencha todos os campos!')
      }
    }
    
    

  }

  const handleInputChange = (e) => {
    e.preventDefault();
    const {value, name} = e.target;
    setFormValus({...formValues, [name]:value })
    setUf(e.target.value)
    console.log(cidade)
  }

  return (
      <div className="container-center">
        <div className="login">

          <form onSubmit={handleSubmit}>
            <h1>Cadastrar uma conta</h1>
            <input type="text" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            <input type="text" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value) }/>
            <input type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value) } />

            <input type='radio' name='radio-type' value='master' onChange={() => setTipo('master')}/>
            <input type='radio' name='radio-type' value='comum' onChange={() => setTipo('comum')}/>
            
            
            {tipo == 'comum' &&
              <div>
                <BrazilStates onChange={handleInputChange}/>

                <BrazilCities state={formValues.state} />

                <div>
                  <input
                  type='checkbox'
                  value={sensorLuminosidade}
                  onChange={() => {{sensorLuminosidade == '0' ? setSensorLuminosidade('1') : setSensorLuminosidade('0')}}}
                  />
                  <span> Sensor Luminosidade </span>
                </div>

                <div>
                  <input
                  type='checkbox'
                  value={sensorAgua}
                  onChange={() => {{sensorAgua == '0' ? setSensorAgua('1') : setSensorAgua('0')}}}
                  />
                  <span> Sensor Nível da água </span>
                </div>

                <div>
                  <input
                  type='checkbox'
                  value={sensorSonar}
                  onChange={() => {{sensorSonar == '0' ? setSensorSonar('1') : setSensorSonar('0')}}}
                  />
                  <span> Sensor Sonar </span>
                </div>

                <div>
                  <input
                  type='checkbox'
                  value={sensorTemperatura}
                  onChange={() => {{sensorTemperatura == '0' ? setSensorTemperatura('1') : setSensorTemperatura('0')}}}
                  />
                  <span> Sensor Temperatura </span>
                </div>
              </div>

            }{tipo == 'master' && setCidade('')}

            <button type="submit">{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
          </form>

          <Link to="/dashboard">Voltar para o dash</Link>
        </div>
      </div>
  );
}

export default SignUp;
