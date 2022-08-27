import "./styles.css";

export default function Sensor({ sensor }) {
  return (
    <div className="container-sensor">
      <span>{sensor}</span>
    </div>
  );
}
