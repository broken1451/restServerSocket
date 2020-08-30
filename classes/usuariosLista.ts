import { Usuario } from "./usuario";
export class UsuariosLista {
  private lista: Usuario[] = [];

  constructor() {}

  // Agregar un usuario
  public agregarUsuario(usuario: Usuario) {
    this.lista.push(usuario);
    console.log("Agregando usuario:");
    console.log({ lista: this.lista });
    return usuario;
  }

  // Actualizar un usuario
  public actualizarNombre(id: string, nombre: string) {
    for (const usuario of this.lista) {
      if (usuario.id === id) {
        usuario.nombre = nombre;
        break;
      }
    }
    console.log("Actualizando usuario:");
    console.log({ lista: this.lista });
  }

  // Obtener Lista de usuarios
  public getUsuarios() {
    return this.lista;
  }

  // Obtener un usuario
  public getUsuario(id: string) {
    return this.lista.find((user) => {
      return user.id === id;
    });
  }

  // Obtener usuario en una sala particular
  public getUsuarioSala(sala: string) {
    return this.lista.filter((userSala) => {
      return userSala.sala === sala;
    });
  }

  // Borrar un usuario
  public deleteUser(id: string) {
    const userTemp = this.getUsuario(id);
    this.lista = this.lista.filter((userDelete) => {
      console.log({ userDelete });
      return userDelete.id != id;
    });
    console.log("lista", { lista: this.lista });
    // console.log("userTemp", { userTemp });
    return userTemp;
  }
}
