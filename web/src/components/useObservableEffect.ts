import { useEffect, useRef } from "react";
import { Observable } from "rxjs";

export const useObservableEffect = <T>(observable$: Observable<T>, callback: (v: T) => void) => {
    const callbackRef = useRef<(v: T) => void>(callback);

    useEffect(() => {
        const subscription = observable$.subscribe((v) => {
            callbackRef.current(v);
        })

        return () => subscription.unsubscribe();
    }, [observable$])
}