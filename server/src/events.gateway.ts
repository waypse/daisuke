import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class EventsGateway {
  @SubscribeMessage('audio-data')
  handleMessage(@MessageBody() audioData: string): void {
    console.log('Received fingerprint:', audioData);
    // Handle the fingerprint message here
  }
}
