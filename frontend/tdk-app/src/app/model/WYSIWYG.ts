import { AngularEditorConfig } from '@kolkov/angular-editor';
export const WYSIWYGConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Ide írd a tartalmat...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
        ['bold']
    ],
    customClasses: [
        {
            name: "quote",
            class: "quote",
        },
        {
            name: 'redText',
            class: 'redText'
        },
        {
            name: "titleText",
            class: "titleText",
            tag: "h1",
        },
    ]
};