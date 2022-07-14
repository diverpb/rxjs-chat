import { concat, interval, last, Subject, tap, of, take , concatMap, Observable, merge, map} from "rxjs";
import { log, tapLog } from "./log";

export const playground = () => {
    // const o1 = interval(500).pipe(
    //     map(v => 'o1 ' + v),
    //     take(3)
    // );

    // const o2 = interval(300).pipe(
    //     map(v => 'o2 ' + v),
    //     take(2)
    // )

    // merge(o1, o2).subscribe({
    //         next: (n) => log("s1 next", n),
    //         error: (e) => log("s1 error", e),
    //         complete: () => log("s1 complete"),
    //       });

    // const comp = new Observable(observer => observer.complete())

    // const fin = comp.pipe(last(null, null), concatMap(() => of('end')));

    // fin.subscribe({
    //           next: (n) => log("next", n),
    //   error: (e) => log("error", e),
    //   complete: () => log("complete"),
    // })

//   const s1 = new Subject<number>();

//   const int$ = interval(1000).pipe(tap((n) => log("int", n)));

//   const subs1 = int$.subscribe(s1);

//   setTimeout(() => {
//     s1.complete();
//   }, 3500);

//   concat(s1, of(10))
//     .pipe(last())
//     .subscribe({
//       next: (n) => log("s1 next", n),
//       error: (e) => log("s1 error", e),
//       complete: () => log("s1 complete"),
//     });

  //
};
