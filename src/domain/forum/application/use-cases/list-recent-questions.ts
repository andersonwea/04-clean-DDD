import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface ListRecentQuestionUseCaseResquest {
  page: number
}

interface ListRecentQuestionUseCaseResponse {
  questions: Question[]
}

export class ListRecentQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: ListRecentQuestionUseCaseResquest): Promise<ListRecentQuestionUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return {
      questions,
    }
  }
}
