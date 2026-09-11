import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { QuoteField, quoteFieldError } from './quote-validation';

@Directive({
  selector: '[quoteField][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => QuoteFieldDirective), multi: true }],
})
export class QuoteFieldDirective implements Validator {
  @Input({ required: true }) quoteField!: QuoteField;
  validate(control: AbstractControl): ValidationErrors | null {
    const error = quoteFieldError(this.quoteField, control.value);
    return error ? { quoteField: error } : null;
  }
}
