import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from 'file-saver';
// const fs = require("fs").promises;
// import { Buffer } from 'node:buffer';

function SoundBiteDocx(title, contents) {

    console.log("title: ", title)
    console.log("contents: ", contents)
    // Documents contain sections, you can have multiple sections per document, go here to learn more about sections
    // This simple example will only contain one section
    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: title.toString(),
                                bold: true,
                            }),
                            new TextRun({
                                text:contents.toString(),
                                break:2
                            }),
                        ],
                    }),
                ],
            },
        ],
    });

    Packer.toBlob(doc).then((blob) => {
        // saveAs from FileSaver will download the file
        // console.log(blob)
        saveAs(blob, title + ".docx");
    });

    // Used to export the file into a .docx file
    // Packer.toBuffer(doc).then((buffer) => {
    //     fs.writeFile("My Document.docx", buffer);
    // });

    // Done! A file called 'My Document.docx' will be in your file system.
}

export default SoundBiteDocx;