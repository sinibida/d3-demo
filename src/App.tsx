import { select, zoom, ZoomTransform } from "d3";
import React, { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import { CellData, Transform } from "./types";
import Cell from "./Cell";

const tempData: CellData[] = [
  {
    x: 0,
    y: 0,
    content: "Hello!",
  },
  {
    x: 0,
    y: 100,
    content: "World!",
  },
  {
    x: 100,
    y: 100,
    content: "Nice!!!",
  },
  {
    x: 200,
    y: 200,
    content: (
      <div style={{ border: "1px red solid", borderRadius: 4, padding: 8 }}>
        Custom Contenet
      </div>
    ),
  },
];

function App() {
  const zoomCatcherRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<Transform>({
    x: 0,
    y: 0,
    k: 1,
  });

  useEffect(() => {
    const container = select(zoomCatcherRef.current as Element);

    const zoomFn = zoom().on("zoom", (event) => {
      const transform: ZoomTransform = event.transform;
      setTransform({
        ...transform,
      });
    });

    container.call(zoomFn);
  }, []);

  //https://github.com/Digital-Tvilling/react-jsoncanvas/blob/main/src/index.tsx#L37C16-L41C10
  const bgStyle: React.CSSProperties = {
    backgroundSize: `calc(${transform.k} * 20px) calc(${transform.k} * 20px)`,
    backgroundImage: `radial-gradient(#ddd calc(${transform.k}*0.5px + 0.5px), transparent 0)`,
    backgroundPositionX: transform.x - transform.k * 10,
    backgroundPositionY: transform.y - transform.k * 10,
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.zoomCacatcher} ref={zoomCatcherRef}></div>
        {/* Contents */}
        <div className={styles.contentContainer}>
          {tempData.map((x, i) => (
            <Cell key={i} transform={transform} data={x} />
          ))}
        </div>

        <div className={styles.background} style={bgStyle}></div>
      </div>

      <div></div>
    </div>
  );
}

export default App;
