import { CellData, Transform } from "./types";
import styles from "./Cell.module.css";

export type CellProps = {
  data: CellData;
  transform: Transform;
};

export default function Cell({ data, transform: t }: CellProps) {
  const calcX = (data.x) * t.k + t.x;
  const calcY = (data.y) * t.k + t.y;
  const containerStyle: React.CSSProperties = {
    position: "absolute",
    // left: (data.x) * t.k + t.x,
    // top: (data.y) * t.k + t.y,
    transform: `translate(${calcX}px, ${calcY}px) scale(${t.k})`,
    // Fix for custom contant with variable(?) dimension.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
    transformOrigin: 'top left',
  };
  return <div className={styles.container} style={containerStyle}>{data.content}</div>;
}
