import {
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  forwardRef
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  UntypedFormControl,
  ValidationErrors
} from '@angular/forms';

import { filter, startWith } from 'rxjs';

@Directive()
export abstract class CustomInputComponentAbstract<TValue = string | object> implements ControlValueAccessor, OnInit {

  private static instanceCount = 0;

  protected _value: TValue;
  protected formControl: UntypedFormControl;

  inputId: string;

  @Input() name: string;
  @Input() formControlName: string;
  @Input() validateOnBlur: boolean;

  @Input()
  set value(v: any) {
    this.updateValue(v);
  }

  get value(): any {
    return this._value;
  }

  @Output() activated: EventEmitter<any> = new EventEmitter<any>();
  @Output() focusOut: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('mouseup', ['$event'])
  protected onActivated(event: MouseEvent | KeyboardEvent): void {
    this.activated.emit(event);
  }

  @HostListener('focusout', ['$event'])
  protected onFocusOut(event: any): void {
    this.onTouched();
    this.focusOut.emit(event);
  }

  get errors(): ValidationErrors | null {
    return this.formControl.errors;
  }

  get touched(): boolean {
    return this.formControl.touched;
  }

  get dirty(): boolean {
    return this.formControl.dirty;
  }

  get valid(): boolean {
    return this.formControl.valid;
  }

  get control(): UntypedFormControl {
    return this.formControl;
  }

  protected constructor(
    private readonly controlContainer: ControlContainer,
    protected readonly cdr: ChangeDetectorRef
  ) {
    CustomInputComponentAbstract.instanceCount++;
  }

  ngOnInit(): void {
    if (!this.formControl) {
      const controlContainerControl = this.controlContainer?.control?.get(this.formControlName);
      this.formControl =
        controlContainerControl instanceof UntypedFormControl ? controlContainerControl : new UntypedFormControl();
      if (!controlContainerControl) {
        this.updateFormControlValue(this._value);
      }
    }

    this.inputId = `${this.name}-${CustomInputComponentAbstract.instanceCount}`;

    const controlVal = this.formControl.value;
    const initialVal = controlVal !== undefined && controlVal !== null ? controlVal : this.value;

    this.formControl.valueChanges
      .pipe(
        startWith(initialVal as string),
        filter(v => v === this.formControl.value)
      )
      .subscribe(value => this.updateValue(value));

  }

  onChange: (_: any) => void = (_: any) => {};

  onTouched: () => void = () => {};

  protected updateValue(v: any): void {
    const hasChanged = v !== this._value;
    this._value = v;
    if (hasChanged && !this.controlContainer) {
      this.onChange(v);
    }
    this.updateFormControlValue(v);
  }

  protected updateFormControlValue(v: any, emitEvent = false): void {
    if (this.formControl && this.formControl.value !== v) {
      this.formControl.setValue(v, { emitEvent });
    }
  }

  writeValue(value: any): void {
    if (value) {
      this._value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

export function MakeProviders(type: any) {
  return [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => type),
      multi: true
    },
    {
      provide: CustomInputComponentAbstract,
      useExisting: forwardRef(() => type),
      multi: true
    }
  ];
}
