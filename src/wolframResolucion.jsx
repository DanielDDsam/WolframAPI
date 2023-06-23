import React, { useEffect, useState } from "react";
import axios from "axios";


const WolframResolucion = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [userInput, setUserInput] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/wolfram_alpha_query/', { user_input: userInput });
      setImageUrls(response.data.response);
    } catch (error) {
      console.error('Error fetching image data:', error);
    }
  };


  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleCalculate = () => {
    fetchData();
  };

  return (
    <div className="wolfram-resolucion-container">
      <input type="text" value={userInput} onChange={handleInputChange} placeholder="Ingrese la ecuación" />

      <button onClick={handleCalculate}>Calcular</button>

      <div className="image-gallery">
        {imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Wolfram Alpha Solution ${index}`} />
          ))
        ) : (
          <p>No se encontraron soluciones.</p>
        )}
      </div>
    </div>
  );
};

export default WolframResolucion;
