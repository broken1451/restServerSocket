import { Router, Request, Response } from "express";
import Server from "../classes/server";
import { usuariosConectados } from '../sockects/sockets';

// export const router = Router();
const router = Router();

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
