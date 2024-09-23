import { useState, useEffect } from "react";
import api from "../services/api";

const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [editingCliente, setEditingCliente] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await api.get("/client/list");
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes", error);
    }
  };

  const addCliente = async (cliente) => {
    try {
        const response = await api.post("/client/create", cliente);
        setClientes((prevClientes) => [...prevClientes, response.data.client]);
    } catch (error) {
        console.error("Erro ao adicionar cliente", error);
    }
};

  const updateEmail = async (cliente) => {
    try {
      await api.put("/client/updateEmail", {
        id: cliente._id,
        email: cliente.email,
      });
      fetchClientes();
    } catch (error) {
      console.error("Erro ao atualizar email", error);
    }
  };

  const updateNome = async (cliente) => {
    try {
      await api.put("/client/updateName", {
        id: cliente._id,
        nome: cliente.nome,
      });
      fetchClientes();
    } catch (error) {
      console.error("Erro ao atualizar nome", error);
    }
  };

  const deleteCliente = async (id) => {
    try {
      await api.delete("/client/delete", { data: { id } });
      fetchClientes();
    } catch (error) {
      console.error("Erro ao deletar cliente", error);
    }
  };

  const updateStatus = async (cliente) => {
    try {
      await api.put("/client/updateStatus", {
        id: cliente._id,
        status: cliente.status,
      });
      fetchClientes(); // Recarrega a lista de clientes após a atualização
    } catch (error) {
      console.error("Erro ao atualizar status", error);
    }
  };

  return {
    clientes,
    addCliente,
    updateEmail,
    updateNome,
    deleteCliente,
    editingCliente,
    setEditingCliente,
    updateStatus,
  };
};

export default useClientes;
