import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { Either } from '@/core/either'

interface AnswerQuestionUseCaseRequest {
  questionId: string
  instructorId: string
  content: string
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>

export class AnswerQuestionUseCase {
  constructor(private answersRespository: AnswersRepository) {}

  async execute({
    questionId,
    instructorId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      questionId: new UniqueEntityId(questionId),
      authorId: new UniqueEntityId(instructorId),
    })

    await this.answersRespository.create(answer)

    return {
      answer,
    }
  }
}
