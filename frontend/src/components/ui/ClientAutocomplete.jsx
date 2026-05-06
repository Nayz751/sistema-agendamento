function ClientAutocomplete({
  clientSearch,
  setClientSearch,
  selectedClient,
  setSelectedClient,
  filteredClients,
}) {
  return (
    <div className="input-group">

      <label>
        Cliente
      </label>

      <input
        value={
          selectedClient
            ? selectedClient.nome
            : clientSearch
        }
        onChange={(e) => {
          setClientSearch(
            e.target.value
          );

          setSelectedClient(null);
        }}
        placeholder="Buscar cliente..."
      />

      {clientSearch &&
        filteredClients.map((c) => (
          <div
            key={c.id}
            className="autocomplete-item"
            onClick={() => {
              setSelectedClient(c);

              setClientSearch("");
            }}
          >
            {c.nome}
          </div>
        ))}

    </div>
  );
}

export default ClientAutocomplete;