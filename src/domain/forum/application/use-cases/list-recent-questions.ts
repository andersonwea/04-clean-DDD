import { Either, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface ListRecentQuestionsUseCaseResquest {
  page: number
}

type ListRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>

export class ListRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: ListRecentQuestionsUseCaseResquest): Promise<ListRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return right({
      questions,
    })
  }
}
