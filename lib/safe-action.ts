import {
  createSafeActionClient,
  InferSafeActionFnResult,
} from "next-safe-action";
import { formatFlattenedZodError } from "./format";
export const actionClient = createSafeActionClient({
  defaultValidationErrorsShape: "flattened",
});

type ActionResponse = {
  success: boolean;
  message: string;
};
type ActionFn = (typeof actionClient)["action"];
type ActionReturn = ReturnType<ActionFn>;
interface Result extends InferSafeActionFnResult<ActionReturn> {
  data?: ActionResponse;
}

export function getReadableActionResult(result: Result | undefined) {
  if (!result)
    return {
      success: false,
      message: "No result returned",
    };

  if (result.serverError)
    return {
      success: false,
      message: "Server error. Please try again later.",
    };
  if (result.validationErrors)
    return {
      success: false,
      message: formatFlattenedZodError(result.validationErrors),
    };

  if (!result.data)
    return {
      success: false,
      message: "No data returned",
    };

  if (!result.data.success)
    return {
      success: false,
      message: result.data.message,
    };

  if (result.data.success)
    return {
      success: true,
      message: result.data.message,
    };

  return {
    success: false,
    message: "Unknown error occurred",
  };
}

export default actionClient;
