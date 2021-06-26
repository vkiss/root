export default function editorTile () {
  const tile = document.createElement( "BUTTON" );
  tile.className = "pixel-editor__canvas-tile";

  tile.style.width = sessionStorage.getItem( "pixelEditor_config_tilesize" ) + "px";
  tile.style.height = sessionStorage.getItem( "pixelEditor_config_tilesize" ) + "px";

  return tile;
}
