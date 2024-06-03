class Origin_Queue{
  constructor(id,collections){
    this.id = id;
    this.collectionGroup = collections;
    this.size = this.collectionGroup.length;
  }

  displayItems(){
    return this.collectionGroup;
  }

  pushItem(item){
    this.collectionGroup.push(item);
  }

  shiftItem(){
    this.collectionGroup.shift();
  }
}

class ExplainText{
  constructor(id){
    this.id = id;
  }

  explain(){

    const xhr = new XMLHttpRequest();
    let jsonData = null;

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {

          jsonData = JSON.parse(xhr.responseText);

        } else {
          console.log('에러');
        }
      }
    }

    xhr.open('GET', 'http://localhost:3001/items', true);
    xhr.send();

    const childrenGroup =document.getElementById("satellites").children;
    for(let i=0; i<childrenGroup.length; i++){
      document.getElementById(`img${i+1}`).addEventListener("click",()=>{
        document.getElementById("explainWrap").innerHTML =`<h1>${jsonData[i].iconName}</h1><p> ${jsonData[i].explain} <p>`;
      })
    }
  }
}

const myEx = new ExplainText("myEx");
myEx.explain();

const menu = document.getElementById("menu")
const myNavi = new Origin_Queue("navi",document.getElementById("menu").children);

const buttonMove = (()=>{
  document.getElementById("home").addEventListener("click",()=>{
    document.documentElement.scrollTop = 0;
  });
  document.getElementById("about").addEventListener("click",()=>{
    document.documentElement.scrollTop = 1000;
  });
  document.getElementById("project").addEventListener("click",()=>{
    document.documentElement.scrollTop = 1800;
  });
  document.getElementById("notes").addEventListener("click",()=>{
    document.documentElement.scrollTop = 2400;
  });
  document.getElementById("contact").addEventListener("click",()=>{
    document.documentElement.scrollTop = 3500;
  });
})();