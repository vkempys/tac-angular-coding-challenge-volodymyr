import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tac-nx-ppl-person-update',
  templateUrl: './person-update-component.html',
  styleUrls: ['./person-update-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonUpdateComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('on init in PeoplePersonUpdateComponent')
    console.log(this.route.snapshot.params['id'])
  }

}