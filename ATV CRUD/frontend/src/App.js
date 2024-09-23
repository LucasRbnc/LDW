import React from "react";
import ClienteList from "./components/ClienteList";
import ClienteForm from "./components/ClienteForm";
import useClientes from "./hooks/useClient";
import imagem from "./icon/cliente.jpg";
import "./App.css";

function App() {
  const {
    clientes,
    addCliente,
    updateEmail,
    updateNome,
    deleteCliente,
    editingCliente,
    setEditingCliente,
    updateStatus
  } = useClientes();

  return (
    <div className="App">
      <img src={imagem} alt="Cliente" className="header-image" />
      <h1>Gerenciamento de Clientes</h1>
      <ClienteForm
        addCliente={addCliente}
        updateEmail={updateEmail}
        updateNome={updateNome}
        editingCliente={editingCliente}
        setEditingCliente={setEditingCliente}
        updateStatus={updateStatus}
      />
      <ClienteList
        clientes={clientes}
        deleteCliente={deleteCliente}
        setEditingCliente={setEditingCliente}
      />
    </div>
  );
}

export default App;
