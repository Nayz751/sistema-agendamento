export default function AppointmentRow({
  app,
  clients,
  navigate,
  getInitials,
}) {
  return (
    <tr>

      <td>
        <strong>{app.time}</strong>
        <span>
          {app.date.split("-").reverse().slice(0, 2).join("/")}
        </span>
      </td>

      <td>
        <div className="table-client">

          <div className="client-avatar">
            {getInitials(app.client)}
          </div>

          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => {
              const fullClient = clients.find(
                (c) => c.nome === app.client
              );

              if (fullClient) {
                navigate("/profile", { state: fullClient });
              }
            }}
          >
            {app.client}
          </span>

        </div>
      </td>

      <td>{app.service}</td>

      <td>
        <span className={`app-status ${app.status.toLowerCase().replace(" ", "-")}`}>
          {app.status}
        </span>
      </td>

      <td>
        <button className="btn-options">•••</button>
      </td>

    </tr>
  );
}