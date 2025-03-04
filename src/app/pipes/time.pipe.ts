import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: Date | string, ...args: unknown[]): string {
    const months = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    let date: Date;
    typeof value === 'string'? date = new Date(value) : date = value;
  
    return `${date.getDate()} de ${months[date.getMonth()]}`;
  }

}
