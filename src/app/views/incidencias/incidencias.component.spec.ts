import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenciasComponent } from './incidencias.component';

describe('IncidenciasComponent', () => {
  let component: IncidenciasComponent;
  let fixture: ComponentFixture<IncidenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncidenciasComponent]
    });
    fixture = TestBed.createComponent(IncidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
