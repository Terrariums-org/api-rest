export interface QueueRepository {
  createChannel(exchangeName: string): Promise<unknown>;
  sendMessageToChannel(data: unknown, exchangeName: string, routingKey : string): Promise<void>;
}
