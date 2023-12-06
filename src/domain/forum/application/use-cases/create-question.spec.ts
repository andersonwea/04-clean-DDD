import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionRepository: QuestionsRepository = {
  create: async (question: Question) => {
    console.log(question)
  },
}

test('It should able to create question', async () => {
  const createQuestionUseCase = new CreateQuestionUseCase(
    fakeQuestionRepository,
  )

  const { question } = await createQuestionUseCase.execute({
    authorId: '1',
    content: 'Conteúdo da pergunta',
    title: 'Título da pergunta',
  })

  expect(question.id).toBeTruthy()
})
