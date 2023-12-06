import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../forum/enterprise/entities/answer'

const fakeAnswerRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    console.log(answer)
  },
}

test('Create an answer', async () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestionUseCase.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})
