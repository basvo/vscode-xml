import { workspace } from "vscode";

import * as constants from "../constants";
import { ClassicXmlFormatter } from "./formatters/classic-xml-formatter";
import { V2XmlFormatter } from "./formatters/v2-xml-formatter";

import { XmlFormattingOptions } from "./xml-formatting-options";

export interface XmlFormatter {
    formatXml(xml: string, options: XmlFormattingOptions): string;
    minifyXml(xml: string, options: XmlFormattingOptions): string;
}

export class XmlFormatterFactory {
    private static _xmlFormatter: XmlFormatter;

    static getXmlFormatter(): XmlFormatter {
        if (XmlFormatterFactory._xmlFormatter) {
            return XmlFormatterFactory._xmlFormatter;
        }

        const xmlFormatterImplementationSetting = workspace.getConfiguration(constants.extensionPrefix).get<string>("xmlFormatterImplementation");
        let xmlFormatterImplementation: XmlFormatter;

        switch (xmlFormatterImplementationSetting) {
            case "classic": xmlFormatterImplementation = new ClassicXmlFormatter(); break;
            case "v2": default: xmlFormatterImplementation = new V2XmlFormatter(); break;
        }

        return (XmlFormatterFactory._xmlFormatter = xmlFormatterImplementation);
    }
}
