import { ExecutionEnvironment } from "@/types/executor";
import * as cheerio from "cheerio";
import { ExtractTextFromElementTask } from "../task/ExtractTextFromElement";
export async function ExtractTextFromHtml(
  environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>,
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("Selector not found");
      return false;
    }
    const html = environment.getInput("Html");
    if (!html) {
      environment.log.error("Html not found");
      return false;
    }
    const $ = cheerio.load(html);
    const element = $(selector);

    if (!element) {
      environment.log.error("Element not found");
      return false;
    }

    const extractedText = $.text(element);
    if (!extractedText) {
      environment.log.error("Element has no text");
      return false;
    }

    environment.setOutput("Extracted Text", extractedText);

    return true;
  } catch (error: any) {
    environment.log.error(`Error extracting text: ${error.message}`);
    return false;
  }
}
