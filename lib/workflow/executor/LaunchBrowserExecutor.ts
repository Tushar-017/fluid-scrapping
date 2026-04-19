import { waitFor } from "@/lib/helper/waitFor";
import { ExecutionEnvironment } from "@/types/executor";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>,
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website Url");
    if (!websiteUrl) {
      environment.log.error("Website Url not found");
      return false;
    }
    const browser = await puppeteer.launch({ headless: true });
    environment.log.info("Launched browser successfully");
    environment.setBrowser(browser);
    const page = await browser.newPage();
    await page.goto(websiteUrl);
    environment.setPage(page);
    environment.log.info(`Navigated to page: ${websiteUrl}`);
    return true;
  } catch (error: any) {
    environment.log.error(`Error launching browser: ${error.message}`);
    return false;
  }
}
