import { QueueRepository } from '../../domain/repository/QueueRepository';
import { Injectable } from '@nestjs/common';
import { configService } from '../../../../config/domain';
import { MqttClient, connect } from 'mqtt';

@Injectable()
export class QueueRepositoryImp implements QueueRepository {
  private readonly url: string = configService.get<string>('BROKER_HOST');
  async sendMessageToChannel(data, exchangeName): Promise<void> {
    try {
      const conn: MqttClient = connect(this.url, {
        protocol: 'mqtt',
        port: 1883,
        username: 'guest',
        password: 'guest',
      });
      conn.on('connect', () => {
        console.log('connection established with broker ' + this.url);
        conn.publish(
          exchangeName,
          JSON.stringify(data),
          { qos: 0, retain: false },
          (err) => {
            if (err) {
              console.error('error: ', err);
            } else {
              console.log('msg sent to exchange ' + exchangeName);
            }
          },
        );
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
