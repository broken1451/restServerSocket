/*  Este código va en el backend
    Es la nueva clase de GraficaData

    Si este archivo ya existe, reemplazarlo por este nuevo.
    Esta simplificado pero funciona de la misma manera
    que en la sección anterior.
*/

export class GraficaEncuesta {
  private labels: string[] = [];
  private valores: number[] = [0, 0, 0, 0];

  constructor() {}

  setLabels(labels: string[]) {
    this.labels = labels;
  }

  getDataGrafica() {
    return [{ data: this.valores, label: "Preguntas" }];
  }

  incrementarValor(opcion: number, valor: any) {
    for (const [i, valores] of this.valores.entries()) {
      if (opcion >= 0) {
        if (opcion === 4) {
          throw new Error("Solo se puede ingresar valores del 0 al 3");
        }

        if (opcion != valor || opcion == valor) {
          console.log({ i, valores, opcion, valor }); 
          console.log({ Valor: valor }); 
          console.log("this.valores[opcion]: ", this.valores[opcion]);
          this.valores[opcion] = this.valores[opcion] + valor; 
          console.log("this.valores[opcion]: ", this.valores[opcion]);
          break;
        }
      }
    }

    return this.getDataGrafica();
  }
}
