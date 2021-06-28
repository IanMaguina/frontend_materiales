import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
import * as Excel from 'exceljs';
import { isString } from 'ngx-cookie';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelGeneratorService {

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    /*     console.log(JSON.stringify(json));
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        console.log('worksheet',JSON.stringify(worksheet));
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' }); */

    let cabecera = Object.keys(json[0]);
    let detalle: any[] = [];
    json.forEach((row: any) => {
      detalle.push(Object.values(row))
    })

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Carga Masiva');
    let headerRow = worksheet.addRow(cabecera);

    headerRow.eachCell((cell: any, number: any) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' }
      }
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12
      }
    })

    // Adding Data with Conditional Formatting
    detalle.forEach(d => {
      let row = worksheet.addRow(d);
/*       row.getCell(2).dataValidation = {
        type: 'textLength',
        operator: 'lessThan',
        showErrorMessage: true,
        allowBlank: false,
        formulae: [40]
      } */
      
      let sales = row.getCell(6);
/*       let color = 'FF99FF99';
      sales.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color }
      } */
    }
    );

    worksheet.getColumn(3).width = 20;
    worksheet.addRow([]);


    this.saveAsExcelFile(workbook, excelFileName);
  }

  public exportListadoAsExcelFile(json: any[], posicionColumnasError: any[], excelFileName: string): void {

    let cabecera = Object.keys(json[0]);
    let detalle: any[] = [];
    json.forEach((row: any) => {
      let fila:any[]=Object.values(row);
      detalle.push(fila);
    })

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Carga Masiva');
    let headerRow = worksheet.addRow(cabecera);

    headerRow.eachCell((cell: any, number: any) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' }
      }
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12
      }
    })


    // Adding Data with Conditional Formatting
    let fila = 0;
    let aux: any[] = posicionColumnasError;
    detalle.forEach((d:any[]) => {
      fila++;
      let aux:any[]=[];
      //let dvalor:any[]=d;
      d.forEach(v=>{
        if (isString(v)){
          v=v.split(/@@@/i).join('\n');
          aux.push(v);
        }else{
          aux.push(v);
        }
      })
      console.log(JSON.stringify(aux));
      let row = worksheet.addRow(aux);

      for (let x = 0; x < posicionColumnasError.length; x++) {
        let element = aux[x];
        let posicion: any[] = [];
        if (element.fila == fila) {
          posicion = element.posicion;
          posicion.forEach((p) => {
            //console.log('arsa-->' + p);
            let celda = row.getCell(p);
            let color = 'FF0000';
            celda.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: color }
            }
          })
          break;
        }
      }
    }
    );

