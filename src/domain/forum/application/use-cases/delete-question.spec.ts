import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from '@/test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('1'),
    })

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      authorId: '1',
      questionId: question.id.toString(),
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question that its not yours', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('1'),
    })

    expect(() => {
      return sut.execute({
        authorId: '2',
        questionId: question.id.toString(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
