export interface QueueServiceRepository {
  sendMessage(
    data: unknown,
    exchangeName: string,
    routingKey: string,
  ): Promise<void>;
}
