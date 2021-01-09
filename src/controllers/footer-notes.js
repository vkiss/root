import { convertBlankSpaceToTrailingSpacesElement } from "../utils";

const regularNotes = [
  "2011+,#released#under#the#<a target=\"_blank\" href=\"https://mit-license.org/\">mit#license</a>.",
  "font:#<a target=\"_blank\" href=\"https://sourcefoundry.org/hack/\">hack</a>"
];

export function createFooterNotes ( selectedColorPallete ) {
  for ( let i = 0; i < regularNotes.length; i++ ) {
    const thisPElement = document.createElement( "P" );
    thisPElement.innerHTML = `.${convertBlankSpaceToTrailingSpacesElement( regularNotes[i], "\#" )}`;

    document.getElementById( "footer-notes" ).appendChild( thisPElement );
  }

  // html syntax
  if ( selectedColorPallete.name ) {
    const palleteItemP = document.createElement( "P" );
    palleteItemP.innerHTML = `${convertBlankSpaceToTrailingSpacesElement( ".html syntax style based on " )}${( selectedColorPallete.link ? `<a target=\"_blank\" href="${selectedColorPallete.link}">` : "" )}${convertBlankSpaceToTrailingSpacesElement( selectedColorPallete.name )}${( selectedColorPallete.link ? "</a>" : "" )}${convertBlankSpaceToTrailingSpacesElement( "'s color palette" )}`;

    document.getElementById( "footer-notes" ).appendChild( palleteItemP );
  }

  // icons
  const iconsCredit = document.createElement( "P" );
  iconsCredit.innerHTML = convertBlankSpaceToTrailingSpacesElement( ".icons:#<a href=\"https://www.flaticon.com/br/autores/freepik\" target=\"_blank\">freepik</a>,#<a href=\"http://vaadin.com/font-icons\" target=\"_blank\">vaadin</a>#and#<a href=\"https://commons.wikimedia.org/wiki/File:Npm-logo.svg\" target=\"_blank\">wikipedia</a>", "\#" );
  document.getElementById( "footer-notes" ).appendChild( iconsCredit );

  // hosted by
  const hostedByLine = document.createElement( "P" );
  hostedByLine.innerHTML = convertBlankSpaceToTrailingSpacesElement( `.hosted#by#<a target=\"_blank\" href=\"${UMBLERREF}\">umbler</a>`, "\#" );
  document.getElementById( "footer-notes" ).appendChild( hostedByLine );

  // version and source code
  const sourceCodeLine = document.createElement( "P" );
  sourceCodeLine.innerHTML = convertBlankSpaceToTrailingSpacesElement( `.v${VERSION}#|#<a target="_blank" href="https://github.com/vkiss/root">source#code</a>`, "\#" );
  document.getElementById( "footer-notes" ).appendChild( sourceCodeLine );
}
