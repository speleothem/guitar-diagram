import React from "react";

type Tuning = string;

type NoteObject = {
  fret: number;
  string: number;
};

type State = {
  selectedNotes: NoteObject[];
};

export default function Guitar({
  stringCount = 6,
  fretCount = 12,
  tuning = "EADGBE",
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

  function Note({ active }: { active: boolean }) {
    const classes = active ? "fret-note active" : "fret-note";
    return <button className={classes} type="button" />;
  }

  function GuitarString() {
    return (
      <div className="string">
        {Array(fretCount).fill(<Note active={false} />)}
      </div>
    );
  }

  return (
    <div className="neck">
      <div className="nut" />
      <div className="body">
        <div className="frets">{Array(fretCount).fill(<Fret />)}</div>
        <div className="strings">
          {Array(stringCount).fill(<GuitarString />)}
        </div>
      </div>
    </div>
  );
}
