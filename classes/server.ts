import express from "express";
import { SERVER_PORT } from "../global/enviroment";
// import todoLodesockectguardaloaca/variablecualquiera from 'socket.io';
import http from "http";
import sockectIO from "socket.io";
// import { disconect } from "../sockects/sockets";
// import todo * as nombreVariableCualquiera from "../sockects/sockets";
import * as socket from "../sockects/sockets";

export default class Server {
  public app: express.Application;
  public port: number;

  // patron singleton
  private static _instance: Server;

  // configuracion de io
  public io: sockectIO.Server;
  private httServer: http.Server;

  // constructor() {
  //   this.app = express();
  //   this.port = SERVER_PORT;

  //   // configuracion de io
  //   this.httServer = new http.Server(this.app);

  //   // this.io = sockectIO(configuracion del hhtpserver);
  //   this.io = sockectIO(this.httServer);

  //   this.listenSockects();
  // }

  // patron singleton
  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;

    // configuracion de io
    this.httServer = new http.Server(this.app);

    // this.io = sockectIO(configuracion del hhtpserver);
    this.io = sockectIO(this.httServer);

    this.listenSockects();
  }

  public static get instance() {
    if (this._instance) {
      return this._instance;
    } else {
      return (this._instance = new Server());
    }
  }

  // patron singleton
  startServer(callback: any) {
    // this.app.listen(this.port, callback);
    this.httServer.listen(this.port, callback);
  }

  private listenSockects() {
    console.log("escuchando conecxiones - Sockets");

    // cuando se conecta
    this.io.on("connection", (cliente) => {
      console.log("Cliente conectado");
      // console.log({cliente: cliente.id}); // id sockets
      // console.log({ cliente });

      // Coenctar cliente
      socket.conectarCliente(cliente);

      // configurar usuario Login
      socket.login(cliente, this.io)
        
      // mensajes
      socket.mensaje(cliente, this.io)

    


      // cuando se desconecta
      socket.disconect(cliente);
      // cliente.on("disconnect", () => {
      //   console.log("Cliente desconectado");
      // });
    });
  }
}
