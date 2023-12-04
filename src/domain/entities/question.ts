import { randomUUID } from "node:crypto"

export class Question {
  public id: string
  public title: string
  public content: string

  constructor(id: string, title: string, content: string) {
    this.id = id || randomUUID()
    this.title = title
    this.content = content
  }
}