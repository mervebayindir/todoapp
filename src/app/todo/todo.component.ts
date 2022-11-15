import { Component, OnInit } from '@angular/core';
import { Model } from '../model';
import { TodoItem } from '../todoitem';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  
  //message="Merhaba";
  constructor() {
    this.model.items = this.getItemsFromLs();
   }
   //items=["item 1","item 2","item 3","item 4"];
    // private name: string = "Merve";
  //  items: TodoItem[]= [               Burayı Model.ts constructor ıcıne tasıdık
  //   { description:"kahvaltı", action:"yes" },
  //   { description:"spor", action:"yes" },
  //   { description:"alışveriş", action:"no" },
  //   new TodoItem("kahvaltı","yes"),
  //   new TodoItem("spor","yes"),
  //   new TodoItem("alışveriş","no"),
  //   new TodoItem("kahvaltı","yes"),
   //];

   model = new Model();

  //  addItem(txtItem:any){
  //   console.log(txtItem.value);
  //  }

  displayAll:boolean=false;
  inputText: string="";
  

  addItem(){
    if(this.inputText!= ""){
    let data={ description : this.inputText, action:false };
    this.model.items.push(data);

    let items= this.getItemsFromLs();
    items.push(data);

    localStorage.setItem("items", JSON.stringify(items));

    this.inputText = "";
   } else{
    alert("bilgileri giriniz");
   }
  }
   getName(){
    return this.model.name;
   }

   getItems(){
    if(this.displayAll){
      return this.model.items;
    }
    return this.model.items.filter(item=> !item.action);
    
   }
   displayCount(){
    return this.model.items.filter(i=>i.action).length;
   }
   getBtnClasses(){
    return {
      'disabled': this.inputText.length == 0,
      'btn-secondary': this.inputText.length == 0,
      'btn-primary': this.inputText.length > 0
    }
   }
   getItemsFromLs(){
    let items: TodoItem[] = [];
    let value = localStorage.getItem("items");

    if(value != null){
      items = JSON.parse(value);     
    }

    return items;
   }
   onActionChanged(item :TodoItem){
    let items = this.getItemsFromLs();

    localStorage.clear();
    items.forEach( i=> {
      if(i.description==item.description){
        i.action =item.action;
      }
    });
    localStorage.setItem("items", JSON.stringify(items));
   }
}
