import { addStyle, convertBlankSpaceToTrailingSpacesElement } from "../utils";

import logoPicPay from "../assets/logos/picpay.svg";
import logoUmbler from "../assets/logos/umbler.svg";

export function createPromoLoop () {
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
      href: UMBLERREF,
      target: "_blank",
      img: logoUmbler,
      imgSize: 50,
      text: "A Umbler é uma empresa de Cloud Hosting que tem a missão de facilitar a vida para agências e devs.",
      callout: "Crie sua conta e ganhe 7 dias grátis."
    }
  ];

  let returnLoop = [];

  for ( const promo of promos ) {
    const numberToRepeat = promo.matter || 1;

    for ( let o = 0; o < numberToRepeat; o++ ) {
      returnLoop.push( promo );
    }
  }

  return returnLoop;
}

export function createPromoBox ( promo ) {
  const promoBoxEl = document.getElementById( "promo-box" );

  promoBoxEl.setAttribute( "href", promo.href );
  promoBoxEl.setAttribute( "target", promo.target );
  promoBoxEl.className = "promo-box";

  promoBoxEl.innerHTML = `
    <header class="promo-box-header">${promo.hat}</header>
    <div class="promo-box-body">
      <figure ${( promo.imgSize ? "style=\"min-width: calc(" + promo.imgSize + "px + 1rem)\"" : "" )} class="promo-box-media" data-max="${promo.imgSize}">
        ${promo.img}
      </figure>
      <div class="promo-box-ad">
        <p>${convertBlankSpaceToTrailingSpacesElement( promo.text )}<span class=\"html-space\"> <span>•</span></span><strong>${convertBlankSpaceToTrailingSpacesElement( promo.callout )}</strong></p>
      </div>
    </div>
  `;

  addStyle( `
    .promo-box-media$svg {
      max-width: ${promo.imgSize || "32"}px;
      max-height: 50px;
    }
  ` );
}

