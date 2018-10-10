import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { LoadingController, AlertController } from '@ionic/angular';
import { AlertOptions, AlertButton } from '@ionic/core';
import { <%= classify(name) %> } from '../<%= camelize(name) %>.model';
import { EntityCollectionService, EntityServices } from 'ngrx-data';

@Component({
  selector: '<%= selector %>',
  templateUrl: './<%= dasherize(name) %>.change-page.html',
  styleUrls: ['./<%= dasherize(name) %>.change-page.<%= styleext %>'],
})
export class <%= classify(name) %>ChangePage implements OnInit, OnDestroy {

  <%= camelize(name) %>: <%= classify(name) %> = <any>{ };

  // All subscription must be unsubscribed at ngOnDestroy
  paramMapSubscription: Subscription;
  readSubscription: Subscription;
  createSubscription: Subscription;
  updateSubscription: Subscription;
  deleteSubscription: Subscription;

  protected <%= camelize(name) %>Service: EntityCollectionService<<%= classify(name) %>>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private entityServices: EntityServices
  ) {
    this.<%= camelize(name) %>Service = entityServices.getEntityCollectionService('<%= classify(name) %>');
  }

  ngOnInit() {
    this.paramMapSubscription = this.activatedRoute.paramMap.subscribe(paramMap => {
      const <%= camelize(name) %>Id = paramMap.get('<%= camelize(name) %>Id');

      if (<%= camelize(name) %>Id) {
        this.read(<%= camelize(name) %>Id);
      }
    });
  }

  save(<%= camelize(name) %>: <%= classify(name) %>) {
    if (<%= camelize(name) %>.id) {
      this.update(<%= camelize(name) %>);
    } else {
      this.create(<%= camelize(name) %>);
    }
  }

  protected read(<%= camelize(name) %>Id) {
    const loadingPromise = this.loadingController.create();
    loadingPromise.then(r => r.present());

    const readObservable: Observable<any> = this.<%= camelize(name) %>Service.get(<%= camelize(name) %>Id);

    this.readSubscription = readObservable.subscribe(<%= camelize(name) %> => {
      Object.assign(this.<%= camelize(name) %>, <%= camelize(name) %>);
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

    this.readSubscription.add(() => loadingPromise.then(loading => loading.dismiss()));
  }

  protected create(<%= camelize(name) %>: <%= classify(name) %>) {
    const loadingPromise = this.loadingController.create();
    loadingPromise.then(r => r.present());

    const createObservable = this.<%= camelize(name) %>Service.create(<%= camelize(name) %>);

    this.createSubscription = createObservable.subscribe((value) => {
      this.alertController.create(<AlertOptions>{
        header: 'Success',
        message: 'Successful registration!',
        buttons: [<AlertButton>{ text: 'OK' }]
      }).then(r => r.present());
    }, (error) => {
      this.alertController.create(<AlertOptions>{
        header: 'Error',
        message: 'There was an error creating data! Please try again later.',
        buttons: [<AlertButton>{ text: 'OK' }]
      }).then(r => r.present());
    });

    this.createSubscription.add(() => loadingPromise.then(loading => loading.dismiss()));
  }

  protected update(<%= camelize(name) %>: <%= classify(name) %>) {
    const loadingPromise = this.loadingController.create();
    loadingPromise.then(r => r.present());

    const updateObservable = this.<%= camelize(name) %>Service.update(<%= camelize(name) %>);

    this.updateSubscription = updateObservable.subscribe((value) => {
      this.alertController.create(<AlertOptions>{
        header: 'Success',
        message: 'Changed successfully!',
        buttons: [<AlertButton>{ text: 'OK' }]
      }).then(r => r.present());
    }, (error) => {
      this.alertController.create(<AlertOptions>{
        header: 'Error',
        message: 'There was an error changing data! Please try again later.',
        buttons: [<AlertButton>{ text: 'OK' }]
      }).then(r => r.present());
    });

    this.updateSubscription.add(() => loadingPromise.then(loading => loading.dismiss()));
  }

  protected delete(<%= camelize(name) %>Id: <%= classify(name) %>) {
    const loadingPromise = this.loadingController.create();
    loadingPromise.then(r => r.present());

    const deleteObservable = this.<%= camelize(name) %>Service.delete(<%= camelize(name) %>Id);

    this.deleteSubscription = deleteObservable.subscribe((value) => {
      this.alertController.create(<AlertOptions>{
        header: 'Success',
        message: 'Deleted successfully!',
        buttons: [<AlertButton>{ text: 'OK' }]
      }).then(r => r.present());
    }, (error) => {
      this.alertController.create(<AlertOptions>{
        header: 'Error',
        message: 'There was an error deleting data! Please try again later.',
        buttons: [<AlertButton>{ text: 'OK' }]
      }).then(r => r.present());
    });

    this.deleteSubscription.add(() => loadingPromise.then(loading => loading.dismiss()));
  }

  ngOnDestroy() {
    if (this.paramMapSubscription) {
      this.paramMapSubscription.unsubscribe();
    }
    if (this.readSubscription) {
      this.readSubscription.unsubscribe();
    }
    if (this.createSubscription) {
      this.createSubscription.unsubscribe();
    }
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }

}
