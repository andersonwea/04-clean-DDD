import { Answer } from "../entities/answer"
import { AnswersRepository } from "../repositories/answers-repository"

interface AnswerQuestionUseCaseRequest {
  questionId: string
  instructorId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answerRespository: AnswersRepository) {}

  async execute({ questionId, instructorId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      questionId,
      authorId: instructorId,
      content
    })

    await this.answerRespository.create(answer)

    return answer
  } 
}