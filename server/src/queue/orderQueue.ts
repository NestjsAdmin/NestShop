import { FsOrder } from '@/model/FsOrder'
import { Processor, Process } from '@nestjs/bull'
import { Job } from 'bullmq'
import { DataSource } from 'typeorm'

@Processor('order')
export class OrderQueue {
  constructor(private dataSource: DataSource) {}

  @Process('cancel')
  async cancel(job: Job<number>) {
    await this.dataSource.transaction(async (manager) => {
      const order = await manager.findOne(FsOrder, {
        where: {
          id: job.data,
        },
        lock: {
          mode: 'pessimistic_write',
        },
      })
      if (order.isPaid) return
      order.status = 6
      manager.save(order)
    })
  }
}
