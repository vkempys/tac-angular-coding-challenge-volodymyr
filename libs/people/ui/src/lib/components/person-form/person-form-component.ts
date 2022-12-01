import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { Person, Gender } from '@tac/people/data-access';

export enum PersonFormControlKeys {
  NAME = 'name',
  AGE = 'age',
  ACTIVE = 'isActive',
  ABOUT = 'about',
  GENDER = 'gender'
}

@Component({
  selector: 'tac-nx-ppl-ui-person-form',
  templateUrl: './person-form-component.html',
  styleUrls: ['./person-form-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonFormComponent implements OnInit, OnDestroy {

  @Input() person?: Person;
  @Input() submitLabel: string;
  @Output() formSubmitted: EventEmitter<FormData> = new EventEmitter();
  @Output() formCanceled: EventEmitter<void> = new EventEmitter();

  @ViewChild('personForm') ngForm: NgForm;

  form: UntypedFormGroup;
  hasError: boolean;

  readonly formKeys = PersonFormControlKeys;

  readonly formsConfig = {
    [PersonFormControlKeys.NAME]: {
      maxlength: 70
    },
    [PersonFormControlKeys.AGE]: {
      min: 18,
      max: 110
    },
    [PersonFormControlKeys.ABOUT]: {
      maxlength: 250
    },
    [PersonFormControlKeys.GENDER]: {
      options: [Gender.MALE, Gender.FEMALE]
    },
  };
  
  private readonly ngUnsubscribe = new Subject<void>();

  constructor(
    private readonly formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onCancel(): void {
    this.formCanceled.emit();
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.formSubmitted.emit(this.form.value);
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      [PersonFormControlKeys.NAME]: new UntypedFormControl(this.person?.name, {
        validators: [
          Validators.required,
          Validators.maxLength(this.formsConfig[PersonFormControlKeys.NAME].maxlength),
        ],
        updateOn: 'blur'
      }),
      [PersonFormControlKeys.AGE]: new UntypedFormControl(this.person?.age, {
        validators: [
          Validators.required,
          Validators.min(this.formsConfig[PersonFormControlKeys.AGE].min),
          Validators.max(this.formsConfig[PersonFormControlKeys.AGE].max),
        ],
        updateOn: 'blur'
      }),
      [PersonFormControlKeys.ACTIVE]: new UntypedFormControl(!!this.person?.isActive),
      [PersonFormControlKeys.ABOUT]: new UntypedFormControl(this.person?.about, {
        validators: [
          Validators.maxLength(this.formsConfig[PersonFormControlKeys.ABOUT].maxlength),
        ],
        updateOn: 'blur'
      }),
      [PersonFormControlKeys.GENDER]: new UntypedFormControl(this.person?.gender, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
    });
  }

}