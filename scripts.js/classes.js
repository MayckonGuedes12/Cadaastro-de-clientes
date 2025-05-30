// classes.js
export class Cliente {
  constructor(nome, email, id = null) {
    this.nome = nome;
    this.email = email;
    if (id) this._id = id; // preserva o _id
  }

  static fromJSON(obj) {
    return new Cliente(obj.nome, obj.email, obj._id); // inclui _id aqui
  }
}
