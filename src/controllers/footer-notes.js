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
    palleteItemP.innerHTML = `${convertBlankSpaceToTrailingSpacesElement( ".tema da sintax baseado em " )}${( selectedColorPallete.link ? `<a target=\"_blank\" href="${selectedColorPallete.link}">` : "" )}${convertBlankSpaceToTrailingSpacesElement( selectedColorPallete.name )}${( selectedColorPallete.link ? "</a>" : "" )}`;

    includeFooterNote( palleteItemP );
  }

  // icons
  const iconsCreditsText = ( creditsArray ) => {
    const sortedArray = creditsArray.sort( ( a, b ) => {
      if( a.credit < b.credit ) { return -1; }
      if( a.credit > b.credit ) { return 1; }
      return 0;
    } );

    return `ícones:${sortedArray.map( ( icon )=> {
      return "#<a href=\"" + icon.link + "\" target=\"_blank\">" + icon.credit + "</a>";
    } )}`;
  };

  includeFooterNote(
    createFooterNoteItem( iconsCreditsText( [
      {
        "credit": "freepik",
        "link": "https://www.flaticon.com/br/autores/freepik"
      },
      {
        "credit": "vaadin",
        "link": "http://vaadin.com/font-icons"
      },
      {
        "credit": "wikipedia",
        "link": "https://commons.wikimedia.org/wiki/File:Npm-logo.svg"
      },
      {
        "credit": "icon8",
        "link": "https://icons8.com/"
      }
    ] ) )
  );

  // hosted by
  includeFooterNote(
    createFooterNoteItem( `hospedado#pela#<a target=\"_blank\" href=\"${UMBLERREF}\">umbler</a>` )
  );

  // file weight (removed)
  // includeFooterNote(
  //   createFooterNoteItem( `peso:#${FILEWEIGHT}kb` )
  // );

  // version and source code
  const filterVersion = ( version ) => {
    const major = version.split( "." )[0];
    const minor = version.split( "." )[1];
    const patch = version.split( "." )[2];

    return `${major}.${minor}${ patch === "0" ? "" : "." + patch }`;
  };

  includeFooterNote(
    createFooterNoteItem( `v${filterVersion( VERSION )}#|#<a target="_blank" href="https://github.com/vkiss/root">código#fonte</a>` )
  );
}
