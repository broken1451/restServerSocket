import { Socket } from "socket.io";
import sockectIO from 'socket.io';

export const disconect = (cliente: Socket) => {
  cliente.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
};


// Escuchar mensajes
export const mensaje = (cliente: Socket, io: sockectIO.Server) =>{
  
    cliente.on('mensaje', (payload: any) =>{
      console.log('mensaje recibido: ', payload );

      // emitir  el mensaje a todos los usuarios conectado a mi app de sockects
      io.emit('mensaje-nuevo', payload) // emitir el nuevo mensaje del lado del servidor- mensaje-nuevo la misma propiedad q se escucha en angular

    });

}