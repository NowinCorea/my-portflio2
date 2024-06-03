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

    //json-server ./script/example.json --port 3001

    // xhr.open('GET', 'http://localhost:3001/items', true);
    xhr.open('GET', 'http://kkms4001.iptime.org:33051/items', true);
    xhr.send();

    const childrenGroup =document.getElementById("satellites").children;
    for(let i=0; i<childrenGroup.length; i++){
      document.getElementById(`img${i+1}`).addEventListener("click",()=>{
        document.getElementById("explainWrap").innerHTML =`<h1>${jsonData[i].iconName}</h1><p> ${jsonData[i].explain} <p>`;
      })
    }
  }
}

class OriginBuilding {
  constructor(buildingId) {
    this.buildingId = buildingId;

    this.createBuilding = function () {
      document.getElementById("groundArea").innerHTML += '<div class="building' + this.buildingId + '" id="building' + this.buildingId + '"></div>';
      let building = document.getElementById("building" + this.buildingId);
      building.style.left = Math.floor(Math.random() * 90) + '%';
      building.style.width = Math.floor((Math.random() * 70) + 30) + 'px';
      building.style.height = Math.floor((Math.random() * 50) + 50) + 'px';
    };

    this.addWindows = function (buildingNumber) {
      let building = document.getElementById("building" + buildingNumber);
      if (building.style.width >= '50px' && building.style.height >= '60px') {
        building.style.zIndex = "1";
        building.innerHTML += '<div class="windows' + buildingNumber + '" id="windows' + buildingNumber + '"></div>';
        for (let i = 0; i < 4; i++) {
          document.getElementById("windows" + buildingNumber).innerHTML += '<div class="windowside' + i + '" id="windowside' + i + '"></div>';
        }
      }
    };
  }
}


const myEx = new ExplainText("myEx");
myEx.explain();

window.addEventListener("scroll",()=>{
  document.getElementById("menu").classList.add("active");
  if(document.documentElement.scrollTop == 0){
    document.getElementById("menu").classList.remove("active");
  }
});

const buttonMove = (()=>{
  document.getElementById("home").addEventListener("click",()=>{
    document.documentElement.scrollTop = 0;
  });
  document.getElementById("about").addEventListener("click",()=>{
    document.documentElement.scrollTop = 1200;
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

const buildingCollection = [];

for(let i=0; i<15; i++){
	new OriginBuilding(i).createBuilding();
	buildingCollection.push( new OriginBuilding() );
	buildingCollection[i].addWindows(i); 
}
