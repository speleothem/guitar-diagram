import React from "react";

type Tuning = string[];

const NOTES: string[] = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
];

const getNoteIndex = (note: string): number => {
  return NOTES.findIndex((n) => n == note);
};

type NoteObject = {
  stringIndex: number;
  name: string;
};

type State = {
  selectedNotes: NoteObject[];
};

export default function Guitar({
  stringCount = 6,
  fretCount = 12,
  tuning = ["E", "A", "D", "G", "B", "E"],
  onChange = () => {},
  state = { selectedNotes: [] },
}: {
  stringCount?: number;
  fretCount?: number;
  tuning?: Tuning;
  onChange?: (arg0: State) => void;
  state?: State;
}) {
  function Fret() {
    return <div className="fret" />;
  }

  function handleClick(stringIndex: number, name: string) {
    console.log(`${stringIndex}: ${name}`);
    onChange({
      ...state,
      selectedNotes: [...state.selectedNotes, { stringIndex, name }],
    });
  }

  function Note({ name, stringIndex }: { name: string; stringIndex: number }) {
    const active = state.selectedNotes.filter(
      (n) => n.name == name && n.stringIndex == stringIndex
    );
    const classes = active.length > 0 ? "fret-note active" : "fret-note";
    return (
      <button
        className={classes}
        type="button"
        onClick={() => handleClick(stringIndex, name)}
      >
        {name}
      </button>
    );
  }

  function GuitarString({
    rootIndex,
    index,
  }: {
    rootIndex: number;
    index: number;
  }) {
    let notes: string[] = [];
    for (let i = 0; i < fretCount; ++i) {
      notes.push(NOTES[(rootIndex + i) % NOTES.length]);
    }

    return (
      <div className="string">
        {notes.map((n) => (
          <Note name={n} stringIndex={index} />
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
          {tuning.map((startingNote: string, i) => (
            <GuitarString rootIndex={getNoteIndex(startingNote)} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
