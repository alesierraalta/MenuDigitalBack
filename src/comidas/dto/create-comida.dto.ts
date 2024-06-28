export class CreateComidaDto {
    readonly id_categoria: number;
    readonly nombre_comida: string;
    readonly descripcion_comida: string;
    readonly precio_comida: number;
    readonly imagen_url?: string;
    readonly video_url?: string;
  
    constructor(
      id_categoria: number,
      nombre_comida: string,
      descripcion_comida: string,
      precio_comida: number,
      imagen_url?: string,
      video_url?: string,
    ) {
      this.id_categoria = id_categoria;
      this.nombre_comida = nombre_comida;
      this.descripcion_comida = descripcion_comida;
      this.precio_comida = precio_comida;
      this.imagen_url = imagen_url;
      this.video_url = video_url;
    }
  }
  