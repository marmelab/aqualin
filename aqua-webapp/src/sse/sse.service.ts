import { Injectable } from "@nestjs/common";
import { Observable, Subject } from "rxjs";

@Injectable()
export class SseService {
  #listeners: { count: number; subject: Subject<MessageEvent> }[] = [];

  subscribe(gameId: number): Observable<MessageEvent> {
    if (!this.#listeners[gameId]) {
      this.#listeners[gameId] = {
        count: 1,
        subject: new Subject<MessageEvent>(),
      };
    } else {
      this.#listeners[gameId].count++;
    }
    return this.#listeners[gameId].subject.asObservable();
  }

  unregister(gameId: number) {
    if (!this.#listeners[gameId]) {
      return;
    }
    this.#listeners[gameId].count--;
    if (this.#listeners[gameId].count === 0) {
      this.#listeners[gameId] = undefined;
    }
  }

  newGameEvent(gameId: number) {
    if (!this.#listeners[gameId]) {
      return;
    }
    this.#listeners[gameId].subject.next({ data: "Aqualin" } as MessageEvent);
  }
}
