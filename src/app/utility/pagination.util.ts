export class PaginationUtil
{
	first: boolean;
	last:boolean;
	pageNumber:number;
	numberOfElements: number;
	totalElements: number;
	totalPages:number;
	offset: number;

	constructor(numberOfElements:number, totalElements:number, totalPages:number)
	{
		this.numberOfElements = numberOfElements;
		this.totalElements = totalElements;
		this.totalPages = totalPages;
		this.first = true;
		this.offset = 0;
		if(this.totalPages <= 1)
			this.last = true;
		else
			this.last = false;
		this.pageNumber = 1;
	}

	nextPage():boolean
	{
		if(this.last === true)
			return false;
		this.pageNumber += 1;
		this.offset += this.numberOfElements;
		if(this.pageNumber === this.totalPages)
		{
			this.last = true;
			return true;
		}
		return true;
	}
	previousPage(): boolean
	{
		if(this.first === true)
			return false;
		this.pageNumber -= 1;
		this.offset -= this.numberOfElements;
		if(this.pageNumber === 1)
		{
			this.first = true;
			return true;
		}
		return true;
	}
	goToPage(pageNumber:number):boolean
	{
		if(pageNumber ===this.pageNumber )
			return false;
		if(pageNumber <= 0 || pageNumber > this.totalPages)
			return false;
		this.offset = (pageNumber - 1)*this.numberOfElements;
		this.pageNumber = pageNumber;
	}


}