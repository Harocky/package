export default function Page() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      {" "}
      <h2>CSS Units Comparison</h2>
      <div
        style={{
          border: "2px solid black",
          padding: "20px",
          fontSize: "20px",
        }}
      >
        <h3>Parent font-size: 20px</h3>

        <div
          style={{
            width: "200px",
            padding: "20px",
            background: "red",
            color: "white",
            marginBottom: "10px",
          }}
        >
          PX BOX (fixed 200px)
        </div>

        <div
          style={{
            width: "10rem",
            padding: "2rem",
            background: "blue",
            color: "white",
            marginBottom: "10px",
          }}
        >
          REM BOX (10rem width)
        </div>

        <div
          style={{
            width: "10em",
            padding: "1em",
            background: "green",
            color: "white",
            marginBottom: "10px",
          }}
        >
          EM BOX (10em width)
        </div>

        <div
          style={{
            width: "20ch",
            padding: "1rem",
            background: "purple",
            color: "white",
          }}
        >
          CH BOX TEXT TEXT TEXT TEXT TEXT TEXT
        </div>
      </div>
      <br />
      <div
        style={{
          border: "2px dashed black",
          padding: "20px",
          fontSize: "30px",
        }}
      >
        <h3>Nested Parent font-size: 30px</h3>

        <div
          style={{
            width: "10em",
            padding: "1em",
            background: "green",
            color: "white",
            marginBottom: "10px",
          }}
        >
          EM BOX (bigger due to parent)
        </div>
      </div>
      <div className="text-6xl">hi</div>
    </div>
  );
}
