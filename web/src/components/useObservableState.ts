import { useEffect, useState } from "react"
import { Observable } from "rxjs"

export function useObservableState<T>(observable$: Observable<T>, initialValue: T): T {
    const [state, setState] = useState(initialValue);

    useEffect(() => {
        const subscription = observable$.subscribe(v => setState(v));
        return () => subscription.unsubscribe();
    }, [observable$])

    return state;
}