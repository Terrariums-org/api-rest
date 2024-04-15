export interface QueueRepository {
  sendMessageToChannel(data: unknown, exchangeName: string): Promise<void>;
}
