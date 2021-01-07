import "./style.scss";

/**
 * Imports
 */

import footerNotes from "./footerNotes";
import themes from "./themes";
import logoPicPay from "./assets/picpay.svg";
import logoUmbler from "./assets/umbler.svg";
import logoXP from "./assets/xp.svg";

/**
 * Utils
 */

const addStyle = ( styleString ) => {
  const styleTagOnDOM = document.querySelector( "style" );

  const minifiedCustomCSS = styleString.replace( /\r?\n|\r|\t| /g, "" ).replace( /_/g, " " );

  styleTagOnDOM.innerHTML = `${styleTagOnDOM.innerText}${minifiedCustomCSS}`;
};

const randomIntFromInterval = ( min, max ) => {
  return Math.floor( Math.random() * ( max - min + 1 ) + min );
};

/**
 * Functions
 */

const createPromoLoop = () => {
  const promos = [
    {
      hat: "AD",
      title: "Picpay",
      href: "http://www.picpay.com/convite?@1UXF",
      target: "_blank",
      img: logoPicPay,
      text: "Use o PicPay para pagar amigos, boletos, recarregar o celular e muito mais. Ao criar sua conta, insira o código 1UXF e ",
      callout: "ganhe R$10 de volta.",
    },
    {
      hat: "AD",
      title: "Umbler",
      matter: 3,
      href: "https://www.umbler.com/br/seja-bem-vindo?a=7kly6v4e",
      target: "_blank",
      img: logoUmbler,
      imgSize: 50,
      text: "A Umbler é uma empresa de Cloud Hosting que tem a missão de facilitar a vida para agências e devs.",
      callout: "Crie sua conta e ganhe 7 dias grátis."
    },
    {
      hat: "AD",
      title: "XP Investimentos",
      href: "https://cadastro.xpi.com.br/desktop/step/1?utm_source=social-media&utm_medium=colaboradores&utm_campaign=aquisicao_xp_gxp_202000_lwer_abrirconta_trafego_abrir-conta_nac&utm_content=aberta_no_nac_texto_na_na&utm_term=u000967_na_colaborador_home_na",
      target: "_blank",
      img: logoXP,
      text: "As melhores opções de investimentos do mercado. Abertura de conta sem custo. Na XP nenhum cliente é igual ao outro.",
      callout: "Abra sua conta"
    }
  ];

  let returnLoop = [];

  for ( let i = 0; i < promos.length; i++ ) {
    const numberToRepeat = ( promos[i].matter !== undefined ? promos[i].matter : 1 );

    for ( let o = 0; o < numberToRepeat; o++ ) {
      returnLoop.push( promos[i] );
    }
  }

  return returnLoop;
};

const createPromoBox = ( promo ) => {
  const promoBoxEl = document.getElementById( "promo-box" );

  promoBoxEl.setAttribute( "href", promo.href );
  promoBoxEl.setAttribute( "target", promo.target );
  promoBoxEl.className = "promo-box";

  promoBoxEl.innerHTML = `
    <header class="promo-box-header">${promo.hat}</header>
    <div class="promo-box-body">
      <figure ${( promo.imgSize ? `style="min-width: calc(${promo.imgSize}px + 1rem)"` : "" )} class="promo-box-media" data-max="${promo.imgSize}">
        ${promo.img}
      </figure>
      <div class="promo-box-ad">
        <p>${promo.text} <strong>${promo.callout}</strong></p>
      </div>
    </div>
  `;

  addStyle( `
    .promo-box-media_svg {
      max-width: ${promo.imgSize ? promo.imgSize : "32"}px;
      max-height: 50px;
    }
  ` );
};

const createFooterNotes = ( data, selectedColorPallete ) => {
  for ( let i = 0; i < data.length; i++ ) {
    if ( data.length - 1 === i && selectedColorPallete.name ) {
      const palleteItemP = document.createElement( "P" );
      palleteItemP.innerHTML = `.html syntax style based on ${( selectedColorPallete.link ? `<a target=\"_blank\" href="${selectedColorPallete.link}">` : "" )}${selectedColorPallete.name}${( selectedColorPallete.link ? "</a>" : "" )}'s color palette`;

      document.getElementById( "footer-notes" ).appendChild( palleteItemP );
    }

    const thisPElement = document.createElement( "P" );
    thisPElement.innerHTML = `.${data[i]}`;

    document.getElementById( "footer-notes" ).appendChild( thisPElement );
  }
};

const mobileHeightPortManager = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty( "--vh", `${vh}px` );
};

