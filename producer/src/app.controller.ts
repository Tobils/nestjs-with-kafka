import { Controller, Get, Inject, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly appService: AppService, 
    @Inject('any_name_i_want')
    private readonly client: ClientKafka
    ) {}

    async onModuleInit() {
      ['medium.rocks'].forEach((key) => {
        this.client.subscribeToResponseOf(`${key}`)
        Logger.debug({key})
      });
      await this.client.connect();
    }

    async onModuleDestroy() {
      await this.client.close();
    }

  @Get('/kafka-test')
  kafkaTest(){
    return this.client.emit('medium.rocks', {foo: 'mantaf', data: new Date().toString()})
  }

  @Get('/kafka-test-with-response')
  kafkaTestWithResponse(){
    return this.client.send('medium.rocks', {foo:'bar', data: new Date().toString()})
  }
}
