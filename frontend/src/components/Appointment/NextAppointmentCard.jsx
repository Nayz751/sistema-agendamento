import {formatDate,formatTime,} from "../../utils/date";

function NextAppointmentCard({
  nextAppointment,
  handleConfirmAppointment,
}) {
  return (
    <div className="aura-info-box">

      <h4>
        Próximo Cliente
      </h4>

      {nextAppointment ? (
        <>

          <p>
            <strong>Cliente:</strong>{" "}
            {nextAppointment.nome}
          </p>

          <p>
            <strong>Serviço:</strong>{" "}
            {nextAppointment.servico}
          </p>

          <p>
            <strong>Data:</strong>{" "}
            {formatDate(
              nextAppointment.data_agendamento
            )}
          </p>

          <p>
            <strong>Hora:</strong>{" "}
            {formatTime(
              nextAppointment.data_agendamento
            )}
          </p>

          <button
            className="btn-primary"
            onClick={() =>
              handleConfirmAppointment(
                nextAppointment
              )
            }
          >
            Confirmar
          </button>

        </>
      ) : (
        <p>
          Nenhum agendamento pendente.
        </p>
      )}

    </div>
  );
}

export default NextAppointmentCard;