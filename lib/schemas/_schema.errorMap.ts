import { z } from "zod";

const fieldTranslations: Record<string, string> = {
  email: "ایمیل",
  name: "نام",
};

export const errorMap: z.ZodErrorMap = (issue) => {
  const fieldKey =
    fieldTranslations[String(issue.path?.[0])] ?? ("این فیلد" as string);

  if (issue.code == "unrecognized_keys") {
    return `${fieldKey} غیر قابل شناسایی است`;
  }
  if (issue.code == "invalid_format") {
    return `فرمت ${fieldKey} معتبر نیست`;
  }
  if (issue.code == "too_small") {
    return `تعداد کاراکتر های ${fieldKey} کمتر از حد معمول است`;
  }
  if (issue.code == "too_big") {
    return `تعداد کاراکتر های ${fieldKey} بیشتر از حد معمول است`;
  }
  if (issue.code == "invalid_type") {
    return `نوع ${fieldKey} معتبر نیست`;
  }
  if (issue.code == "invalid_element") {
    return `نوع ${fieldKey} معتبر نیست`;
  }
  if (issue.code == "invalid_key") {
    return `نوع کلید ${fieldKey} معتبر نیست`;
  }
  if (issue.code == "invalid_union") {
    return `نوع دسته بندی ${fieldKey} معتبر نیست`;
  }
  if (issue.code == "not_multiple_of") {
    return ` ${fieldKey}از نوع معتبر نیست`;
  }
  if (issue.code == "invalid_value") {
    return `مقدار ${fieldKey}از نوع معتبر نیست`;
  }
};
