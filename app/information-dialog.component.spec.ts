import { Component, NgModule } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { By } from '@angular/platform-browser';

import { InformationDialogComponent } from './information-dialog.component';

describe('InformationDialog', () => {
  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;

  let noop: ComponentFixture<NoopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ DialogTestModule ],
      providers: [
        { provide: OverlayContainer, useFactory: () => {
          overlayContainerElement = document.createElement('div');
          return { getContainerElement: () => overlayContainerElement };
        }}
      ]
    });

    dialog = TestBed.get(MatDialog);

    noop = TestBed.createComponent(NoopComponent);

  });

  it('shows information without details', () => {
    const config = {
      data: {
        title: 'User cannot be saved without an email',
        details: []
      }
    };
    dialog.open(InformationDialogComponent, config);

    noop.detectChanges(); // Updates the dialog in the overlay

    const h2 = overlayContainerElement.querySelector('#mat-dialog-title-0');
    const button = overlayContainerElement.querySelector('button');

    expect(h2.textContent).toBe('User cannot be saved without an email');
    expect(button.textContent).toBe('Close');
  });

  it('shows an error message with some details', () => {

    const config = {
      data: {
        title: 'Validation Error - Not Saved',
        details: ['Need an email', 'Username already in use']
      }
    };
    dialog.open(InformationDialogComponent, config);

    noop.detectChanges(); // Updates the dialog in the overlay

    const li = overlayContainerElement.querySelectorAll('li');
    expect(li.item(0).textContent).toContain('Need an email');
    expect(li.item(1).textContent).toContain('Username already in use');
  });
});

// Noop component is only a workaround to trigger change detection
@Component({
  template: ''
})
class NoopComponent {}

const TEST_DIRECTIVES = [
  InformationDialogComponent,
  NoopComponent
];

@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [
    InformationDialogComponent
  ],
})
class DialogTestModule { }
