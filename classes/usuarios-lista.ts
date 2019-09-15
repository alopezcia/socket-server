import { Usuario } from "./usuario";

export class UsuariosLista {
    private lista: Usuario[] = [];

    constructor(){}

    // Agregar un uusuario
    public agregar( usuario: Usuario ){
        this.lista.push( usuario);
        console.log('==== Agregando usuario ====');
        console.log(this.lista);
        return usuario;
    }

    // Actualizar el nombre de un usuario
    public actualizarNombre( id: string, nombre: string){
        for( let usuario of this.lista ){
            if (usuario.id === id ){
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('==== Actualizando usuario ====');
        console.log(this.lista);
    }

    // Obtener los usuarios conectados
    public getListUsuarios(){
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }

    // Obtener usuario por id
    public getUsuario( id: string ) {
        return this.lista.find( usuario => usuario.id === id );
    }

    // Obtener los usuarios conectados a una sala
    public getUsuariosEnSala( sala: string ){
        this.lista.filter( usuario => usuario.sala === sala );
    }

    // Eliminar un usuario
    public borrarUsuario( id: string ){
        const tempUsuario = this.getUsuario( id );
        this.lista = this.lista.filter( usuario => usuario.id !== id );
        console.log('==== Borrado usuario ====');
        console.log(this.lista);
        return tempUsuario;
    }
}