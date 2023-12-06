import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Questin Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Titulo da pergunta',
      content: 'Conteúdo da pergunta',
    })

    expect(question.content).toEqual('Conteúdo da pergunta')
    expect(inMemoryQuestionsRepository.items[0]).toEqual(question)
  })
})
