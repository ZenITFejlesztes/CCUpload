import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { createDom, ComponentContents, addClasses, setDefaultSytles, MyStyles, updateStyles } from "./createDom";

export class FileUploadComponent implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    // regarding outside state
    private context: ComponentFramework.Context<IInputs>;
    private state: ComponentFramework.Dictionary;
    private hostContainer: HTMLDivElement;
    private notifyOutputChanged: () => void;
    // inner contents
    private topContainer: HTMLDivElement;
    private elements: ComponentContents;
    // fileContext
    public noSelectionText: string = "Nothing Selected";
    private file: ComponentFramework.FileObject;
    private fileDisplayName: string;
    private fileContentType: string;
    // stylingParams
    public styles: MyStyles = {
        fontSize: 16,
        fontColor: "black",
        backGroundColor: "white",
        primaryColor: "lightgray",
        secondaryColor: "gray"
    };

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ) {
        this.context = context;
        this.state = state;
        this.hostContainer = container;
        this.notifyOutputChanged = notifyOutputChanged;
        this.topContainer = document.createElement("div");
        this.elements = createDom(this.topContainer);
        // adding classes
        addClasses(this.hostContainer, this.topContainer, this.elements);
        // setting default styles
        setDefaultSytles(
            this.hostContainer,
            this.topContainer,
            this.elements,
            this.noSelectionText,
            this.styles
        );
        // adding onClick
        this.elements.filePicker.onclick = this.onBtnClick;
        // appending top div to host div
        this.hostContainer.appendChild(this.topContainer);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // update Style values 
        this.styles.fontSize = Math.floor( Math.max( this.hostContainer.clientHeight, this.hostContainer.clientWidth ) / 14 );
        this.styles.fontColor = context.parameters.xFontColor.raw || this.styles.fontColor;
        this.styles.backGroundColor = context.parameters.xBackgroundColor.raw || this.styles.backGroundColor;
        this.styles.primaryColor = context.parameters.xPrimaryColor.raw || this.styles.primaryColor;
        this.styles.secondaryColor = context.parameters.xSecondaryColor.raw || this.styles.secondaryColor;
        // render new style values
        updateStyles(this.topContainer, this.elements, this.styles);
        // update NoSelectionText
        this.noSelectionText = context.parameters.xNoSelectionText.raw || this.noSelectionText;
        if (!this.fileDisplayName) this.elements.fileNameTag.innerText = this.noSelectionText;
        this.context = context;
    }

    public getOutputs(): IOutputs {
        return {
            xFileContent: this.file.fileContent,
            xFileName: this.fileDisplayName,
            xFileContentType: this.fileContentType
        };
    }

    public destroy(): void {}

    // filePicking
    private onBtnClick = async (): Promise<void> => {
        const files: ComponentFramework.FileObject[] = await this.context.device.pickFile();
        if (!files || !files[0] || !files[0].fileName) { console.log("ERROR PICKING A FILE"); return }
        this.file = files[0]
        // setting name and content type
        this.fileContentType = files[0].mimeType
        this.fileDisplayName = files[0].fileName
        this.elements.fileNameTag.innerText = this.fileDisplayName;
        this.notifyOutputChanged()
    }
}
