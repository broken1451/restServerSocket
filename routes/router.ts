import { Router, Request, Response } from "express";

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
  const id = req.params.id;

  return res.json({
    ok: true,
    mensaje: "POST - LISTO",
    body: body,
    cuerpo: cuerpo,
    de: de,
    id: id,
  });
});

export default router;
