import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Developer } from '../../Models/developer.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormService } from '../../services/developer.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{
  developers: Developer[] = [];

  displayedColumns: string[] = ['name', 'projects', 'unit', 'unitType', 'level', 'location', 'exposure', 'size', 'room', 'features'];

  dataSource! : MatTableDataSource<Developer>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router,private formService: FormService) {}

  ngOnInit(){
    
  }

  ngAfterViewInit() {
    this.formService.getDevelopers().subscribe(
      (response) => {
        this.developers = response;
        this.dataSource = new MatTableDataSource<Developer>(this.developers);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching records:', error);
      }
    );
    
  }

  GetFeatures(element: Developer): string {
    let parking = "Parking: " + (element.parking ? "Yes" : "No");
    let locker = "Locker: " + (element.locker ? "Yes" : "No");
    let balcony = "Balcony: " + (element.balcony ? "Yes" : "No");
  
    return parking + "<br>" + locker + "<br>" + balcony + "<br>";
  }
  
  goBack(){
    this.router.navigate(['']);
  }
}
