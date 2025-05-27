// classes.js
export class Cliente {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }

  static fromJSON(obj) {
    return new Cliente(obj.nome, obj.email);
  }
}
