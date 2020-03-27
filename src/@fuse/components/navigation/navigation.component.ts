import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

@Component({
    selector: 'fuse-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseNavigationComponent implements OnInit {
    @Input()
    layout = 'vertical';

    @Input()
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // console.log({ getCurrentNavigation: this._fuseNavigationService.getCurrentNavigation() });

        const currentNav: any[] = this._fuseNavigationService.getCurrentNavigation();
        let newNav: any[] = currentNav.filter(x => x.id !== 'custom-function');
        // console.log({ newNav: newNav });

        // Load the navigation either from the input or from the service
        // this.navigation = this.navigation || this._fuseNavigationService.getCurrentNavigation();
        this.navigation = newNav || this.navigation;

        // console.log({ navigation: this.navigation });

        const userData: {
            email: string;
            userCategory: string;
            token: string;
            dueDate: Date;
        } = JSON.parse(localStorage.getItem('userData'));
        // console.log({ userData: userData });

        // let childrens: any[] = newNav.filter(x => x.children);
        let childrens: any[] = newNav[0].children;
        // console.log({ childrens: childrens });



        if (userData !== null && userData.userCategory !== "1") {
            if (childrens.length > 0) {
                
                const newChildrens: any[] = childrens.filter(x => x.id !== 'userManangement');
                // console.log({ newChildrens: newChildrens });

                if (newChildrens.length > 0) {
                    // childrens = newChildrens;

                    newNav[0].children = newChildrens;
                }
            }
        }

        // Subscribe to the current navigation changes
        this._fuseNavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {

                // Load the navigation
                // this.navigation = this._fuseNavigationService.getCurrentNavigation();

                this.navigation = newNav;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to navigation item
        merge(
            this._fuseNavigationService.onNavigationItemAdded,
            this._fuseNavigationService.onNavigationItemUpdated,
            this._fuseNavigationService.onNavigationItemRemoved
        ).pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }
}
