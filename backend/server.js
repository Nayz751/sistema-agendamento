import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// =========================
//  servidor
// =========================
app.get("/", (req, res) => {
  res.send("servidor ta on");
});

// =========================
//  CLIENTES
// =========================

app.get("/clientes", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM clientes ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar clientes");
  }
});

app.post("/clientes", async (req, res) => {
  const {
    nome,
    email,
    cpf,
    telefone,
    notas
  } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO clientes
      (nome, email, cpf, telefone, notas)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        nome,
        email,
        cpf || null,
        telefone,
        notas || null
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar cliente");
  }
});

app.delete("/clientes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      "DELETE FROM clientes WHERE id = $1",
      [id]
    );

    res.send("Cliente removido");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao deletar cliente");
  }
});

app.put("/clientes/:id", async (req, res) => {
  const { id } = req.params;

  const {
    nome,
    email,
    cpf,
    telefone,
    notas
  } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE clientes
      SET nome = $1,
          email = $2,
          cpf = $3,
          telefone = $4,
          notas = $5
      WHERE id = $6
      RETURNING *
      `,
      [
        nome,
        email,
        cpf || null,
        telefone,
        notas || null,
        id
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar cliente");
  }
});

// =========================
//  AGENDA
// =========================

app.get("/agenda", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM agenda ORDER BY data_agendamento"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar agendamentos");
  }
});

app.get("/agenda-detalhada", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        agenda.id,
        clientes.nome,
        clientes.email,
        clientes.telefone,
        clientes.notas,
        agenda.data_agendamento,
        agenda.servico,
        agenda.status
      FROM agenda
      JOIN clientes
        ON clientes.id = agenda.cliente_id
      ORDER BY agenda.data_agendamento
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar agenda detalhada");
  }
});

app.get("/agenda/proximo", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        agenda.id,
        clientes.nome,
        agenda.data_agendamento,
        agenda.servico,
        agenda.status
      FROM agenda
      JOIN clientes
        ON clientes.id = agenda.cliente_id
      WHERE agenda.status != 'confirmado'
      ORDER BY agenda.data_agendamento ASC
      LIMIT 1
    `);

    res.json(result.rows[0] || null);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar próximo agendamento");
  }
});

app.get("/agenda/proximo", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        agenda.id,
        clientes.nome,
        agenda.data_agendamento,
        agenda.servico,
        agenda.status
      FROM agenda
      JOIN clientes
        ON clientes.id = agenda.cliente_id
      WHERE agenda.status = 'pendente'
      AND agenda.data_agendamento >= NOW()
      ORDER BY agenda.data_agendamento ASC
      LIMIT 1
    `);

    res.json(result.rows[0] || null);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar próximo agendamento");
  }
});

app.post("/agenda", async (req, res) => {
  const {
    cliente_id,
    data_agendamento,
    servico,
    status
  } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO agenda
      (cliente_id, data_agendamento, servico, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        cliente_id,
        data_agendamento,
        servico,
        status || "pendente"
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar agendamento");
  }
});

app.delete("/agenda/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      "DELETE FROM agenda WHERE id = $1",
      [id]
    );

    res.send("Agendamento removido");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao deletar agenda");
  }
});

app.put("/agenda/:id", async (req, res) => {
  const { id } = req.params;

  const {
    cliente_id,
    data_agendamento,
    servico,
    status
  } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE agenda
      SET cliente_id = $1,
          data_agendamento = $2,
          servico = $3,
          status = $4
      WHERE id = $5
      RETURNING *
      `,
      [
        cliente_id,
        data_agendamento,
        servico,
        status,
        id
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar agenda");
  }
});

// =========================
//  servidor
// =========================

app.listen(3000, () => {
  console.log("rodando em 3000");
});