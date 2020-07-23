import { IOutputs } from "./generated/ManifestTypes";
import { FileUploadComponent } from ".";


export interface ComponentContents {
    fileNameTag: HTMLParagraphElement;
    filePicker: HTMLButtonElement;
}

export interface MyStyles {
    fontSize: number;
    fontColor: string;
    backGroundColor: string;
    primaryColor: string;
    secondaryColor: string;
}

export function createDom(container: HTMLDivElement): ComponentContents {
    let fileNameTag = document.createElement("p");
    let filePicker = document.createElement("button");
    container.appendChild(fileNameTag);
    container.appendChild(filePicker);
    return {
        fileNameTag,
        filePicker
    }
}

export function addClasses(container: HTMLDivElement, topContainer: HTMLDivElement, elements: ComponentContents): void {
    container.classList.add("FileUploadComponent");
    container.classList.add("hostContainer");
    topContainer.classList.add("FileUploadComponent");
    topContainer.classList.add("topContainer");
    elements.fileNameTag.classList.add("fileNameTag");
    elements.filePicker.classList.add("filePicker");
}

export function setDefaultSytles(container: HTMLDivElement, topContainer: HTMLDivElement, elements: ComponentContents, noSelectionText:string, myStyles: MyStyles): void {
    // topDIV
    topContainer.style.backgroundColor = myStyles.backGroundColor;
    topContainer.style.fontSize = `${myStyles.fontSize}px`;
    // textP
    elements.fileNameTag.innerText = noSelectionText;
    elements.fileNameTag.style.color = myStyles.fontColor;
    elements.fileNameTag.style.backgroundColor = "transparent";
    // Button
    elements.filePicker.innerText = "SELECT";
    elements.filePicker.style.backgroundColor = myStyles.primaryColor;
    elements.filePicker.style.color = myStyles.fontColor;
    elements.filePicker.style.borderColor = myStyles.secondaryColor;
}

export function updateStyles(topContainer: HTMLDivElement, elements: ComponentContents, myStyles: MyStyles): void {
    // topDIV
    topContainer.style.backgroundColor = myStyles.backGroundColor;
    topContainer.style.fontSize = `${myStyles.fontSize}px`;
    // textP
    elements.fileNameTag.style.color = myStyles.fontColor;
    elements.fileNameTag.style.backgroundColor = "transparent";
    // Button
    elements.filePicker.style.backgroundColor = myStyles.primaryColor;
    elements.filePicker.style.color = myStyles.secondaryColor;
    elements.filePicker.style.borderColor = myStyles.secondaryColor;

}