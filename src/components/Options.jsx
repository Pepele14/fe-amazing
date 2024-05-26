import "./options.css";
import { useNavigate } from "react-router-dom";

const Options = ({ onSelectOption }) => {
  const options = ["Write", "Talk", "Nope. I am fine"];
  const navigate = useNavigate();

  const handleSelectOption = (option) => {
    if (option === "Write") {
      navigate("/diary");
    } else {
      onSelectOption(option);
    }
  };

  return (
    <div className="mood-selection-options">
      {options.map((option, index) => (
        <div
          key={index}
          className="option-box"
          onClick={() => handleSelectOption(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default Options;
