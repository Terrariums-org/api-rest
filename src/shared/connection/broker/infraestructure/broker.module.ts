import { Module } from '@nestjs/common';
import { QueueServiceRepositoryImp } from '../application/services/queue.service.';
import { QueueRepositoryImp } from './ports/MqttLib';

@Module({
  providers: [QueueServiceRepositoryImp, QueueRepositoryImp],
  exports: [QueueServiceRepositoryImp],
})
export class BrokerModule {}
