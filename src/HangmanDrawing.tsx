const HEAD = (
  <div
    style={{
      width: '65px',
      height: '65px',
      borderRadius: '100%',
      border: '10px solid black',
      position: 'absolute',
      top: '50px',
      right: '-27px',
    }}
  ></div>
);

const BODY = (
  <div
    style={{
      width: '10px',
      height: '120px',
      background: 'black',
      position: 'absolute',
      top: '110px',
      right: 0,
    }}
  ></div>
);

const RIGHT_ARM = (
  <div
    style={{
      width: '100px',
      height: '10px',
      background: 'black',
      position: 'absolute',
      top: '150px',
      right: '-100px',
      rotate: '-30deg',
      transformOrigin: 'left bottom',
    }}
  ></div>
);

const LEFT_ARM = (
  <div
    style={{
      width: '100px',
      height: '10px',
      background: 'black',
      position: 'absolute',
      top: '150px',
      right: '10px',
      rotate: '30deg',
      transformOrigin: 'right bottom',
    }}
  ></div>
);

const RIGHT_LEG = (
  <div
    style={{
      width: '100px',
      height: '10px',
      background: 'black',
      position: 'absolute',
      top: '210px',
      right: '-90px',
      rotate: '60deg',
      transformOrigin: 'left bottom',
    }}
  ></div>
);

const LEFT_LEG = (
  <div
    style={{
      width: '100px',
      height: '10px',
      background: 'black',
      position: 'absolute',
      top: '210px',
      right: 0,
      rotate: '-60deg',
      transformOrigin: 'right bottom',
    }}
  ></div>
);

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

type HangmanDrawingProps = {
  numberOfGuesses: number;
};

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  return (
    // main-container
    <div
      style={{
        position: 'relative',
      }}
    >
      {/* body */}
      {BODY_PARTS.slice(0, numberOfGuesses)}
      {/* base structure */}
      <div
        style={{
          height: '50px',
          width: '10px',
          background: 'black',
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      />
      <div
        style={{
          height: '10px',
          width: '200px',
          background: 'black',
          marginLeft: '120px',
        }}
      />
      <div
        style={{
          height: '400px',
          width: '10px',
          background: 'black',
          marginLeft: '120px',
        }}
      />
      <div
        style={{
          height: '10px',
          width: '250px',
          background: 'black',
        }}
      />
    </div>
  );
}
