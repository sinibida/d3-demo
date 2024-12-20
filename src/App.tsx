import { select, zoom, ZoomTransform } from "d3";
import { useEffect, useRef, useState } from "react";
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
  ...Array.from({ length: 10 * 10 }, (_, i) => {
    const y = Math.floor(i / 10);
    const x = i % 10;
    return {
      x: x * 100 - 450,
      y: y * 100 - 450,
      content: "O",
    };
  }),
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

  return (
    <div>
      <div className={styles.container}>
        <div
          className={styles.zoomCacatcher}
          ref={zoomCatcherRef}
        ></div>
        {/* Contents */}
        <div className={styles.contentContainer}>
          {tempData.map((x, i) => (
            <Cell key={i} transform={transform} data={x} />
          ))}
        </div>
      </div>

      <div></div>
    </div>
  );
}

export default App;
