import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "upcomingToLatest"
})
export class OrderByUpcomingToLatestPipe implements PipeTransform {

    transform(value: any): any {
        let newVal = value?.sort((a: any, b: any) => {
            let date1 = new Date(a.dates.valueDate);
            let date2 = new Date(b.dates.valueDate);

            if (date1 <date2) {
                return 1;
            } else if (date1 > date2) {
                return -1;
            } else {
                return 0;
            }
        });

        return newVal;
    }

}