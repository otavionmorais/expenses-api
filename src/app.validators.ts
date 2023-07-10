import {
  IsUUID,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isFuture } from 'date-fns';

export class UuidParamDTO {
  @IsUUID()
  id: string;
}

@ValidatorConstraint({ name: 'isFutureDate', async: false })
export class IsNotFutureDate implements ValidatorConstraintInterface {
  validate(text: string) {
    return !isFuture(new Date(text));
  }

  defaultMessage() {
    return 'Date ($value) is a future date!';
  }
}
