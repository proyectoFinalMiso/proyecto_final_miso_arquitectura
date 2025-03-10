"use client";
import { signup } from "../../firebase/auth";
import { fabricanteFactory, generateRandomEmail } from "../../utils/mockData";
import axios, { AxiosRequestConfig } from "axios";
import { create_fabricante_url } from "../../services/fabricante";

const Experiment: React.FC = () => {

  const handleLogin = async () => {
    try {
      const email = generateRandomEmail();
      const password = "no_monolitos_experimento";
      await signup(email, password);
      return 200
    } catch (error) {
      console.error("Error en el login:", error);
      return 500
    }
  };

  const fetchData = async (config: AxiosRequestConfig) => {
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  };

  const handleCreateManufacturer = async () => {
    try {
      const response = await fetchData({
        method: "POST",
        url: create_fabricante_url(),
        data: await fabricanteFactory(),
      });
      console.log("Fabricante creado:", response);
    } catch (error) {
      console.error("Error creando fabricante:", error);
    }
  };

  const runExperiment = async () => {
    // console.log(new Date().toISOString())
    // const loginResult = await handleLogin();
    await handleCreateManufacturer();
    // if (loginResult === 200) {
    //   // console.log("Login successful, proceeding to create manufacturer");
      
    //   // console.log(new Date().toISOString())
    // } else {
    //   // console.error("Login failed, not creating manufacturer");
    // }
  };

  runExperiment();

  return (
    <div>
      <h1>Experimento - Crear fabricante </h1>
    </div>
  );
};

export default Experiment;