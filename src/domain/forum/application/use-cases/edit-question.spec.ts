import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from '@/test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('1'),
    })

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      authorId: '1',
      questionId: question.id.toString(),
      content: 'Novo conteúdo',
      title: 'Novo título',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Novo título',
      content: 'Novo conteúdo',
    })
  })

  it('should not be able to edit a question that its not yours', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('1'),
    })

    await inMemoryQuestionsRepository.create(question)

    const result = await sut.execute({
      authorId: '2',
      questionId: question.id.toString(),
      title: 'Novo título',
      content: 'Novo conteúdo',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
