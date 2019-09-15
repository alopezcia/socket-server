
import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';


const router = Router();

router.get('/mensajes', ( req : Request, res: Response) => {
    res.json({
        ok: true,
        mensajes: 'Todo está bien!!'
    });
});

router.post('/mensajes', ( req : Request, res: Response) => {
   const cuerpo  = req.body.cuerpo;
   const de = req.body.de;
   const payload = {
        de,
        cuerpo
    };
    const server = Server.instance;
    server.io.emit( 'mensaje-nuevo', payload );

    res.json({
        ok: true,
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', ( req : Request, res: Response) => {
    const cuerpo  = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    };

    const server = Server.instance;
    server.io.in( id ).emit( 'mensaje-privado', payload );

     res.json({
         ok: true,
         cuerpo,
         de,
         id
     });
 });

// Servicio para obtener todos los id de los usaurios conectados 
router.get('/usuarios', (req: Request, resp: Response) => {
    const server = Server.instance;
    server.io.clients( ( err: any, clientes: string[] ) => {
        if( err ){
            return resp.json({
                ok: false,
                err
            });
        }

        resp.json({
            ok: true,
            clientes
        });

    });
});

// Servicio para obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req: Request, resp: Response) => {
        resp.json({
            ok: true,
            clientes: usuariosConectados.getListUsuarios()
        });
});


export default router;