import { Socket } from "socket.io";
import socketIO  from  'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from "../classes/usuario";

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket ) =>{
    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar(usuario);
};

export const desconectar = ( cliente: Socket, io: socketIO.Server) => {
    cliente.on('disconnect', ()=> {
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getListUsuarios());
    });
};

export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('mensaje', ( payload : {de: string, cuerpo: string})=>{
        console.log('Mensaje recibido', payload);
        io.emit( 'mensaje-nuevo', payload );
        // Ya son ganas de pasar más parátros, se puede ahcer:
        // cliente.server.emit( 'mensaje-nuevo', payload );
    });
};

export const configurarUsuario = ( cliente: Socket, io: socketIO.Server ) =>{
    cliente.on('configurar-usuario', ( payload: {nombre: string}, callback: Function ) =>{
       usuariosConectados.actualizarNombre( cliente.id, payload.nombre );
       io.emit('usuarios-activos', usuariosConectados.getListUsuarios());

       // Como se usa éste método para el logout, pudiera llegar un nombre = sin-nombre
       // por lo que habría que proteger el callback  
       if ( payload.nombre !== 'sin-nombre' ){
            callback({
                 ok: true,
                 mensaje: `Usuario ${payload.nombre}, configurado` 
            });
        }
    });
};

export const obtenerUsuariosConectados = ( cliente: Socket, io: socketIO.Server ) =>{
    cliente.on( 'obtener_usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getListUsuarios());
    });
};
