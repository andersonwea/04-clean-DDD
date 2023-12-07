import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { makeAnswer } from '@/test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answer', async () => {
    const answer = makeAnswer({
      authorId: new UniqueEntityId('1'),
    })

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      authorId: '1',
      answerId: answer.id.toString(),
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer that its not yours', async () => {
    const answer = makeAnswer({
      authorId: new UniqueEntityId('1'),
    })

    expect(() => {
      return sut.execute({
        authorId: '2',
        answerId: answer.id.toString(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
