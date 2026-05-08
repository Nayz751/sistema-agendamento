import { useState, useRef, useEffect } from "react";

const AppointmentTable = ({
  filteredList,
  clients,
  navigate,
  ROUTES,
  getInitials,
}) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="table-container">
      <table className="aura-table">
        <thead>
          <tr>
            <th>Data & Hora</th>
            <th>Cliente</th>
            <th>Serviço</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {filteredList.map((app) => (
            <tr key={app.id}>
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
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => {
                      const fullClient = clients.find(
                        (c) =>
                          c.nome?.toLowerCase().trim() ===
                          app.client?.toLowerCase().trim()
                      );

                      if (fullClient) {
                        navigate(ROUTES.profile, {
                          state: fullClient,
                        });
                      }
                    }}
                  >
                    {app.client}
                  </span>
                </div>
              </td>

              <td>{app.service}</td>
              <td>{app.status}</td>

              <td style={{ position: "relative" }}>
                <button
                  className="btn-options"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(
                      openMenuId === app.id ? null : app.id
                    );
                  }}
                >
                  •••
                </button>

                {openMenuId === app.id && (
                  <div ref={menuRef} className="popup-menu">
                    <ul>
                      <li
                        onClick={() => {
                          const fullClient = clients.find(
                            (c) =>
                              c.nome?.toLowerCase().trim() ===
                              app.client?.toLowerCase().trim()
                          );

                          if (fullClient) {
                            navigate(ROUTES.profile, {
                              state: fullClient,
                            });
                          }
                        }}
                      >
                        Perfil
                      </li>

                      <li
                        onClick={() =>
                          navigate(ROUTES.prontuario)
                        }
                      >
                        Ficha médica
                      </li>

                      <li
                        onClick={() =>
                          console.log("Abrir histórico")
                        }
                      >
                        Histórico
                      </li>
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;