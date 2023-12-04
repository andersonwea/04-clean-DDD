import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

test('Create an answer', async () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase()

  const answer = await answerQuestionUseCase.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova resposta'
  })

  expect(answer.content).toEqual('Nova resposta')
})