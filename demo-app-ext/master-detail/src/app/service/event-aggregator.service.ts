import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pluck';
import {Message} from "primeng/components/common/api";

export interface IEvent<T> {
    name: string;
}

export class Events {
  public static showConfirmDialog: IEvent<{message: string, header?: string, acceptCallback: Subject<boolean>}> = { name: "showConfirmDialog" };
  public static showGlobalMessage: IEvent<Message> = { name: "showGlobalMessage" };
}

export class AggregatorEvent<T> {
    type: IEvent<T>;
    data: T;
    publisher: any;
}

@Injectable()
export class EventAggregatorService {
    private eventAggregator: Subject<AggregatorEvent<any>> = new Subject<AggregatorEvent<any>>();

    constructor() {
        // zobrazeni informaci z event aggregatoru
        this.eventAggregator.subscribe((data) => {
            console.log("[Event published] type: [", data.type, "], publisher: [", data.publisher, "] data: ", data.data);
            // Raven.captureMessage('Event published', {
            //   extra: { data: data },
            //   level: 'info' // one of 'info', 'warning', or 'error'
            // });
        });
    }

    /**
     * provede vyvolani udalosti [type] a preda data [data] vsem posluchaum na tuto [type] eventu
     */
    publishEvent<T>(type: IEvent<T>, data: T, publisher: any = "[not defined]") {
        this.eventAggregator.next({ type: type, data: data, publisher: publisher });
    }

    /**
     * prida posluchace na konkretni eventu viz class Events
     * - da moznost zaregistrovat subscribe, ktery dostane jako eventu primo data
     */
    listenEventData<T>(type: IEvent<T>): Observable<T> {
        return this.eventAggregator.filter((data) => { return data.type === type }).pluck('data') as Observable<T>;
    }

    /**
     * prida posluchace na konkretni eventu viz class Events
     * - da moznost zaregistrovat subscribe, ktery dostane jako eventu AggregatorEvent<T>
     */
    listenEvent<T>(type: IEvent<T>): Observable<AggregatorEvent<T>> {
        return this.eventAggregator.filter((data) => { return data.type === type });
    }

    /**
     * provede ukonceni streamu (POZOR vsichni posluchaci se ukonci a neni mozne posilat nove eventy)
     */
    disposeEventsAggregator() {
        this.eventAggregator.complete();
    }

    /**
     * vytvori novy stream (POZOR je potreba vsechny posluchace opet zaregistrovat)
     */
    createEventsAggregator() {
        this.eventAggregator = new Subject<AggregatorEvent<any>>();
    }
}
