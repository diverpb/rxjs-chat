import { BehaviorSubject } from "rxjs"
import { useObservableState } from "./useObservableState";

export function useBehaviorSubjectState<T>(subject$: BehaviorSubject<T>): T {
    return useObservableState(subject$, subject$.getValue());
}