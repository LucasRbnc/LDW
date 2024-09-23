import React, { useState, useEffect } from "react";

function ClienteForm({
  addCliente,
  updateEmail,
  updateNome,
  updateStatus,
  editingCliente,
  setEditingCliente,
}) {
  const [cliente, setCliente] = useState({ name: "", email: "", status: "ATIVO" });

  useEffect(() => {
    if (editingCliente) {
      setCliente(editingCliente);
    } else {
      setCliente({ name: "", email: "", status: "ATIVO" });
    }
  }, [editingCliente]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCliente) {
      updateNome(cliente);
      updateEmail(cliente);
      updateStatus(cliente);
      setEditingCliente(null);
    } else {
      addCliente(cliente);
    }
    setCliente({ name: "", email: "", status: "ATIVO" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={cliente.name}
          onChange={(e) => setCliente({ ...cliente, name: e.target.value })}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={cliente.email}
          onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
        />
      </div>
      {editingCliente && (
        <div>
          <label>Status:</label>
          <select
            value={cliente.status}
            onChange={(e) => setCliente({ ...cliente, status: e.target.value })}
          >
            <option value="ATIVO">ATIVO</option>
            <option value="DESATIVADO">DESATIVADO</option>
          </select>
        </div>
      )}
      <button type="submit">
        {editingCliente ? "Atualizar Cliente" : "Cadastrar"}
      </button>
    </form>
  );
}

export default ClienteForm;
