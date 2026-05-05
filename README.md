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

###  Gestão de Clientes
- Cadastro de novos clientes
- Validação de dados (CPF, telefone, email)
- Visualização de perfil completo
- Histórico e observações do cliente

### Agendamentos
- Criar novos agendamentos
- Selecionar data via calendário
- Bloqueio de datas passadas
- Seleção de serviços de forma visual
- Controle de status:
  - Pendente
  - Confirmado
  - Em andamento

###  Dashboard
- Visão geral do sistema
- Agendamentos do dia
- Filtro:
  - **Ver hoje**
  - **Ver todos (mês)**
- Busca de clientes e serviços
- Cards com métricas:
  - Total de clientes
  - Agendamentos
  - Faturamento
  - Serviço mais procurado

### Ações Rápidas
- Novo agendamento
- Adicionar cliente
- Adicionar serviço
- Acesso ao prontuário

###  Perfil do Cliente
- Dados completos do cliente
- Informações de contato
- Observações importantes
- Resumo financeiro
- Histórico de serviços

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

### 2. Instalar dependências
```bash
npm install
```

### 3. Rodar frontend
```bash
npm start
```

### 4. Rodar backend
```bash
node server.js
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