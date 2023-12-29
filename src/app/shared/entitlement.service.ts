import { Injectable } from '@angular/core';
import { Roles } from './roles';

@Injectable({
  providedIn: 'root'
})
export class EntitlementService {

  private _roles: any = Roles;

  constructor() { }

  /**
   * Check the entitlement.
   * 
   * @param navItem Nav item.
   * @returns true/false
   */
  public isEntitled(navItem: any): boolean {

    const loggedInUserRole: string = localStorage.userRole;

    if (navItem) {

      const roles = this._roles[navItem];

      if (roles) {

        if (roles && roles.indexOf(loggedInUserRole) !== -1) {
          return true;
        }
        else
          return false;

      } else {

        return true;

      }

    }

    return true;

  }

}
