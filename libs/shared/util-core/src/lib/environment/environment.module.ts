import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ENVIRONMENT, EnvironmentService } from './environment.service';
import { StaticEnv } from './environment.types';

@NgModule({
  imports: [CommonModule]
})
export class EnvironmentModule {
  public static forRoot(environment: StaticEnv): ModuleWithProviders<EnvironmentModule> {
    return {
      ngModule: EnvironmentModule,
      providers: [
        EnvironmentService,
        {
          provide: ENVIRONMENT,
          useValue: environment
        }
      ]
    };
  }
}

export * from './environment.service';