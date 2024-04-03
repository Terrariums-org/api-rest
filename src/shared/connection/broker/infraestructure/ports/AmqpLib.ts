import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { QueueRepository } from '../../domain/repository/QueueRepository';
import { Channel } from 'amqplib';
import { Injectable } from '@nestjs/common';
import { configService } from '../../../../config/domain';

@Injectable()
export class QueueRepositoryImp implements QueueRepository {
  private readonly url: string = configService.get<string>('BROKER_HOST');
  async createChannel(exchangeName: string): Promise<ChannelWrapper> {
    try {
      const conn = amqp.connect(this.url);
      const channelWrapper = conn.createChannel({
        setup: (channel: Channel) => {
          return channel.assertExchange(exchangeName, 'topic');
        },
      });
      return channelWrapper;
    } catch (error) {
      throw new Error(error);
    }
  }

  async sendMessageToChannel(
    data,
    exchangeName,
    routingKey: string,
  ): Promise<void> {
    try {
      const channel = await this.createChannel(exchangeName);
      const sent = await channel.publish(
        exchangeName,
        routingKey,
        Buffer.from(JSON.stringify(data)),
        {
          persistent: true,
        },
      );
      console.log(
        sent + 'message send to :' + exchangeName,
        'with data: ' + data,
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
