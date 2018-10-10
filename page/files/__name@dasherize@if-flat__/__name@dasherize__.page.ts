import { Component, OnInit, OnDestroy, ViewChild, NgZone, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, fromEvent, pipe } from 'rxjs';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { AlertOptions, AlertButton } from '@ionic/core';
import { LazyLoadEvent, DataTable } from 'primeng/primeng';
import { <%= classify(name) %> } from './<%= camelize(name) %>.model';

@Component({
  selector: '<%= selector %>',
  templateUrl: './<%= dasherize(name) %>.page.html',
  styleUrls: ['./<%= dasherize(name) %>.page.<%= styleext %>'],
  encapsulation: ViewEncapsulation.None
})
export class <%= classify(name) %>Page implements OnInit, OnDestroy {

  public <%= camelize(name) %>Array: <%= classify(name) %>[] = [];
  public selected: <%= classify(name) %> = null;

  protected <%= camelize(name) %>Cols: any[] = null;

  // All subscription must be unsubscribed at ngOnDestroy
  protected arraySubscription: Subscription;
  protected paramMapSubscription: Subscription;


  protected <%= camelize(name) %>Service: EntityCollectionService<<%= classify(name) %>>;

  protected showPaginator = true;
  protected skip = 0;
  protected rowsPerPage = 10;
  protected total = 999999; // initial total is unknown


  constructor(
    private zone: NgZone,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private entityServices: EntityServices,
    public platform: Platform
  ) {
    this.<%= camelize(name) %>Service = entityServices.getEntityCollectionService('<%= classify(name) %>');  
  }

  ngOnInit() {
    this.paramMapSubscription = this.activatedRoute.paramMap.subscribe(paramMap => {
      // Get params from url here (like parentId - ex: 'parent/1/<%= camelize(name) %>')

      this.getList();
    });

    fromEvent(window, 'resize').subscribe(val => this.checkIfShowPaginator());
    this.checkIfShowPaginator();
  }

  protected checkIfShowPaginator() {
    this.showPaginator = this.platform.width() > 640; // && this.total > this.rowsPerPage
  }

  protected getList(skip = this.skip, take = this.rowsPerPage) {
    const loadingPromise = this.loadingController.create();
    loadingPromise.then(r => r.present());

    const arrayObservable: Observable<Brewerie[]> = this.<%= camelize(name) %>Service
      .getWithQuery(<QueryParams>{ 'page': skip.toString(), 'per_page': take.toString() });

    this.arraySubscription = arrayObservable
    .subscribe(<%= camelize(name) %> => {
      this.<%= camelize(name) %>Array = <%= camelize(name) %>;

      
      if (!this.<%= camelize(name) %>Cols) {
        this.<%= camelize(name) %>Cols = Object.keys(<%= camelize(name) %>[0]).filter(key => key !== 'id').map(key => ({ field: key, header: key }));
      }
    }, (error) => {
      this.alertController.create(<AlertOptions>{
        header: 'Error',
        message: 'There was an error fetching data! Please try again later.',
        buttons: [
          <AlertButton>{
            text: 'OK'
          }
        ]
      }).then(r => r.present());
    });

    this.arraySubscription.add(() => loadingPromise.then(loading => loading.dismiss()));
  }

  onTap(event, rowData) {
    if (event.pointerType === 'touch') {
      // if touch (tap), we prefer to navigate to details
      this.router.navigate([rowData.id], { relativeTo: this.activatedRoute });
    } else {
      // else (mouse click), we prefer to select the item
      this.selected = rowData;
    }
  }

  onPress(event, rowData) {
    if (event.pointerType === 'touch') {
      // if touch (hold gesture), we prefer to select the item
      this.selected = rowData;
    }
  }

  onDoubleClick($event, rowData) {
    // if double click (mouse), we prefer to navigate to details
    this.router.navigate([rowData.id], { relativeTo: this.activatedRoute });
  }

  doRefresh(event) {

    this.getList();

    this.arraySubscription.add(() => {
      if (event) {
        event.target.complete();
      }
    });
  }

  loadData(event: LazyLoadEvent) {
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort in single sort mode
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec in single sort mode
    //multiSortMeta: An array of SortMeta objects used in multiple columns sorting. Each SortMeta has field and order properties.
    //filters: Filters object having field as key and filter value, filter matchMode as value
    //globalFilter: Value of the global filter if available

    this.skip = event.first;
    this.rowsPerPage = event.rows;

    this.getList(this.skip, this.rowsPerPage);
  }

  nextPageLoad(event) {
    this.skip = this.skip + this.rowsPerPage;

    this.getList();

    this.arraySubscription.add(() => {
      if (event) {
        // To get the scroll to top, we set a empty array then put it back to the binding
        const array = this.<%= camelize(name) %>Array;
        this.<%= camelize(name) %>Array = [];
        setTimeout(() => {
          this.<%= camelize(name) %>Array = array;
        }, 0);
        event.target.complete();
      }
    });
  }

  beforePageLoad(event) {
    if (this.skip <= 0) {
      event.target.complete();
      return;
    }
    let beforeSkip = this.skip - this.rowsPerPage;
    if (beforeSkip < 0) {
      beforeSkip = 0;
    }
    this.skip = beforeSkip;

    this.getList();

    this.arraySubscription.add(() => {
      if (event) {
        // To get the scroll to top, we set a empty array then put it back to the binding
        const array = this.<%= camelize(name) %>Array;
        this.<%= camelize(name) %>Array = [];
        setTimeout(() => {
          this.<%= camelize(name) %>Array = array;
        }, 0);
        event.target.complete();
      }
    });
  }

  paginate(event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    const lazyLoad: LazyLoadEvent = { first: (event.page * event.rows), rows: event.rows };
    this.loadData(lazyLoad);
}

  ngOnDestroy() {
    if (this.paramMapSubscription) {
      this.paramMapSubscription.unsubscribe();
    }
    if (this.arraySubscription) {
      this.arraySubscription.unsubscribe();
    }
  }

}
