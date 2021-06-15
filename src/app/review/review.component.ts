import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItemService } from '../services/cart-item.service';
import { LoginService } from '../services/login.service';
import { ReviewSummaryService } from '../services/review-summary.service';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  rating = 4;
  reviews = [];
  numberOfElements:number;
  totalElements: number;
  totalPages:number
  pageNumber:number;
  offset:number;
  entryPerPage = 12;
  sortOrder = "NONE";
  summary = null;
  productId = 0;
  constructor(private route: ActivatedRoute, 
    private reviewService: ReviewService,
    private loginService: LoginService,
    private reviewSummaryService: ReviewSummaryService) { }

ngOnInit(): void {
this.productId = this.route.snapshot.params.productId;
// this.reviewService.getAll(0,this.entryPerPage, "NONE").subscribe(response=>{
//   console.log(response);
// },
// error=>{
//   console.log(error);
//   alert("error while fetching data");
// }
// );
  this.reviewService.getAll(this.productId, 0, this.entryPerPage, this.sortOrder).subscribe(response=>{
    console.log(response);
    if(response.content == false)
    {
      alert("This product is not yet rated");
      return;
    }
    this.refreshNavButton(response);
  });
  this.summary = this.reviewSummaryService.getSummary(this.productId).subscribe(response=>{
    this.summary = response;
    console.log(this.summary);
  },
  error=>{
    alert("error while reviews summary");
  }
  );
}
getWidth(startCount)
{
  return 10;
}
getRatingInt()
{
  let rating = Number(this.getNetRating());
  return new Array(Math.floor(rating));
}
hasFractionalPart()
{
  let rating = Number(this.getNetRating());
  return (rating - Math.floor(rating)) >= 0.5 ;
}
refreshNavButton(data)
{
    this.reviews = data.content;
    this.numberOfElements = data.numberOfElements;
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
    this.pageNumber = data.pageable.pageNumber;
    this.offset = data.pageable.offset;
}

previousPage()
{
  if(this.pageNumber === 0)
    return;
    this.reviewService.getAll(this.productId, this.pageNumber-1, this.entryPerPage,this.sortOrder).subscribe(data=>{
      this.refreshNavButton(data);
    });
}
firstPage()
{
  if(this.pageNumber ===0)
  return;
  this.reviewService.getAll(this.productId,0, this.entryPerPage, this.sortOrder).subscribe(data=>{
    this.refreshNavButton(data);
  }
  );
}
lastPage()
{
  if(this.pageNumber === this.totalPages-1)
  return;
  this.reviewService.getAll(this.productId, this.totalPages-1, this.entryPerPage, this.sortOrder).subscribe(data=>{
    this.refreshNavButton(data);
  });
}
nextPage()
{
  if(this.pageNumber === this.totalPages-1)
  return;
  this.reviewService.getAll(this.productId,this.pageNumber+1, this.entryPerPage, this.sortOrder).subscribe(data=>{
    this.refreshNavButton(data);
  });
}
getDisplayImage(product)
{
  return product.attributes.image_url.split("\|")[0].trim();
}
getScores(selectedProduct)
{
  let score = Math.floor(1+(Math.random()*4));
  let scores = new Array(score);
  return scores;
}
getUrl(id)
{
  return '/details/' + id;
}

sortOrderChange(order)
{
  console.log(order);
  if(order === 'default')
    order = 'NONE';
  this.sortOrder = order;
  this.reviewService.getAll(this.productId,0,this.entryPerPage, this.sortOrder).subscribe(data=>{
    if(data.content == false)
    {
      alert("failed to fetch data");
      return;
    }
     this.refreshNavButton(data);
  });
}
getProfilePicture(name: string)
{
  let initial = name.toUpperCase()[0];
  return `assets/images/profile/${initial}.png`;
}
getRating(rating)
{
  return new Array(rating);
}
submitReview(frm)
{
  console.log(frm);
  let review = {"token" : this.loginService.getToken(),
                "summary": frm.value.summary,
                "text" : frm.value.text,
                "rating": Number(frm.value.rating),
                "productId": Number(this.productId)};
  this.reviewService.submitReview(review).subscribe(response=>{
    alert("Thanks for your feedback");
  },
  error=>{
    alert("Some error occured");
    console.log(error);
  })
}
likeClicked()
{
  console.log("like");
}
dislikeClicked()
{
  console.log("dislike");
}
getNetRating()
{
  if(this.summary == null)
  return 0;
  let total = 0;
  let weightedAverage = 0;
  let values = Object.values(this.summary);
  for(let idx = 0;idx < values.length;++idx)
  {
    weightedAverage += (idx+1)*Number(values[idx]);
    total += Number(values[idx]);
  }
  return (weightedAverage/total).toFixed(1);
}
getRatingPercent(rating)
{
  let total = 0;
  let values = Object.values(this.summary);
  for(let idx = 0;idx < values.length;++idx)
  {
    total += Number(values[idx]);
  }
  let x = this.summary[rating];
  return (x/total)*100;
}
getTotal()
{
  let total = 0;
  let values = Object.values(this.summary);
  for(let idx = 0;idx < values.length;++idx)
  {
    total += Number(values[idx]);
  }
  return total;
}
}