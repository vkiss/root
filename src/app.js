import "./style.scss";

/**
 * Imports
 */

// Import :: Utils
import { randomIntFromInterval } from "./utils";

// Import :: Packages
import { watchVh } from "vh-watch";

// Import :: Controllers
import { consoleController } from "./controllers/console";
import { createPromoLoop, createPromoBox } from "./controllers/promo-box";
import { randomizeColorPalette, injectTrailingSpaces } from "./controllers/dom-theme";
import { createFooterNotes } from "./controllers/footer-notes";
import { rightClickMenu } from "./controllers/right-click-menu";

// Import :: Data
const themes = require( "./data/themes.json" );

/**
 * Functions
 */

const init = () => {
  const promoLoop = createPromoLoop();
  const randomPalette = themes[randomIntFromInterval( 0, themes.length - 1 )];

  randomizeColorPalette( randomPalette );
  createFooterNotes( randomPalette );
  createPromoBox( promoLoop[randomIntFromInterval( 0, promoLoop.length - 1 )] );
  consoleController( randomPalette );
  injectTrailingSpaces();
  rightClickMenu( randomPalette );
  watchVh();
};

init();
