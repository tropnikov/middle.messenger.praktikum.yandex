export interface IValidationRule {
  type: "required" | "min" | "max" | "regexp";
  value: string | number | RegExp;
  errorMessage: string;
}

export type IValidationRules = Record<string, IValidationRule[]>;

export class Validator {
  private rules: IValidationRules;

  constructor(rules: IValidationRules) {
    this.rules = rules;
  }

  validate(name: string, value: string): string | null {
    const fieldRules = this.rules[name];

    if (!fieldRules) {
      return null;
    }

    for (const rule of fieldRules) {
      let error: string | null = null;

      switch (rule.type) {
        case "required":
          if (!value || !value.trim()) {
            error = rule.errorMessage;
          }
          break;
        case "min":
          if (value.length < Number(rule.value)) {
            error = rule.errorMessage;
          }
          break;
        case "max":
          if (value.length > Number(rule.value)) {
            error = rule.errorMessage;
          }
          break;
        case "regexp": {
          const pattern = rule.value as RegExp;
          if (!pattern.test(value)) {
            error = rule.errorMessage;
          }
          break;
        }
      }

      if (error) {
        return error;
      }
    }

    return null;
  }

  validateForm(formData: Record<string, string>): Record<string, string> {
    const errors: Record<string, string> = {};

    Object.keys(formData).forEach((fieldName) => {
      const error = this.validate(fieldName, formData[fieldName]);
      if (error) {
        errors[fieldName] = error;
      }
    });

    return errors;
  }
}
