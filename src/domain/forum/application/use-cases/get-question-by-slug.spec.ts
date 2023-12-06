import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { makeQuestion } from '@/test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to find question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('titulo-da-pergunta'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'titulo-da-pergunta',
    })

    expect(question?.id).toEqual(expect.any(UniqueEntityId))
    expect(question?.title).toBe('Título da pergunta')
  })
})
