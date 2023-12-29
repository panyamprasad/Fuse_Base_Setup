import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationItem, FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { InitialData } from 'app/app.types';
import { futuristicNavigation } from 'app/mock-api/common/navigation/data';
// import { EntitlementService } from 'app/shared/entitlement.service';

@Component({
    selector: 'futuristic-layout',
    templateUrl: './futuristic.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FuturisticLayoutComponent implements OnInit, OnDestroy {
    data: InitialData;
    navItems: FuseNavigationItem[]
    isScreenSmall: boolean;
    user_role: string;
    private _futuristicNavigation: FuseNavigationItem[] = futuristicNavigation;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        // private entitlementService: EntitlementService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        //this.user_role = localStorage?.userRole.toLowerCase();
        // Subscribe to the resolved route data
        this._activatedRoute.data.subscribe((data: Data) => {
            this.data = data.initialData;
        });

        // this.navItems = this._futuristicNavigation.filter(navItem => this.entitlementService.isEntitled(navItem.id));
        this.navItems = this._futuristicNavigation.filter(navItem => navItem.id);

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
