import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTempoComponent } from './cadastro-tempo.component';

describe('CadastroTempoComponent', () => {
  let component: CadastroTempoComponent;
  let fixture: ComponentFixture<CadastroTempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroTempoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroTempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
