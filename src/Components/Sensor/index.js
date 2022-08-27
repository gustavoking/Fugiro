import "./styles.css";

export default function Sensor({ sensor, image, unidade, valor }) {
  const textoClassName = `textoColor ${corTextoSensor(sensor, valor)}`;

  function corTextoSensor(sensor, valor) {
    switch (sensor) {
      case "Temperatura":
        return valor < 20 ? "vermelho" : valor > 50 ? "verde" : "laranja";
      case "Água":
        return valor < 20 ? "vermelho" : valor > 50 ? "verde" : "laranja";
      case "Luminosidade":
        return valor < 20 ? "vermelho" : "verde";
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
        if (valor < 20) {
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

  return (
    <div className="container-sensor">
      <div>
        <span>{sensor}</span>
      </div>
      <div>
        <img className="sol" src={image} />
      </div>
      <div>
        <p className="unity">{unidade}</p>
      </div>
      <div>
        <p className={textoClassName}>{textoSensor(sensor, valor)}</p>
      </div>
    </div>
  );
}
