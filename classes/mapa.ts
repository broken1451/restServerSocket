import { Marcador } from "./marcador";

export class Mapa {
  // private marcadores: Marcador[] = []
  private marcadores: { [key: string]: Marcador } = {
    "1": {
      id: "1",
      nombre: "Fernando",
      lng: -75.75512993582937,
      lat: 45.349977429009954,
      color: "#dd8fee",
    },
    "2": {
      id: "2",
      nombre: "Amy",
      lng: -75.75195645527508,
      lat: 45.351584045823756,
      color: "#790af0",
    },
    "3": {
      id: "3",
      nombre: "Orlando",
      lng: -75.75900589557777,
      lat: 45.34794635758547,
      color: "#19884b",
    },
  };

  constructor() {}

  getMarcadores() {
    return this.marcadores;
  }

  agregarMaker(marcador: Marcador){
    console.log({marcadores: this.marcadores})
    console.log({marcador})
    this.marcadores[marcador.id] = marcador
    console.log('marcador[id]', this.marcadores[marcador.id])
    console.log({marcadorId: this.marcadores[marcador.id]})
    console.log({marcadores: this.marcadores})
  }

  borrarMarcador(id: string) {
    console.log("this.marcadores[id]: ", this.marcadores[id]);
    // delete this.marcadores[id];
    delete this.marcadores[id]
    return this.getMarcadores();
  }

  moverMrcador(marcador: Marcador) {
    console.log({ marcador });
    this.marcadores[marcador.id].lng = marcador.lng;
    console.log(
      " this.marcadores[marcador.id].lng: ",
      this.marcadores[marcador.id].lng
    );
    this.marcadores[marcador.id].lat = marcador.lat;
    console.log(
      " this.marcadores[marcador.id].lat: ",
      this.marcadores[marcador.id].lat
    );
  }
}
