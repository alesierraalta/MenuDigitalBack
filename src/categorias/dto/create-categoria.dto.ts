export class CreateCategoriaDto {
    readonly nombre_categoria: string;
    readonly imagen_url?: string;
  
    constructor(nombre_categoria: string, imagen_url?: string) {
      this.nombre_categoria = nombre_categoria;
      this.imagen_url = imagen_url;
    }
  }
  