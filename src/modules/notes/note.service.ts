import { type createNoteDTO } from './dto/notes.schema.ts'
import { NoteRepository } from './note.repository.ts'

export class NoteService {
  private repo = new NoteRepository()

  async create(data: createNoteDTO) {
    const note = await this.repo.create(data)
    return note
  }
}