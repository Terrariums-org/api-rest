import { Inject, Injectable } from '@nestjs/common';
import { QueueServiceRepository } from '../../domain/repository';
import { QueueRepositoryImp } from '../../infraestructure/ports/MqttLib';

@Injectable()
export class QueueServiceRepositoryImp implements QueueServiceRepository {
  constructor(
    @Inject(QueueRepositoryImp)
    private readonly queueRepository: QueueRepositoryImp,
  ) {}
  async sendMessage(data: unknown, exchangeName: string): Promise<void> {
    try {
      await this.queueRepository.sendMessageToChannel(data, exchangeName);
    } catch (error) {
      throw new Error(error);
    }
  }
}
