/* --- Angular Imports --- */
import { Injectable } from '@angular/core';

/* --- Other Vendor Imports --- */
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EntitlementService } from '../entitlement.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntitlementServiceResolver implements Resolve<Observable<any>> {

  constructor(
    private entitlementService: EntitlementService,
    public _router: Router
  ) {

  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {

    return this.checkEntitlement(route.data.role);

  }

  public checkEntitlement(page?: string[]): any {
    
    page.forEach((item: any) => {

        if (this.entitlementService.isEntitled(item)) {

            return true;
      
        } else {
    
        this._router.navigate([`no-access`]);
    
            return false;
    
        }

    });

    

  }

}
