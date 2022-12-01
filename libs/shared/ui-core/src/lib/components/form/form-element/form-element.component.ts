import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  Optional,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormGroupName,
  NgForm,
  NgModelGroup,
} from '@angular/forms';
import { Subject, debounceTime, merge, takeUntil } from 'rxjs';

import { CustomInputComponentAbstract } from '../custom-input-component.abstract';

@Component({
  selector: 'tac-nx-shrd-uic-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FormElementComponent implements AfterContentInit, OnDestroy {
  
  static readonly changesDebounceDelay = 10;

  @HostBinding('class.shrd-uic-form-element')
  private readonly hostClass = true;

  @ContentChildren(CustomInputComponentAbstract, { descendants: true })
  private readonly inputComponentList: QueryList<CustomInputComponentAbstract>;

  @Input() label: string;
  @Input() required: boolean; 
  @Input() useHorizontalLayout = true; 

  hasErrors = false;
  errorMessages: string[];
  labelForId: string;

  private uniqueFormControls: AbstractControl[];
  private readonly form: NgForm;
  private readonly ngUnsubscribe = new Subject<void>();

  constructor(
    public readonly elementRef: ElementRef,
    @Optional() @Inject(NgForm) ngForm: NgForm,
    @Optional() @Inject(ControlContainer) private readonly controlContainer: ControlContainer,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.form = ngForm || (controlContainer.formDirective as NgForm);
  }

  ngAfterContentInit(): void {
    this.uniqueFormControls = Array.from(new Set(this.inputComponentList.map(component => component.control)));
    this.labelForId = this.inputComponentList.first.inputId;
    this.subscribeToErrors();
  }

  private subscribeToErrors(): void {
    const valueChanges$ = merge(
      ...this.combineControls<AbstractControl>(this.uniqueFormControls).map(control => control.valueChanges)
    );

    merge(this.form.ngSubmit, valueChanges$)
      .pipe(debounceTime(FormElementComponent.changesDebounceDelay), takeUntil(this.ngUnsubscribe))
      .subscribe(this.setErrorMessages.bind(this));
  }

  private setErrorMessages(): void {
    this.hasErrors = false;
    if (this.form.submitted) {
      this.uniqueFormControls.forEach(control => control.markAsTouched());
    }
    const errorMessages = this.combineControls<CustomInputComponentAbstract | AbstractControl>(
      this.inputComponentList.toArray()
    )
      .filter(component => component.errors && (component.touched || this.form.submitted))
      .map(({ errors }) => errors ? Object.keys(errors) : [])
      .reduce((acc, curr) => [...acc, ...curr], []);

    this.errorMessages = Array.from(new Set(errorMessages));
    this.hasErrors = !!this.errorMessages.length;
    this.cdr.markForCheck();
  }

  combineControls<T>(existing: T[]): T[] {
    const controls: T[] = [];
    if (this.controlContainer instanceof NgModelGroup || this.controlContainer instanceof FormGroupName) {
      controls.push(this.controlContainer.control as any);
    }
    return [...existing, ...controls];
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
