export enum TaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
  // NAVIGATE = "NAVIGATE",
  // EXTRACT_DATA = "EXTRACT_DATA",
  // FILL_FORM = "FILL_FORM",
  // CLICK_ELEMENT = "CLICK_ELEMENT",
  // WAIT_FOR_ELEMENT = "WAIT_FOR_ELEMENT",
  // TAKE_SCREENSHOT = "TAKE_SCREENSHOT",
  // CLOSE_BROWSER = "CLOSE_BROWSER",
}

export enum TaskParamType {
  STRING = "STRING",
}

export interface TaskParam {
  name: string;
  type: TaskParamType;
  helperText?: string;
  required?: boolean;
  hideHandle?: boolean;
  value?: string;
  [key: string]: any;
}