import {
  View,
  GeometryRepresentation,
  PolyData,
  CellData,
  DataArray,
} from "react-vtk-js";
import * as React from "react";

import data from "./data.json";

function App() {
  const [show, setShow] = React.useState(false);

  return (
    <div>
      <button onClick={() => setShow((prev) => !prev)}>
        {show ? "Hide" : "Show"}
      </button>
      <Timer />

      {show ? (
        <div style={{ width: "100%", height: "100vh" }}>
          <VTK />
        </div>
      ) : null}
    </div>
  );
}

const Timer = React.memo(() => {
  const [time, setTime] = React.useState(1);

  React.useEffect(() => {
    const interval = setInterval(() => setTime((prev) => prev + 1), 1);
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
});

const VTK = React.memo(() => {
  return (
    <View>
      <GeometryRepresentation>
        <PolyData points={data.points.flat()} polys={data.polys.flat()}>
          {Object.keys(data.cellData).map((name) => {
            return (
              <CellData key={name}>
                <DataArray name={name} values={data.cellData[name]} />
              </CellData>
            );
          })}
        </PolyData>
      </GeometryRepresentation>
    </View>
  );
});

export default App;
