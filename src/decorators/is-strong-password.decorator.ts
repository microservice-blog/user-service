import {
    registerDecorator,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";

@ValidatorConstraint({name: 'IsStrongPassword'})
export class IsStrongPasswordConstraint implements ValidatorConstraintInterface {
    validate(password: any) {
        if (typeof password !== 'string') return false;

        const strongPasswordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        return strongPasswordRegex.test(password);
    }

    defaultMessage(args: ValidationArguments): string {
        return `${args.property} must be at least 8 characters long, contain uppercase, lowercase, number, and special character`;
    }
}

export function IsStrongPassword(validationOptions?: any): PropertyDecorator {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsStrongPasswordConstraint,
        });
    };
}