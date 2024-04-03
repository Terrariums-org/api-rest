import { Inject, Injectable } from '@nestjs/common';
import { QueueServiceRepository } from '../../domain/repository';
import { QueueRepositoryImp } from '../../infraestructure/ports/AmqpLib';

@Injectable()
export class QueueServiceRepositoryImp implements QueueServiceRepository {
  constructor(
    @Inject(QueueRepositoryImp)
    private readonly queueRepository: QueueRepositoryImp,
  ) {}
  async sendMessage(
    data: unknown,
    exchangeName: string,
    routingKey = 'info',
  ): Promise<void> {
    try {
      await this.queueRepository.sendMessageToChannel(
        data,
        exchangeName,
        routingKey,
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
