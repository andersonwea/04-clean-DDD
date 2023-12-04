import { Answer } from "../entities/answer"

interface AnswerQuestionUseCaseRequest {
  questionId: string
  instructorId: string
  content: string
}

export class AnswerQuestionUseCase {
  async execute({ questionId, instructorId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      questionId,
      authorId: instructorId,
      content
    })

    return answer
  } 
}