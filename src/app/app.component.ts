import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shop';
  oddNumbers:number[] = [];
  evenNumbers: number[] = [];

  listenInterval(interval)
{
	if(interval%2==0)
	{
		this.evenNumbers.push(interval);
	}
	else
	{
		this.oddNumbers.push(interval); 
	}
}
}	

