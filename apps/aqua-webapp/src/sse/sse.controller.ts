import { Controller, Param, ParseIntPipe, Sse } from "@nestjs/common";
import { Observable } from "rxjs";

import { SseService } from "./sse.service";

@Controller()
export class SseController {
  constructor(private readonly sseService: SseService) {}

  @Sse("/game/:gameId/sse")
  subscribeToGame(
    @Param("gameId", ParseIntPipe) gameId: number,
  ): Observable<MessageEvent> {
    return this.sseService.subscribe(gameId);
  }
}
