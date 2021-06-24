import "./style.scss";

// utils
import { randomIntFromInterval } from "./utils";

// packages
import { watchVh } from "vh-watch";

// controllers
import { consoleController } from "./controllers/console";
import { createPromoLoop, createPromoBox } from "./controllers/promo-box";
import { randomizeColorPalette, injectTrailingSpaces } from "./controllers/dom-theme";
import { createFooterNotes } from "./controllers/footer-notes";
import { mouseTooltipController } from "./controllers/mouse-tooltip";
import contextMenu from "./controllers/context-menu";

// data
const themes = require( "./data/themes.json" );

/**
 * Functions
 */

const init = () => {
  const promoLoop = createPromoLoop();
  const randomPromo = promoLoop[randomIntFromInterval( 0, promoLoop.length - 1 )];
  const randomPalette = themes[randomIntFromInterval( 0, themes.length - 1 )];

  randomizeColorPalette( randomPalette );
  createFooterNotes( randomPalette );
  createPromoBox( randomPromo );
  consoleController( randomPalette );
  injectTrailingSpaces();
  contextMenu( randomPalette, randomPromo );
  mouseTooltipController();
  watchVh();
};

init();
