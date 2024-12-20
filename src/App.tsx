import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import { select, zoom, ZoomTransform } from "d3";

type Transform = {
  x: number;
  y: number;
  k: number;
};

function App() {
  const zoomCatcherRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<Transform>({});

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

  const contentStyle: React.CSSProperties = {
    position: "absolute",
    left: transform.x,
    top: transform.y,
    transform: `scale(${transform.k})`,
  };

  return (
    <div>
      <div className={styles.container}>
        <div
          style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, zIndex: 100 }}
          ref={zoomCatcherRef}
        ></div>
        <div style={contentStyle}>Hello World</div>
      </div>

      <div></div>
    </div>
  );
}

export default App;
