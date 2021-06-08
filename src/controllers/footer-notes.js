import { convertBlankSpaceToTrailingSpacesElement } from "../utils";

const regularNotes = [
  "tipografia:#<a target=\"_blank\" href=\"https://sourcefoundry.org/hack/\">hack</a>"
];

const createFooterNoteItem = ( content ) => {
  const element = document.createElement( "P" );
  element.innerHTML = `.${convertBlankSpaceToTrailingSpacesElement( content, "\#" )}`;

  return element;
};

const includeFooterNote = ( itemToInclude ) => {
  document.getElementById( "footer-notes" ).appendChild( itemToInclude );
};

export function createFooterNotes ( selectedColorPallete ) {
  for ( const note of regularNotes ) {
    includeFooterNote( createFooterNoteItem( note ) );
  }

  // html syntax
  if ( selectedColorPallete.name ) {
    const palleteItemP = document.createElement( "P" );
    palleteItemP.innerHTML = `${convertBlankSpaceToTrailingSpacesElement( ".cor da sintaxe de html baseada no tema " )}${( selectedColorPallete.link ? `<a target=\"_blank\" href="${selectedColorPallete.link}">` : "" )}${convertBlankSpaceToTrailingSpacesElement( selectedColorPallete.name )}${( selectedColorPallete.link ? "</a>" : "" )}`;

    includeFooterNote( palleteItemP );
  }

  // icons
  includeFooterNote(
    createFooterNoteItem( "ícones:#<a href=\"https://www.flaticon.com/br/autores/freepik\" target=\"_blank\">freepik</a>,#<a href=\"http://vaadin.com/font-icons\" target=\"_blank\">vaadin</a>#e#<a href=\"https://commons.wikimedia.org/wiki/File:Npm-logo.svg\" target=\"_blank\">wikipedia</a>" )
  );

  // hosted by
  includeFooterNote(
    createFooterNoteItem( `hospedado#pela#<a target=\"_blank\" href=\"${UMBLERREF}\">umbler</a>` )
  );

  // file weight
  includeFooterNote(
    createFooterNoteItem( `peso:#${FILEWEIGHT}kb` )
  );

  // version and source code
  const filterVersion = ( version ) => {
    const major = version.split( "." )[0];
    const minor = version.split( "." )[1];
    const patch = version.split( "." )[2];

    return `${major}.${minor}${ patch === "0" ? "" : `.${patch}` }`;
  };

  includeFooterNote(
    createFooterNoteItem( `v${filterVersion( VERSION )}#|#<a target="_blank" href="https://github.com/vkiss/root">código#fonte</a>` )
  );
}
