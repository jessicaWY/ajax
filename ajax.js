/*
function ajax(method,url,data,sucess){
var xhr=null;
try{
    xhr=new XMLHttpRequest();
}catch(e){
    xhr=new ActiveXObject('MicrosoftXMLHTTP');
}
if(method=='get'&&data){
    url+='?'+data;
    xhr.open(method,url,true);
    xhr.send();
}
if(method=='post'&&data){
    xhr.open(method,url,true);
    xhr.setRequestHeader('aplication/x-www-form-urlencoded');
    xhr.send(data);
}
xhr.onreadystatechange=function(){
    if(xhr.readyState==4){
        if(xhr.status==200){
            sucess&&sucess(xhr.responseText);
        }
    }
}
  360313196401120095
}*/
 function ajax(data){
     if(!data.method){
         data.method='get';
     }
     if(!data.url){
         data.url=window.location;
     }
     if(!data.data){
         data.data=' ';
     }
     var xhr=null;
     try{
         xhr=new XMLHttpRequest();
         }catch(e){
             xhr=new ActiveXObject('MicrosoftXMLHTTP');
     }
     if(data.method=='get'&&data.data){
         data.url+='?'+data.data;
         xhr.open(data.method,data.url,true);
         xhr.send();
     }
     if(data.method=='post'&&data.data){
         xhr.open(data.method,data.url,true);
         xhr.setRequestHeader('aplication/x-www-form-urlencoded');
         xhr.send(data.data);
     }
     xhr.onreadystatechange=function(){
         if(xhr.readyState==4){
             if(xhr.status==200){
             data.sucess&&data.sucess(xhr.responseText);
             }
         }
     }
 }
