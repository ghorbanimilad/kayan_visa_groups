import ClassicEditorBase from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import FontColor from "@ckeditor/ckeditor5-font/src/fontcolor";
import FontBackgroundColor from "@ckeditor/ckeditor5-font/src/fontbackgroundcolor";

export default class CustomEditor extends ClassicEditorBase {}
CustomEditor.builtinPlugins = [
  Essentials,
  Bold,
  FontColor,
  FontBackgroundColor,
];
