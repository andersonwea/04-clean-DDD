import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from '@/test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const answer = makeAnswer({
      authorId: new UniqueEntityId('1'),
    })

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      authorId: '1',
      answerId: answer.id.toString(),
      content: 'Novo conteúdo',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Novo conteúdo',
    })
  })

  it('should not be able to edit a answer that its not yours', async () => {
    const answer = makeAnswer({
      authorId: new UniqueEntityId('1'),
    })

    expect(() => {
      return sut.execute({
        authorId: '2',
        answerId: answer.id.toString(),
        content: 'Novo conteúdo',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
