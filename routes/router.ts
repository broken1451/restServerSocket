import { Router, Request, Response } from "express";
import Server from "../classes/server";
import { usuariosConectados, mapa } from "../sockects/sockets";
import { GraficaData } from "../classes/grafica";
import { GraficaEncuesta } from "../classes/encuesta";
import { Mapa } from "../classes/mapa";

// export const router = Router();
const router = Router();

// MAPA
// const mapa = new Mapa();
router.get("/mapa", (req: Request, res: Response) => {
  return res.json({ mapa: mapa.getMarcadores() });
  // return res.json({
  //   ok: true,
  //   grafica: grafica.getDataGrafica(),
  // });
});
// Mapa

// Graficas
const grafica = new GraficaData();
router.get("/grafica", (req: Request, res: Response) => {
  return res.json({ grafica: grafica.getDataGrafica() });
  // return res.json({
  //   ok: true,
  //   grafica: grafica.getDataGrafica(),
  // });
});

router.post("/grafica", (req: Request, res: Response) => {
  const body = req.body;
  const mes = body.mes;
  const unidades = Number(body.unidades);

  grafica.incrementarValor(mes, unidades);

  const server = Server.instance;
  // server.io.emit('mensaje-todos', payload); // mandar mensajes a todos
  server.io.emit("cambio-grafica", grafica.getDataGrafica()); // mandar mensajes a todos

  return res.json({ grafica: grafica.getDataGrafica() });
  // return res.json({
  //   ok: true,
  //   grafica: grafica.getDataGrafica(),
  // });
});
// Graficas

// encuesta
const encuesta = new GraficaEncuesta();
router.get("/encuesta", (req: Request, res: Response) => {
  return res.json({ encuesta: encuesta.getDataGrafica() });
  // return res.json({
  //   ok: true,
  //   grafica: grafica.getDataGrafica(),
  // });
});

router.post("/encuesta", (req: Request, res: Response) => {
  const body = req.body;
  const opcion = Number(body.opcion) || 0;
  const unidades = Number(body.unidades);

  encuesta.incrementarValor(opcion, unidades);

  const server = Server.instance;
  // server.io.emit('mensaje-todos', payload); // mandar mensajes a todos
  server.io.emit("cambio-grafica", encuesta.getDataGrafica()); // mandar mensajes a todos

  return res.json({ encuesta: encuesta.getDataGrafica() });
  // return res.json({
  //   ok: true,
  //   grafica: grafica.getDataGrafica(),
  // });
});
// encuesta

router.get("/mensajes", (req: Request, res: Response) => {
  return res.json({
    ok: true,
    mensaje: "todo OK",
  });
});

router.post("/mensajes", (req: Request, res: Response) => {
  const body = req.body;
  const cuerpo = body.cuerpo;
  const de = body.de;

  const payload = {
    de: de,
    cuerpo: cuerpo,
  };

  const server = Server.instance;
  // server.io.emit('mensaje-todos', payload); // mandar mensajes a todos
  server.io.emit("mensaje-nuevo", payload); // mandar mensajes a todos

  return res.json({
    ok: true,
    mensaje: "POST - LISTO",
    body: body,
    cuerpo: cuerpo,
    de: de,
  });
});

router.post("/mensajes/:id", (req: Request, res: Response) => {
  const body = req.body;
  const cuerpo = body.cuerpo;
  const de = body.de;
  const id = req.params.id; // parametros por la url

  const payload = {
    de: de,
    cuerpo: cuerpo,
  };

  const server = Server.instance;

  // mandar un mensaje a uno o a todos los usuarios
  server.io.in(id).emit("mensaje-privado", payload); // mandar mensajes a un unico usuario
  // server.io.emit("mensaje-privado", payload); // mandar mensajes a todos

  return res.json({
    ok: true,
    mensaje: "POST - LISTO",
    body: body,
    cuerpo: cuerpo,
    de: de,
    id: id,
  });
});

// Servicio para obtener todos los IDs  de los usuarios
router.get("/usuarios", (req: Request, res: Response) => {
  const server = Server.instance;

  // server.io.clients((err en caso de q suceda, clientes ))
  server.io.clients((err: any, clientes: string[]) => {
    if (err) {
      return res.json({
        ok: false,
        error: err,
      });
    }

    return res.json({
      ok: true,
      clientes: clientes,
    });
  });
});

router.get("/usuarios/detalle", (req: Request, res: Response) => {
  const server = Server.instance;

  // server.io.clients((err en caso de q suceda, clientes ))
  server.io.clients((err: any, clientes: string[]) => {
    if (err) {
      return res.json({
        ok: false,
        error: err,
      });
    }

    return res.json({
      ok: true,
      clientes: usuariosConectados.getUsuarios(),
    });
  });

  // return res.json({
  //   ok: true,
  //   clientes: usuariosConectados.getUsuarios(),
  // });
});

export default router;
