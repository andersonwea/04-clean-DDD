import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from '@/test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { makeAnswer } from '@/test/factories/make-answer'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryQuestionsRepository,
    )
  })

  it('should be able to choose question best answer', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      authorId: question.authorId.toString(),
      answerId: answer.id.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose question best answer that its not yours', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('1'),
    })
    const answer = makeAnswer({
      questionId: question.id,
    })

    expect(() => {
      return sut.execute({
        authorId: '2',
        answerId: answer.id.toString(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})