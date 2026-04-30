import "./styles/DrawingToolbar.css";
import pencilIcon from "../assets/icons/pencil.png";
import paintBrushIcon from "../assets/icons/paint-brush.png";

const COLORS = [
  "#000000", "#ffffff", "#ef4444", "#f97316",
  "#eab308", "#22c55e", "#3b82f6", "#8b5cf6",
  "#ec4899", "#14b8a6", "#a16207", "#6b7280",
];

const DrawingToolbar = ({ isMyTurn, tool, setTool, color, setColor, lineWidth, setLineWidth, clearCanvas }) => {
  return (
    <div className="dc-toolbar" style={{ opacity: isMyTurn ? 1 : 0.4, pointerEvents: isMyTurn ? 'auto' : 'none' }}>
      <div className="dc-tools">
        <button 
          className={`dc-tool-btn ${tool === 'draw' ? 'active' : ''}`} 
          onClick={() => setTool('draw')}
          title="Draw"
        >
          <img src={pencilIcon} alt="Draw" width="28" height="28" />
        </button>
        <button 
          className={`dc-tool-btn ${tool === 'fill' ? 'active' : ''}`} 
          onClick={() => setTool('fill')}
          title="Fill"
        >
          <img src={paintBrushIcon} alt="Fill" width="28" height="28" />
        </button>
      </div>
      <div className="dc-sep" />
      {COLORS.map((c) => (
        <div key={c} 
          className={`dc-swatch ${color === c ? "active" : ""} ${c === "#ffffff" ? "is-white" : ""}`}
          style={{ background: c }}
          onClick={() => setColor(c)} />
      ))}
      <div className="dc-sep" />
      <span className="dc-size-label">Size: {lineWidth}px</span>
      <input type="range" min="2" max="30" value={lineWidth}
        onChange={(e) => setLineWidth(Number(e.target.value))} className="dc-slider" />
      <button className="dc-clear" onClick={clearCanvas} disabled={!isMyTurn}>Clear</button>
    </div>
  );
};

export default DrawingToolbar;
