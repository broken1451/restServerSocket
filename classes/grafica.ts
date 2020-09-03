export class GraficaData {
  private meses: string[] = ["enero", "febrero", "marzo", "abril"];
  private valores: number[] = [0, 0, 0, 4];

  constructor() {}

  getDataGrafica() {
    return [{ data: this.valores, label: "Ventas" }];
  }

  incrementarValor(mes: string, valor: number) {
    mes = mes.toLowerCase().trim();

    // for (const i in this.meses) {
    //   console.log('this.meses[i]:', { meses: this.meses[i] });
    //   if (this.meses[i] === mes) {
    //     console.log('this.valores[i]: ',{ valores: this.valores[i] });
    //     // this.valores[i] = this.valores[i] + valor;
    //     this.valores[i] += valor;
    //   }
    // }
    // this.meses.forEach((meses, i:any) => {
    //     if (meses === mes) {
    //      console.log('dentro if: ', { meses,mes, i , valor});
    //     // console.log("this.valores[i]: ", { valores: this.valores[i] });
    //     // this.valores[i] = this.valores[i] + i;
    //     this.valores[i] += valor;
    //   }
    // });

    for (const [i, meses] of this.meses.entries()) {
      // console.log('dentro if: ', { meses,mes, i ,valor});
      if (meses === mes) {
        console.log("dentro if: ", { meses, mes, i, valor });
        // console.log("this.valores[i]: ", { valores: this.valores[i] });
        console.log("this.valores[i] before: ", { valores: this.valores[i] });
        this.valores[i] = this.valores[i] + valor;
        console.log("this.valores[i]: ", { valores: this.valores[i] });
        //    this.valores[i] += valor;
      }
    }

    return this.getDataGrafica();
  }
}
