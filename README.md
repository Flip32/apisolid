# App

GymPass style app.

## RFs (Requisitos funcionais)
- [x] O usuário deve poder se cadastrar
- [x] O usuário deve poder autenticar
- [ ] Deve ser possível obter o perfil de um usuário logado
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário
- [ ] Deve ser possível o usuário obter seu histórico de check-ins
- [ ] Deve ser possível o usuário buscar academias próximas
- [ ] Deve ser possível o usuário buscar academias por nome
- [ ] Deve ser possível o usuário realizar o check-in em uma academia
- [ ] Deve ser possível validar o check-in de um usuário
- [ ] Deve ser possível cadastrar uma academia

## RNs (Regras de negócio)
- [x] O usuário não deve poder se cadastrar com um email já cadastrado
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [ ] O usuário não pode check-in se não estiver perto (100m) da academia
- [ ] O usuário só pode ser validado até 20 minutos após criado
- [ ] O usuário só pode ser validado por administradores
- [ ] O usuário só pode ser cadastrado por administradores

## RNFs (Requisitos não funcionais)
- [x] A senha do usuário precisa ser criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página
- [ ] O usuário deve ser identificado por um token JWT