const consoleController = () => {
  console.log( "Olá, temos vagas para devs frontend. Mande um e-mail para %cvinicius.kiss@xpi.com.br%c.", "color: #61AFEF", "color: white" );
  console.log( "Para freelas, me contate via %ccontato@vkiss.com.br%c :)", "color: #EF596F", "color: white" );
};

const randomizeColorPalette = ( colorPalettes ) => {
  const randomPalette = colorPalettes[randomIntFromInterval( 0, colorPalettes.length - 1 )];
  const filterResult = ( number ) => { return ( number === 3 ? 4 : number ); };
  const differLinkColor = randomPalette.colors[filterResult( randomIntFromInterval( 1, 3 ) )];

  addStyle( `
  html,
  aside:after {
    background-color: ${randomPalette.colors[6]}
  }

  .html-code {
    color: ${randomPalette.colors[7]};
  }

  .hover-before,
  .hover-after {
    color: ${randomPalette.colors[0]};
  }

  .html-element {
    color: ${randomPalette.colors[1]};
  }

  .html-attribute {
    font-style: italic;
    color: ${randomPalette.colors[2]};
  }

  .html-equal-sign {
    color: ${randomPalette.colors[3]};
  }

  .html-key {
    color: ${randomPalette.colors[4]};
  }

  .html-comment {
    font-style: italic;
    color: ${randomPalette.colors[5]};
  }

  .promo-box-ad {
    color: ${randomPalette.colors[7]};
  }

  .promo-box-media_svg_rect,
  .promo-box-media_svg_path {
    fill: ${randomPalette.colors[7]};
  }

  @media_screen_and_(max-width:_899px) {
    a {
      color: ${randomPalette.colors[7]};
    }

    a.mobile-cta {
      color: ${differLinkColor};
    }
  }

  @media_screen_and_(min-width:_900px) {
    aside {
      color: ${randomPalette.colors[5]};
    }

    a {
      color: ${differLinkColor};
    }

    a:not(.promo-box):hover {
      border-bottom-color: ${differLinkColor};
      background-color: ${differLinkColor};
      color: ${randomPalette.colors[6]};
    }

    a.html-code:hover { 
      color: ${randomPalette.colors[6]};
      border-bottom-color: ${randomPalette.colors[7]};
      background-color: ${randomPalette.colors[7]};
    }

    aside_a:not(.promo-box) {
      color: ${randomPalette.colors[5]}
    }

    aside_a:not(.promo-box):hover {
      color: ${randomPalette.colors[6]};
      border-bottom-color: ${randomPalette.colors[5]};
      background-color: ${randomPalette.colors[5]};
    }
  }
  ` );

  createFooterNotes( footerNotes, randomPalette );
};

const injectTrailingSpaces = ( element ) => {
  const isHTMLCodeElement = element.querySelector( ".hover-before" ) !== null;
  const hoverBefore = element.querySelector( ".hover-before" );
  const hoverAfter = element.querySelector( ".hover-after" );

  let innerTextElement;

  if ( isHTMLCodeElement && element.innerText.split( "\n" )[1] === "•" ) {
    innerTextElement = element.innerText.split( "\n" )[3];
  } else if ( element.nodeName === "H1" ) {
    innerTextElement = element.innerText;
  } else if ( isHTMLCodeElement && element.innerText.split( "\n" ).length > 1 ) {
    innerTextElement = element.innerText.split( "\n" )[1];
  } else {
    innerTextElement = element.innerText;
  }

  element.setAttribute( "debuginfo", element.innerText.split( "\n" ).length );

  const innerText = innerTextElement.replace( / /g, "<span class=\"html-space\"> <span>•</span></span>" );
  element.innerHTML = innerText.replace( "<!--", "&lt;!--" );


  if ( isHTMLCodeElement ) {
    element.prepend( hoverBefore );
    element.appendChild( hoverAfter );
  }

};

const reconstructHTMLElementsWithTrailingSpaces = () => {
  const fakeHTMLElements = document.querySelectorAll( ".html-code" );

  for ( let i = 0; i < fakeHTMLElements.length; i++ ) {
    injectTrailingSpaces( fakeHTMLElements[i] );
  }
};

const fillsvg = () => {

};

const init = () => {
  const promoLoop = createPromoLoop();

  randomizeColorPalette( themes );
  createPromoBox( promoLoop[randomIntFromInterval( 0, promoLoop.length - 1 )] );
  consoleController();
  mobileHeightPortManager();
  reconstructHTMLElementsWithTrailingSpaces();
  injectTrailingSpaces( document.querySelector( ".html-comment" ) );
  fillsvg();
};

init();
window.addEventListener( "resize", mobileHeightPortManager );
