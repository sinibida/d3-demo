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

// 0. App
function App() {
  // 1. 변수 선언
  const [transform, setTransform] = useState<Transform>({
    x: 0,
    y: 0,
    k: 1,
  });
  const zoomCatcherRef = useRef<HTMLDivElement>(null);

  // 2. Mount 시
  useEffect(() => {
    // 2.1. Select: DOM 선택 후...
    const container = select(zoomCatcherRef.current as Element);

    // 2.2. Zoom listener를 적용하는 함수 구함
    const zoomFn = zoom().on("zoom", (event) => {
      const transform: ZoomTransform = event.transform;
      setTransform({
        ...transform,
      });
    });

    // 2.3. 그리고 call로 적용
    // call: zoomFn(selection, ...args)와 같은 형식의 함수를 selection에 '적용'
    container.call(zoomFn);
  }, []);

  // 3. 배경 이미지 설정
  //https://github.com/Digital-Tvilling/react-jsoncanvas/blob/main/src/index.tsx#L37C16-L41C10
  const bgStyle: React.CSSProperties = {
    backgroundSize: `calc(${transform.k} * 20px) calc(${transform.k} * 20px)`,
    backgroundImage: `radial-gradient(#ddd calc(${transform.k}*0.5px + 0.5px), transparent 0)`,
    backgroundPositionX: transform.x - transform.k * 10,
    backgroundPositionY: transform.y - transform.k * 10,
  };

  // 4. 제작
  // css 파일의 z-index, inset&position을 눈여겨 볼 것!
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
