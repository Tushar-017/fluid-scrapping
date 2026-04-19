import { TaskType } from "@/types/task";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtmlExecutor";
import { WorkflowTask } from "@/types/workflow";
import { ExecutionEnvironment } from "@/types/executor";
import { ExtractTextFromHtml } from "./ExtractTextFromHtml";

type ExecutorFn<T extends WorkflowTask> = (
  environment: ExecutionEnvironment<T>,
) => Promise<boolean>;

type RegistryType = {
  [K in TaskType]: ExecutorFn<WorkflowTask & { type: K }>;
};
export const ExecuteRegistry: RegistryType = {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  PAGE_TO_HTML: PageToHtmlExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromHtml,
};
