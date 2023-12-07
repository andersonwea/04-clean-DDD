import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  items: Answer[] = []

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async findById(id: string): Promise<Answer | null> {
    const question = this.items.find((item) => item.id.toString() === id)

    if (!question) return null

    return question
  }

  async delete(id: string): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id.toString() === id,
    )

    this.items.splice(questionIndex, 1)
  }
}
