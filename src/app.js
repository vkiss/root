import "./style.scss";

import footerNotes from "./footerNotes";
import logoOneDrive from "./assets/onedrive.svg";
import logoPicPay from "./assets/picpay.svg";
import logoUmbler from "./assets/umbler.svg";
import logoXP from "./assets/xp.svg";

function init() {
  const promoLoop = createPromoLoop();

  createPromoBox( promoLoop[( Math.floor( Math.random() * promoLoop.length ) )] );
  createFooterNotes( footerNotes );
}

function createPromoLoop() {
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
    },
    {
      hat: "AD",
      title: "One Drive",
      href: "https://onedrive.live.com?invref=5a5cb17e942df5f2&invscr=90",
      target: "_blank",
      img: logoOneDrive,
      text: "Salve seus arquivos e fotos no OneDrive e acesse em qualquer dispositivo, de praticamente qualquer lugar.",
      callout: "Crie sua conta e ganhe 0.5gb de armazenamento extra."
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
}

function createPromoBox( promo ) {
  const promoBoxEl = document.getElementById( "promo-box" );

  promoBoxEl.setAttribute( "href", promo.href );
  promoBoxEl.setAttribute( "target", promo.target );
  promoBoxEl.className = "promo-box";

  promoBoxEl.innerHTML = `
    <header class="promo-box-header">${promo.hat}</header>
    <div class="promo-box-body">
      <div ${( promo.imgSize ? `style="min-width: calc(${promo.imgSize}px + 1rem)"` : "" )} class="promo-box-media">
        <img ${( promo.imgSize ? `style="max-width: ${promo.imgSize}px"` : "" )} src="${promo.img}" />
      </div>
      <div class="promo-box-ad">
        <p>${promo.text}</p>
      </div>
    </div>
  `;
}

function createFooterNotes( data ) {
  data.map( ( item ) => {
    let thisPElement = document.createElement( "P" );
    thisPElement.innerHTML = `.${item}`;

    document.getElementById( "footer-notes" ).appendChild( thisPElement );
  } );
}

init();
