import {type createNoteDTO } from './dto/notes.schema.ts'
import { NoteService } from './note.service.ts'

export class NoteController {
  private service = new NoteService()

  async create(data: createNoteDTO) {
    return this.service.create(data)
  }
}