import { ZodType, z } from "zod";
import { createController } from "@/lib/controller";
import { TCtr } from "@/lib/controller";

export const validateSchema = <
  TSchema extends ZodType<Record<string, unknown>>,
>(
  schema: TSchema,
  input: z.input<TSchema>,
): TCtr<{ result?: z.output<TSchema>[] }> => {
  // initialize controller info object
  const controller = createController("validation");

  // validate schema
  const result = schema.safeParse(input);

  //- if validating schema was not successful, add error and return
  if (!result.success) {
    //- flatten errors
    const flattenedErrors = z.flattenError(result.error);

    //- initialize errors holder object
    const errorHolder: { errors: { fieldErrors?: Record<string, []> } } = {
      errors: {},
    };

    //- add flattened errors to holder errors
    Object.entries(flattenedErrors).forEach(([key, value]) => {
      errorHolder.errors = {
        ...errorHolder.errors,
        [key]: value,
      };
    });

    // console.log(
    //   Object.entries(errorHolder.errors.fieldErrors!).map(
    //     ([_, value]) => value?.[0],
    //   ),
    // );

    // add holder errors to controller messages
    controller.addMessage("errors", ["validation was not successful"]);
    return controller.get();
  }

  // add data holder as data to controller
  controller.addData("result", [result.data]);

  // add successful message to controller
  controller.addMessage("successes", ["data validated successfully"]);

  return controller.get();
};
