"use client";
import React from "react";
import { signup } from "../../firebase/auth";
import { generateRandomEmail, pedidoFactory } from "../../utils/mockData";
import axios, { AxiosRequestConfig } from "axios";
import { create_pedido_url } from "../../services/pedido";

const Experiment: React.FC = () => {

  const handleLogin = async () => {
    try {
      const email = generateRandomEmail();
      const password = "no_monolitos_experimento";
      await signup(email, password);
    } catch (error) {
      console.error("Error en el login:", error);
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

  const handleCreateOrder = async () => {
    try {
      const data = pedidoFactory()
      console.log(data)
      const response = await fetchData({
        method: "POST",
        url: create_pedido_url(),
        data: data,
      });
      console.log("Pedido creado:", response);
    } catch (error) {
      console.error("Error creando pedido:", error);
    }
  };

  const runExperiment = async () => {
    // console.log(new Date().toISOString())
    // const loginResult = await handleLogin();
    await handleCreateOrder();
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
}

export default Experiment;