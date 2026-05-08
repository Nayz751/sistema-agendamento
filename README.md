# Sistema de Agendamento - Aura


![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-264de4?style=for-the-badge&logo=css3&logoColor=white)

Sistema web desenvolvido para gerenciamento de clientes e agendamentos, com foco em organização, produtividade e experiência do usuário.

---

## ✨ Sobre o projeto

O **Aura** é um sistema de agendamento pensado para facilitar o dia a dia de profissionais que trabalham com atendimentos (estética, clínica, serviços, etc).

Ele permite cadastrar clientes, gerenciar agendas e visualizar informações importantes de forma simples e intuitiva.

---

##  Funcionalidades

### Gestão de clientes
- Cadastro de novos clientes
- Validação de dados (CPF, telefone e e-mail)
- Visualização de perfil completo
- Registro de observações

### Agendamentos
- Criação de agendamentos
- Seleção de data
- Controle de status (pendente, confirmado, em andamento)
- Busca por cliente ou serviço

### Dashboard
- Visão geral dos agendamentos
- Filtro de visualização (dia ou período)
- Busca dinâmica
- Indicadores de desempenho:
  - Total de clientes
  - Agendamentos do dia
  - Faturamento
  - Serviço mais utilizado

### Perfil do cliente
- Dados pessoais
- Informações de contato
- Histórico de atendimentos
- Observações internas
---

##  Problema que o sistema resolve

Muitos profissionais ainda controlam clientes e agendamentos de forma manual (papel, WhatsApp ou planilhas), o que gera:

- ❌ Desorganização  
- ❌ Perda de informações  
- ❌ Falta de histórico  
- ❌ Dificuldade de controle financeiro  

O **Aura** resolve isso centralizando tudo em um único sistema simples, rápido e intuitivo.

---

##  Tecnologias utilizadas

### Frontend
- React
- React Router
- CSS (customizado)

### Backend
- Node.js
- Express

### Banco de Dados
- PostgreSQL

---

## Segurança

- Validação de dados no frontend
- Estrutura preparada para boas práticas (LGPD)
- Separação de responsabilidades (cliente/servidor)

---

## Como rodar o projeto

### 1. Clonar repositório
```bash
git clone https://github.com/Nayz751/sistema-agendamento.git
```

### 2. Comandos backend(seleciona a pasta, instala as dependecias e roda o servidor backend)
```bash
cd backend
npm install
node server.js
```

### 3. Comandos frontend(seleciona a pasta, instala as dependecias e roda o servidor frontend)
```bash
cd frontend
npm install
npm run dev
```
---

## 💡 Melhorias futuras

- Autenticação de usuários
- Upload de foto do cliente
- Integração com pagamentos
- Notificações automáticas
- Dashboard financeiro avançado

---

## Autora

**Nayara C. Diniz**  
Estudante de Engenharia de Software  
Foco em qualidade de software e sistemas com impacto real