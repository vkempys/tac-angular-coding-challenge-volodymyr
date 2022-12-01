import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';

import { StaticEnv } from './environment.types';

export const ENVIRONMENT = new InjectionToken<StaticEnv>('core-util.environment');

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  private env: StaticEnv;

  constructor(@Optional() @Inject(ENVIRONMENT) staticEnv: StaticEnv) {
    this.env = staticEnv;
  }

  get isProduction(): boolean {
    return this.env.production;
  }

  get peopleApiUrl(): string {
    return this.env.peopleAPIEndpoint;
  }

}
