import React from "react";

const NOTES: string[] = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const getNoteIndex = (note: string): number => {
  return NOTES.findIndex((n) => n == note);
};

type Note = {
  note: string;
  octave: number;
};

export type NotePosition = Note & {
  stringIndex: number;
};

type Tuning = Note[];

export type State = {
  selectedRoot?: NotePosition | undefined;
  selectedIntervals: NotePosition[];
  selectedNotes: NotePosition[];
  showUnselected: boolean;
};

export const INITIAL_STATE: State = {
  selectedRoot: undefined,
  selectedIntervals: [],
  selectedNotes: [],
  showUnselected: true,
};

export default function Guitar({
  stringCount = 6,
  fretCount = 12,
  tuning = [
    { note: "E", octave: 2 },
    { note: "A", octave: 2 },
    { note: "D", octave: 3 },
    { note: "G", octave: 3 },
    { note: "B", octave: 3 },
    { note: "E", octave: 4 },
  ],
  onChange = () => {},
  state,
}: {
  stringCount?: number;
  fretCount?: number;
  tuning?: Tuning;
  onChange?: (arg0: NotePosition) => void;
  state: State;
}) {
  function Fret() {
    return <div className="fret" />;
  }

  function handleClick(note: NotePosition) {
    console.log(note);
    onChange(note);
  }

  function notePositionEquals(
    left: NotePosition | undefined,
    right: NotePosition | undefined
  ) {
    if (!left || !right) {
      return false;
    }

    return (
      left.note == right.note &&
      left.octave == right.octave &&
      left.stringIndex == right.stringIndex
    );
  }

  function containsNotePosition(note: NotePosition, notes: NotePosition[]) {
    return notes.filter((n) => notePositionEquals(note, n)).length > 0;
  }

  function NoteButton({
    note,
    octave,
    stringIndex,
  }: {
    note: string;
    octave: number;
    stringIndex: number;
  }) {
    const isSelectedNote = containsNotePosition(
      { note, octave, stringIndex },
      state.selectedNotes
    );

    const isSelectedInterval = containsNotePosition(
      { note, octave, stringIndex },
      state.selectedIntervals
    );

    const isSelectedRoot = notePositionEquals(
      { note, octave, stringIndex },
      state.selectedRoot
    );

    let classes: string[] = ["fret-note"];
    if (
      isSelectedNote ||
      isSelectedInterval ||
      isSelectedRoot ||
      state.showUnselected
    ) {
      classes.push("shown");
    }
    if (isSelectedNote) {
      classes.push("selected");
    }
    if (isSelectedInterval) {
      classes.push("interval");
    }
    if (isSelectedRoot) {
      classes.push("root");
    }

    return (
      <button
        className={classes.join(" ")}
        type="button"
        onClick={() => handleClick({ note, octave, stringIndex })}
      >
        {note}
      </button>
    );
  }

  function GuitarString({
    rootNote,
    octave,
    index,
  }: {
    rootNote: string;
    octave: number;
    index: number;
  }) {
    let notes: NotePosition[] = [];
    let currentOctave = octave;
    let noteIndex = getNoteIndex(rootNote);
    for (let i = 0; i < fretCount; ++i) {
      if (noteIndex == NOTES.length) {
        ++currentOctave;
        noteIndex = noteIndex % NOTES.length;
      }

      notes.push({
        note: NOTES[noteIndex],
        octave: currentOctave,
        stringIndex: index,
      });

      ++noteIndex;
    }

    return (
      <div className="string">
        {notes.map((n) => (
          <NoteButton
            note={n.note}
            octave={n.octave}
            stringIndex={n.stringIndex}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="neck">
      <div className="nut" />
      <div className="body">
        <div className="frets">{Array(fretCount).fill(<Fret />)}</div>
        <div className="strings">
          {tuning.map(({ note, octave }, i) => (
            <GuitarString rootNote={note} octave={octave} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
