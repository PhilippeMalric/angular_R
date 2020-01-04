import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


export class MyVariable {

  symbol:string;
  couleur:string;
  decomposition:MyVariable[];
  constructor(symbol,couleur,decomposition){
    this.symbol=symbol
    this.couleur=couleur;
    this.decomposition=decomposition;


  }
}

export class wordCount {

  symbol:string;
  count:number;
  constructor(symbol,count){
    this.symbol=symbol
    this.count=count;
  }
}



export interface HarmoRule{
  index:string;
  rule_category:string;
  Study_variable:string;
  Harmo_rule:string;
  DataSchema_variable:string;

  dataSchema_variable_decompo:MyVariable[];

  variables:MyVariable[];

  harmoV:MyVariable[];
  harmoV2:MyVariable[];

}


@Component({
  selector: 'anms-tibble',
  templateUrl: './tibble.component.html',
  styleUrls: ['./tibble.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TibbleComponent implements OnInit {


  fileToUpload: File = null;
  tibble :HarmoRule[]
  dataSource : MatTableDataSource<HarmoRule>;
  dataSource2 : MatTableDataSource<wordCount>;
  dataSource3 : MatTableDataSource<wordCount>;
  dataSource4 : MatTableDataSource<wordCount>;
  displayedColumns: string[] = ['position']
  displayedColumns2: string[] = ['word','count']
  symbol_to_color = {}
  word_to_color = {}

  stat_data_schema_v = {}
  words_count_data_schema_v: wordCount[] = []

  stat_study_variable = {}
  words_count_ss_v: wordCount[] = []

  stat_study_variable_in_HR = {}
  words_count_hr_v: wordCount[] = []

  @ViewChild('matPaginator1', {static: false}) paginator1: MatPaginator;
  @ViewChild('matPaginator2', {static: false}) paginator2: MatPaginator;
  @ViewChild('matPaginator3', {static: false}) paginator3: MatPaginator;
  @ViewChild('matPaginator4', {static: false}) paginator4: MatPaginator;

  constructor(private fileUploadService:FileUploadService,private changeDetectorRef: ChangeDetectorRef,) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter2(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  applyFilter3(filterValue: string) {
    this.dataSource3.filter = filterValue.trim().toLowerCase();

    if (this.dataSource3.paginator) {
      this.dataSource3.paginator.firstPage();
    }
  }

  applyFilter4(filterValue: string) {
    this.dataSource4.filter = filterValue.trim().toLowerCase();

    if (this.dataSource4.paginator) {
      this.dataSource4.paginator.firstPage();
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  launch(i){
    console.log(i)
    console.log(this.tibble[i])
  }
  onTextInputChange(evt,index){
    console.log(evt,index)
  }
  uploadFileToActivity() {
    console.log("fileToUpload")
    console.log(this.fileToUpload)

    this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }
  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
  var file: File = inputValue.files[0];
  var myReader: FileReader = new FileReader();
  var fileType = inputValue.parentElement.id;
  myReader.onloadend = (e)=> {
      //myReader.result is a String of the uploaded file
      this.tibble = JSON.parse(myReader.result.toString())//.slice(0,20)
      this.tibble.map(this.createVariables)
      this.addStat()
      this.dataSource = new MatTableDataSource(this.tibble);
      console.log(this.tibble)
      this.dataSource.paginator = this.paginator1;

      this.dataSource2 = new MatTableDataSource(this.words_count_data_schema_v);
      console.log(this.words_count_data_schema_v)
      this.dataSource2.paginator = this.paginator2;
//-*-----------------------------------------------------------------------------------------------
      this.dataSource3 = new MatTableDataSource(this.words_count_ss_v);
      console.log(this.words_count_ss_v)
      this.dataSource3.paginator = this.paginator3;

      this.dataSource4 = new MatTableDataSource(this.words_count_hr_v);
      console.log(this.words_count_hr_v)
      this.dataSource4.paginator = this.paginator4;
//----------------------------------------------------------------------------------------

      this.changeDetectorRef.markForCheck()
      //fileString = myReader.result would not work,
      //because it is not in the scope of the callback
  }

myReader.readAsText(file);
}



addStat(){

  this.stat_data_schema_v = {}

  //decompose
  let ds_words = this.tibble.map((x)=>{

    return x.DataSchema_variable.split("_")
  })

  let ds_words_one_array = ds_words.reduce( ( a, c ) => a.concat( [...c] ), [] )

  let ds_v_unique_set = new Set( ds_words.reduce( ( a, c ) => a.concat( [...c] ), [] ) )

  let ds_v_unique = Array.from(ds_v_unique_set)

  this.words_count_data_schema_v = ds_v_unique.map((x)=>{
    let results = ds_words_one_array.filter((y:string)=>{
      return y == x
    })

    this.stat_data_schema_v[x] = results.length
    return new wordCount(x,results.length)
  }).sort(function(a, b){return b.count-a.count})
//-----------------------

this.stat_study_variable = {}

//decompose
let dss_words = this.tibble.map((x)=>{

  let array_words = x.Study_variable.split(",").map((w)=>{

    return w.split("_")

  })

  return array_words.reduce( ( a, c ) => a.concat( [...c] ), [] )
})

let dss_words_one_array = dss_words.reduce( ( a, c ) => a.concat( [...c] ), [] )

let dss_v_unique_set = new Set( dss_words.reduce( ( a, c ) => a.concat( [...c] ), [] ) )

let dss_v_unique = Array.from(dss_v_unique_set)

this.words_count_ss_v = dss_v_unique.map((x)=>{
  let results = dss_words_one_array.filter((y:string)=>{
    return y == x
  })

  this.stat_study_variable[x] = results.length
  return new wordCount(x,results.length)
}).sort(function(a, b){return b.count-a.count})
//-----------------------

this.stat_study_variable_in_HR = {}

//decompose



let dhr_words = this.tibble.map((x)=>{

  let re = RegExp("\\$[A-Za-z0-9_\.]*","g")
  let v = x.Harmo_rule.match(re);
  //console.log("match")
  //console.log(v)
  if(v){

  let array_words = v.map((w)=>{

    return w.split("_")

  })

  return array_words.reduce( ( a, c ) => a.concat( [...c] ), [] )
  }
  else{
    return []
  }
})

let dhr_words_one_array = dhr_words.reduce( ( a, c ) => a.concat( [...c] ), [] )

let dhr_v_unique_set = new Set( dhr_words.reduce( ( a, c ) => a.concat( [...c] ), [] ) )

let dhr_v_unique = Array.from(dhr_v_unique_set)

this.words_count_hr_v = dhr_v_unique.map((x)=>{
  let results = dhr_words_one_array.filter((y:string)=>{
    return y == x
  })

  this.stat_study_variable_in_HR[x] = results.length
  return new wordCount(x,results.length)
}).sort(function(a, b){return b.count-a.count})

/*
  let sets = this.tibble.map((x)=>{

    x.Study_variable


    x.variables.map((x)=>{

    let array_1 = x.decomposition.map((x)=>{return x.symbol})

    return new Set(array_1)
  })
}
  )
*/
  //let unique =new Set( array.reduce( ( a, c ) => a.concat( [...c] ), [] ) )

  //unique.map((x)=>{

  //})


}


createVariables =  (hr:HarmoRule,i:number)=>{

  this.tibble[i].dataSchema_variable_decompo =

  this.tibble[i].variables = this.createVariables_helper(hr.Study_variable).sort((a, b) => a.symbol.localeCompare(b.symbol))
  this.tibble[i].harmoV2 = this.createVinHarmo_helper(hr.Harmo_rule)

  let hr_temp =  JSON.parse(JSON.stringify(this.tibble[i].harmoV2))
  this.tibble[i].harmoV = hr_temp.sort((a, b) => a.symbol.localeCompare(b.symbol))


  console.log("v1")
  console.log(this.tibble[i].variables)
  console.log("v2")
  console.log(this.tibble[i].harmoV)
}

createVariables_helper = variables=>{
  let v = variables.split(",")
  //console.log(v)
  return v.map((e,i2)=>{
    let v_temp = "$"+e.trim()
    let decomposition = []
    if(v_temp in this.symbol_to_color){


      if(v_temp.split("_").length <= 1){
        decomposition = [v_temp]
      }
      else{
        decomposition = this.decompose(v_temp)
      }

     return  new MyVariable(v_temp,this.symbol_to_color[v_temp],decomposition)
    }
     else{
      let color = this.getRandomColor();
      this.symbol_to_color[v_temp] = color
      let decomposition = []

      if(v_temp.split("_").length <= 1){
        decomposition = [v_temp]
      }
      else{
        decomposition = this.decompose(v_temp)
      }

      return  new MyVariable(v_temp,this.symbol_to_color[v_temp],decomposition)
     }

  })
}

createStudyVariables_helper = variables=>{
  //console.log(v)
  let decomposition

      if(variables.split("_").length <= 1){
        decomposition = [variables]
      }
      else{
        decomposition = this.decompose(variables)
      }

     return  new MyVariable(variables,this.symbol_to_color[variables],decomposition)

}

createVinHarmo_helper = (harmo:string)=>{
  let re = RegExp("\\$[A-Za-z0-9_\.]*","g")
  let v = harmo.match(re);
  //console.log("match")
  //console.log(v)
  if(v){
    return v.map((e,i2)=>{
      let v_temp = e.trim()
      let decomposition = []
      if(v_temp in this.symbol_to_color){


        if(v_temp.split("_").length <= 1){
          decomposition = [v_temp]
        }
        else{
          decomposition = this.decompose(v_temp)
        }

       return  new MyVariable(v_temp,this.symbol_to_color[v_temp],decomposition)
      }
       else{
        let color = this.getRandomColor();
        this.symbol_to_color[v_temp] = color
        let decomposition = []

        if(v_temp.split("_").length <= 1){
          decomposition = [v_temp]
        }
        else{
          decomposition = this.decompose(v_temp)
        }

        return  new MyVariable(v_temp,this.symbol_to_color[v_temp],decomposition)
       }

    })
  }
  else{
    return []
  }

}

decompose = (symbol)=>{
  let words = symbol.split("_")
  return words.map(
    (w)=>{


if(w in this.word_to_color){
  return new MyVariable(w, this.word_to_color[w],[])
  }
  else{
    let color = this.getRandomColor();
    this.word_to_color[w] = color
    return new MyVariable(w, this.word_to_color[w],[])
  }
 })
}


getRandomColor() {
  var letters2 = '56789ABC';
  var letters = '0123456789ABCDEF';
  var color = '#00';
  color += letters2[Math.floor(Math.random() * letters2.length)];
  for (var i = 0; i < 3; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

}
