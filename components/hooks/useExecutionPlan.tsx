import {
  FlowToExecutionPlan,
  FlowToExecutionPlanTypeValidationError,
} from "@/lib/workflow/executionPlan";
import { AppNode } from "@/types/appNode";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { toast } from "sonner";
import useFlowValidation from "./useFlowValidation";

const useExecutionPlan = () => {
  const { toObject } = useReactFlow();
  const { setInvalidInputs, clearErrors } = useFlowValidation();

  const handleError = useCallback(
    (error: any) => {
      switch (error.type) {
        case FlowToExecutionPlanTypeValidationError.MissingEntryPoint:
          toast.error("No entry point found");
          break;
        case FlowToExecutionPlanTypeValidationError.InvalidInputs:
          toast.error("Not all inputs values are set");
          setInvalidInputs(error.invalidElements);
          break;
        default:
          toast.error("something went wrong");
          break;
      }
    },
    [setInvalidInputs],
  );

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan, error } = FlowToExecutionPlan(
      nodes as AppNode[],
      edges,
    );

    if (error) {
      handleError(error);
      return null;
    }
    clearErrors();
    return executionPlan;
  }, [toObject, handleError, clearErrors]);

  return generateExecutionPlan;
};

export default useExecutionPlan;
