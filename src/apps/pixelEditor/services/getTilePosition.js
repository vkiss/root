export default function getTilePosition ( tile ) {
  const canvasBCR = document.querySelector( ".pixel-editor__canvas" ).getBoundingClientRect();
  const tileBCR = tile.getBoundingClientRect();

  const positionX = ( ( tileBCR.x - canvasBCR.x ) + tileBCR.width ) / tileBCR.width;
  const positionY = ( ( tileBCR.y - canvasBCR.y ) + tileBCR.height ) / tileBCR.height;

  return {
    x: positionX,
    y: positionY
  };
}