/*     worksheet.getCell('B2').dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['"One,Two,Three,Four"']
    }; */
    worksheet.getColumn(1).width = 30;
    //worksheet.getColumn(1).hidden=true;


    worksheet.addRow([]);


    this.saveAsExcelFile(workbook, excelFileName);
  }

  private saveAsExcelFile(workbook: any, fileName: string): void {
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob: Blob = new Blob([data], { type: EXCEL_TYPE });
      //FileSaver.saveAs(blob, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      FileSaver.saveAs(blob, fileName + EXCEL_EXTENSION);
    })

  }

  onFileSeleted(event: any, tabs:any[]): Promise<any> {

    return new Promise((resolve, reject) => {
      const workbook = new Excel.Workbook();
      const target: DataTransfer = <DataTransfer>(event.target);
      if (target.files.length !== 1) {
        throw new Error('Cannot use multiple files');
      }

      /**
       * Final Solution For Importing the Excel FILE
       */

      const arryBuffer = new Response(target.files[0]).arrayBuffer();
      arryBuffer.then(function (data) {
        workbook.xlsx.load(data)
          .then(function () {

            // play with workbook and worksheet now
            //console.log(workbook);
            const worksheet = workbook.getWorksheet(1);
            //console.log('rowCount: ', worksheet.rowCount);
            //console.log('ColumnCount: ', worksheet.columnCount);

            let cabecera: any[] = [];
            let detalle: any[] = [];
            let filaCompleta: any[] = [];
            let fila: any = "";

            let campos: any[] = [];
            let tabla_intermedia: any[] = tabs;
            worksheet.eachRow(function (row, rowNumber) {
              fila = "";

              if (rowNumber == 1) {
                for (let x = 1; x <= worksheet.columnCount; x++) {
                  cabecera[x] = row.getCell(x).value;
                }
              } else {
                campos = [];
                for (let x = 2; x <= worksheet.columnCount; x++) {
                  tabla_intermedia.forEach(element => {

                  })
                  if (tabla_intermedia.indexOf(cabecera[x].toString()) >= 0) {
                    let arrayC = row.getCell(x).toString().split(",");
                    let valores: any[] = [];
                    arrayC.forEach(item => {
                      valores.push({ 'valor': (item==null?"":item) })
                    })
                    campos.push({ "codigo_interno": cabecera[x], "valores": valores });
                  } else {
                    campos.push({ "codigo_interno": cabecera[x], "valor": (row.getCell(x).value==null?"":row.getCell(x).value) });
                  }
                }
                //console.log('arsa-->' + JSON.stringify(campos));
                if (row.getCell(1).value != null) {
                  filaCompleta.push({ "id_material_solicitud": row.getCell(1).value, "campos": campos })
                } else {
                  filaCompleta.push({ "campos": campos })
                }
              }
            });
            console.log("Materiales a cargar-->" + JSON.stringify({ "materiales": filaCompleta }));
            resolve({ "materiales": filaCompleta });

          });
      });

    });
  }


  onFileSeletedOLD(event: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const workbook = new Excel.Workbook();
      const target: DataTransfer = <DataTransfer>(event.target);
      if (target.files.length !== 1) {
        throw new Error('Cannot use multiple files');
      }

      /**
       * Final Solution For Importing the Excel FILE
       */

      const arryBuffer = new Response(target.files[0]).arrayBuffer();
      arryBuffer.then(function (data) {
        workbook.xlsx.load(data)
          .then(function () {

            // play with workbook and worksheet now
            //console.log(workbook);
            const worksheet = workbook.getWorksheet(1);
            //console.log('rowCount: ', worksheet.rowCount);
            //console.log('ColumnCount: ', worksheet.columnCount);

            let cabecera: any[] = [];
            let detalle: any[] = [];
            let filaCompleta: any[] = [];
            let fila: any = "";


            worksheet.eachRow(function (row, rowNumber) {
              fila = "";
              let campos = [];
              if (rowNumber == 1) {
                for (let x = 1; x <= worksheet.columnCount; x++) {
                  cabecera[x] = row.getCell(x);
                }
              } else {
                for (let x = 2; x <= worksheet.columnCount; x++) {
                  campos.push({ "codigo_interno": cabecera[x], "valor": "de la verdad" });
                  if (x == 2) {
                    fila = '{"codigo_interno":"' + cabecera[x] + '",';
                    fila = fila + '"valor":"' + row.getCell(x) + '"}';
                  } else {

                    fila = fila + ',{"codigo_interno":"' + cabecera[x] + '",';
                    fila = fila + '"valor":"' + row.getCell(x) + '"}';
                  }
                }

                filaCompleta = JSON.parse('[' + fila + ']');
                let insert: any = { "campos": filaCompleta };
                //console.log('campos-->'+JSON.stringify(campos));
                if (row.getCell(1).toString().trim() != '') {
                  insert = { "id_material_solicitud": row.getCell(1).toString().trim(), "campos": filaCompleta };
                }
                detalle.push(insert);
              }
            });
            resolve({ "materiales": detalle });
            //console.log("Materiales a cargar-->"+JSON.stringify({"materiales":detalle}));
          });
      });

    });
  }


  private saveAsExcelFileOLD(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
