export default function getCanvasSize ( coordinate ) {
  return parseInt( sessionStorage.getItem( "pixelEditor_config_tilesize" ) ) * parseInt( sessionStorage.getItem( `pixelEditor_config_${coordinate}` ) );
}
