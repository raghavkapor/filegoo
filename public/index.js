const  dragArea =document.querySelector('.drag-area');
const fileInput = document.querySelector('#fileInput');
const brobtn=document.querySelector('#browseBtn');
const logo=document.querySelector('.logo');
const bgprogress=document.querySelector(".bg-progress");
const percentDiv=document.querySelector(".percentage");
const progressbar=document.querySelector(".progress-bar");
const progress=document.querySelector(".progress");
const upBtn=document.querySelector("#upbtn");
const host=`${process.env.APP_BASE_URL}`;
const uploadURL=`${host}/api/files`;
const linkBox=document.querySelector(".links");
const copyBtn=document.querySelector(".copy");
const fileURLInput=document.querySelector("#fileUrl");

dragArea.addEventListener("dragover",(e)=>{
  e.preventDefault();
console.log('drag');
progress.style.display = "block";
document.getElementsByClassName("links").className = "dom-style";

})
logo.addEventListener("dragover",(e)=>{
  e.preventDefault();
  progress.style.display = "block";
  document.getElementsByClassName("links").className = "dom-style";
})
brobtn.addEventListener("click",()=>{
  fileInput.click();
})
fileInput.addEventListener("change",()=>{
  progress.style.display = "block";
  document.getElementsByClassName("links").className = "dom-style";
  uploadfile();
})

copyBtn.addEventListener("click",()=>{
  fileURLInput.select();
  document.execCommand("copy");
})

dragArea.addEventListener("drop",(e)=>{
 e.preventDefault();
 const files=e.dataTransfer.files;
  console.log(files);
 
  if (files.length)
  {
    fileInput.files = files;
    
   uploadfile();
  }
  
})
const uploadfile= () =>{
  const file=fileInput.files[0];
  const formData=new FormData();
  formData.append("myfile",file);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange=() =>{
    if(xhttp.readyState===XMLHttpRequest.DONE)
    {
      console.log(xhttp.response);
      showlink(JSON.parse(xhttp.response));
    }
  }
  xhttp.upload.onprogress=updateprogress;

  xhttp.open("POST",uploadURL);
  xhttp.send(formData);
}
const updateprogress =(e)=>{
  const percent =(e.loaded / e.total )*100;
  console.log(percent);
  bgprogress.style.width=`${percent}%`;
  percentDiv.innerText=`${percent}`;

  progressbar.style.transform=`scaleX(${percent/100})`;
  
}
const showlink=({file})=>{
  document.getElementById("fileUrl").value=file;
}
