export interface QueueServiceRepository {
  sendMessage(data: unknown, exchangeName: string): Promise<void>;
}
