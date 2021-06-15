import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItemService } from '../services/cart-item.service';
import { LoginService } from '../services/login.service';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  product = null;
  constructor(private route: ActivatedRoute, 
              private shopService: ShopService,
              private loginService: LoginService,
              private cartItemService: CartItemService) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.params.productId;
    this.shopService.getByProductId(productId).subscribe(product=>{
      this.product = product;
      console.log(product);
    },
    error=>{
        alert('error in fetching product details');
    }
   
  );
  }

getDisplayImage(idx)
{
  if(this.product == null)
  return;
  return this.product.attributes.image_url.split("\|")[idx].trim();
}
getDisplayImages()
{
  let images =  this.product.attributes.image_url.split("\|").splice(1);
  for(let idx = 0;idx< images.length;++idx)
  {
    images[idx] = images[idx].trim();
  }
  return images;
}
  getKeys()
  {
    let keys =  Object.keys(this.product.attributes);
    keys = keys.filter(key=>key !== 'image_url' && key !== 'offers');
    return keys;
  }
  getValue(key)
  {
    if(key == 'offers')
    {
      let offers = this.product.attributes['offers'].split("\|").map(offer=>offer.trim());
      return offers;
    }
    return this.product.attributes[key];
  }
  getImageCount()
  {
    if(this.product === null)
    return 0;
    return this.product.attributes.image_url.split("\|").length;
  }
  addToCart()
  {
    if(!this.loginService.isLoggedIn())
    {
      alert("login to add in cart");
      // later user will be navigated to login page
    }
    this.cartItemService.add(this.product.id).subscribe(response=>{
      console.log(response);
      alert("add to cart");
    },
    error=>{
      alert("error while add in cart");
      console.log(error);
    }
    );
  }
  getUrl(product)
  {
    return '/review/' + product.id;
  }
}
