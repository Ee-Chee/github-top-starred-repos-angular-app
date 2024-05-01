import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepoIssueItemComponent } from './repo-issue-item.component';

describe('RepoIssueItemComponent', () => {
  let component: RepoIssueItemComponent;
  let fixture: ComponentFixture<RepoIssueItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoIssueItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepoIssueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
