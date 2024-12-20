import { CellData, Transform } from "./types";

export type CellProps = {
  data: CellData;
  transform: Transform;
};

export default function Cell({ data, transform: t }: CellProps) {
  const containerStyle: React.CSSProperties = {
    position: "absolute",
    left: (data.x) * t.k + t.x,
    top: (data.y) * t.k + t.y,
    transform: `scale(${t.k})`,
  };
  return <div style={containerStyle}>{data.content}</div>;
}
