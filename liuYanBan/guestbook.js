window.onload=function(){
    /*
    验证用户名
    get
    guestbook/index.php
    m :index
    a:verifyUsername
    username：要验证的用户名

    返回
    code {返回的信息代码
    0：没错
    1：有错
    }
    message：具体的返回信息
     */
    var oUsername1=document.getElementById('username1');
    var oVerifyUserNameMsg=document.getElementById('verifyUserNameMsg');


    oUsername1.onblur=function(){
        ajax('get','guestbook/index.php','m=index&a=verifyUserName&username='+encodeURI(this.value),function(data){
            var data=JSON.parse(data);
            oVerifyUserNameMsg.innerHTML=data.message;
            if(data.code){
                oVerifyUserNameMsg.style.color='red';
            }else{
                oVerifyUserNameMsg.style.color='green';
            }
        })
    }

    /*
     用户注册
     get
     guestbook/index.php
     m :index
     a:reg
     username：要注册用户名
     password:要注册的密码

     返回
     code {返回的信息代码
     0：没错
     1：有错
     }
     message：具体的返回信息
     */
    var oRegbtn=document.getElementById('btnReg');
    var oPd1=document.getElementById('password1');
    oRegbtn.onclick=function() {
        ajax('get', 'guestbook/index.php', 'm=index&a=reg&username=' + encodeURI(oUsername1.value) + '&password=' + oPd1.value, function (data) {

            var data = JSON.parse(data);
            alert(data.message);
        });
    }

    /*
     用户登录
     get
     guestbook/index.php
     m :index
     a:login
     username：要登录的用户名
     password:要登录的密码

     返回
     code {返回的信息代码
     0：没错
     1：有错
     }
     message：具体的返回信息
     */
    var oUsername2=document.getElementById('username2');
    var oPd2=document.getElementById('password2');
    var oLoginbtn=document.getElementById('btnLogin');
    oLoginbtn.onclick=function() {
        ajax('get', 'guestbook/index.php', 'm=index&a=login&username=' + encodeURI(oUsername2.value) + '&password=' + oPd2.value, function (data) {

            var data = JSON.parse(data);
            alert(data.message);
            if(!data.code){
                updateUser();
            }
        });
    }



    var regBlock=document.getElementById('reg');
    var loginBlock=document.getElementById('login');
    var userBlock=document.getElementById('user');
    var oSpan=userBlock.getElementsByTagName('span')[0];



    /*
     用户退出
     get
     guestbook/index.php
     m :index
     a:logout

     返回
     code {返回的信息代码
     0：没错
     1：有错
     }
     message：具体的返回信息
     */;
    var oLogOut=document.getElementById('logOut');
    oLogOut.onclick=function() {
        ajax('get', 'guestbook/index.php', 'm=index&a=logOut', function (data) {

            var data = JSON.parse(data);
            alert(data.message);
            if(!data.code){console.log(data.code);
                updateUser();
            }
        });
    }

/*
初始化留言列表
get
guestbook/index.php
m:index
a:getList
page:获取留言的页面
n:每页显示的条数
返回
code
message
    data{
        count
        n
        page
        pages
        list{
             cid:
             content:
             dateline:
             oppose:
             support:
             uid:
             username;
             message：
        }
}
 */
    var oContent=document.getElementById('content');
    var oBtnPost=document.getElementById('btnPost');
    var oList=document.getElementById('list');
var oShowMore=document.getElementById('showMore');
var n=0;
oShowMore.onclick=function(){
    n++;
    ajax('get','guestbook/index.php','m=index&a=getList&n=10&page='+n,function(data){
        var data=JSON.parse(data);
        if(!data.code){
            console.log(data);
            var data=data.data;
            for(var i=0;i<data.list.length;i++){
                addLiuYan(data.list[i]);
            }
        }else{
            oShowMore.innerHTML='没有更多的内容了。。。';
            oShowMore.style.color='grey';
        }
    })
}
    /*
     用户留言
     post
     guestbook/index.php
     m :index
     a:send
     content:

     返回
     {
     code:
     message:
         data{cid:
         content:
         dateline:
         oppose:
         support:
         uid:
         username;
         message：}
     }

     */;

    var insert=false;

    oBtnPost.onclick=function() {alert(1);
        ajax('post', 'guestbook/index.php', 'm=index&a=send&content='+encodeURI(oContent.value), function (data) {

            var data = JSON.parse(data);
            if(!data.code) {
                insert=true;
                data = data.data;
                addLiuYan(data);
            }
        });
    }




    function addLiuYan(data){
        var oDl=document.createElement('dl');
        oDl.cid=data.cid;
        oDl.innerHTML+="<dt><strong>"+data.username+"</strong> 说 :</dt> <dd>"+data.content+"</dd>";
        var oDd=document.createElement('dd');
        oDd.className='t';
        var oA1=document.createElement('a');
        oA1.href='javascript:;';
        oA1.id='support';
        var m=data.support;
        oA1.innerHTML="顶(<span>"+data.support+"</span>)";
        oA1.onclick=function(){
            m++;
            ajax('post','guestbook/index.php','m=index&a=doSupport&cid='+oDl.cid,function(){
                oA1.innerHTML="顶(<span>"+m+"</span>)";
            })
        }
        oDd.appendChild(oA1);
        var oA2=document.createElement('a');
        oA2.href='javascript:;';
        oA2.id='oppose';
        oA2.innerHTML="踩(<span>"+data.oppose+"</span>)";
        var n=data.oppose;
        oA2.onclick=function(){
            n++;
            ajax('post','guestbook/index.php','m=index&a=doOppose&cid='+oDl.cid,function(){
                oA2.innerHTML="踩(<span>"+n+"</span>)";
            })

        }
        oDd.appendChild(oA2);
        oDl.appendChild(oDd);
        if(insert&&oList.children[0]){
            oList.insertBefore(oDl,oList.children[0]);
        }else{
            oList.appendChild(oDl);
        }


    }
    updateUser();
    function updateUser(){
        var uid=getCookie('uid');
        var username=getCookie('username');
        if(uid){console.log('in');
            regBlock.style.display='none';
            loginBlock.style.display='none';
            userBlock.style.display='block';
            oSpan.innerHTML=getCookie('username');
        }else{console.log('out');
            regBlock.style.display='block';
            loginBlock.style.display='block';
            userBlock.style.display='none';
            oSpan.innerHTML='';
        }
    }
    function getCookie(key){
        var arr1=document.cookie.split('; ');
        for(var i=0;i<arr1.length;i++){
            var arr2=arr1[i].split('=');
            if(arr2[0]==key){
                return arr2[1];
            }
        }
    }

}