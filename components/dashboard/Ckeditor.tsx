"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { PiAddressBook } from "react-icons/pi";


interface Props {
  value: string;
  onChange: (data: string) => void;
}

export default function Editor({ value, onChange }: Props) {
  return (
    <div dir="rtl" className="ckeditor-container text-right">
      <CKEditor
        editor={ClassicEditor}
        style={{ padding: "1rem", borderRadius: "0.5rem", backgroundColor: "#f9f9f9" }}
        data={value}
        config={{
          language: {
            ui: "fa", // فارسی برای منوها و دکمه‌ها
            content: "fa", // فارسی برای محتوا
          },
          toolbar: {
            items: [
              "heading",
              "|",
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "subscript",
              "fontColor",
              "fontBackgroundColor",
              "superscript",
              "|",
              "fontSize",
              "fontColor",
              "fontBackgroundColor",
              "highlight",
              "|",
              "link",
              "blockQuote",
              "insertTable",
              "imageUpload",
              "mediaEmbed",
              "horizontalLine",
              "specialCharacters",
              "|",
              "alignment:left",
              "alignment:center",
              "alignment:right",
              "alignment:justify",
              "|",
              "bulletedList",
              "numberedList",
              "outdent",
              "indent",
              "|",
              "undo",
              "redo",
              "removeFormat",
            ],
          },
          fontBackgroundColor: {
            colors: [
              { color: "#ffffff", label: "سفید" },
              { color: "#ffcccc", label: "قرمز روشن" },
              { color: "#ccffcc", label: "سبز روشن" },
              { color: "#ccccff", label: "آبی روشن" },
              { color: "#ffffcc", label: "زرد روشن" },
            ],
          },
          alignment: {
            options: ["left", "center", "right", "justify"],
          },
          image: {
            toolbar: [
              "imageTextAlternative",
              "imageStyle:full",
              "imageStyle:side",
              "linkImage",
            ],
          },
          table: {
            contentToolbar: [
              "tableColumn",
              "tableRow",
              "mergeTableCells",
              "tableProperties",
              "tableCellProperties",
            ],
          },
          link: {
            decorators: {
              addTargetToExternalLinks: {
                mode: "automatic",
                callback: (url: string) => /^(https?:)?\/\//.test(url),
                attributes: {
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
              },
            },
          },
          placeholder: "محتوای خود را اینجا بنویسید...",
        }}
        onReady={(editor) => {
          // راست‌چین کردن محیط ویرایش
          editor.editing.view.change((writer) => {
            writer.setAttribute("dir", "rtl", editor.editing.view.document.getRoot());
          });

          // ارتفاع پیش‌فرض ادیتور
          const editableElement = editor.ui.getEditableElement();
          if (editableElement) {
            editableElement.style.minHeight = "250px";
            editableElement.style.lineHeight = "2";
            editableElement.style.fontFamily = "IranSans, sans-serif";
            editableElement.style.fontSize = "16px";
          }
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}
