import { Note } from '../src/Note';
import notes from './notes.json'

test('Note Test', () => {
  for (const testNote of notes) {
    const noteNameOptions = testNote.noteName.split('/');
    for (let noteNameFull of noteNameOptions) {
      const noteName = noteNameFull.match(/\w[#b]?(?!=\d)/)
      if (!noteName) throw Error();
      const note = new Note(+testNote.midi, noteName[0].toLowerCase(), 'q', 100);
      expect(note.midiNote).toBe(+testNote.midi);
      expect(note.noteName).toBe(noteName[0].toLowerCase());
      expect(note.frequency).toBeCloseTo(+testNote.frequency, 2);
    }
  }
});
