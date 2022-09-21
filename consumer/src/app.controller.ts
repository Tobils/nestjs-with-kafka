import { Controller, Get, Inject } from '@nestjs/common';
import { ClientKafka, Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService){}

  @MessagePattern('medium.rocks')
  readMessage(@Payload() message: any, @Ctx() context: KafkaContext){
    const originMessage = context.getMessage()
    const response = `Receiving a new message from topic: medium.rocks ${JSON.stringify(originMessage.value)}`
    console.log({response});
    return {response}
  }
}
