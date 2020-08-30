import { Socket } from "socket.io";
import sockectIO from "socket.io";
import { UsuariosLista } from "../classes/usuariosLista";
import { Usuario } from "../classes/usuario";

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket) => {
  const usuario = new Usuario(cliente.id);
  usuariosConectados.agregarUsuario(usuario);
};

export const disconect = (cliente: Socket, io: sockectIO.Server) => {
  cliente.on("disconnect", () => {
    // console.log("Cliente desconectado:", {cliente: cliente.id});
    console.log("Cliente desconectado:");
    usuariosConectados.deleteUser(cliente.id);
    io.emit('usuarios-activos', usuariosConectados.getUsuarios());
  });
};

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: sockectIO.Server) => {
  cliente.on("mensaje", (payload: any) => {
    console.log("mensaje recibido: ", payload);

    // emitir  el mensaje a todos los usuarios conectado a mi app de sockects
    io.emit("mensaje-nuevo", payload); // emitir el nuevo mensaje del lado del servidor- mensaje-nuevo la misma propiedad q se escucha en angular
  });
};

// Login WS configurar usuario
export const login = (cliente: Socket, io: sockectIO.Server) => {
  cliente.on("configurar-usuario", (payload: any, callback: any) => {
    console.log("mensaje recibido de evento configurar-usuario: ", payload);
    usuariosConectados.actualizarNombre(cliente.id, payload.usuario);
    io.emit('usuarios-activos', usuariosConectados.getUsuarios());
    return callback({
      ok: true,
      payload: payload,
    });
  });
};


// logout 
export const logout = (cliente: Socket, io: sockectIO.Server) => {
  cliente.on("logout-user", (payload: any) => {
    console.log("mensaje recibido de evento configurar-usuario logout: ", payload);
    usuariosConectados.actualizarNombre(cliente.id, payload.usuario);
    io.emit('usuarios-activos', usuariosConectados.getUsuarios());
  });
};


// Obtener usuarios
export const obtenerUsuarios = (cliente: Socket, io: sockectIO.Server) => {
  cliente.on("obtener-usuarios-activos", (payload?: any) => {
    // console.log("mensaje recibido: ", payload);

    // emitir  el mensaje a todos los usuarios conectado a mi app de sockects
    io.to(cliente.id).emit("usuarios-activos", usuariosConectados.getUsuarios()); // emitir el nuevo mensaje del lado del servidor- mensaje-nuevo la misma propiedad q se escucha en angular
  });
};
