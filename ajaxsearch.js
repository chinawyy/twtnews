//搜索功能处理
function showHint(str){
   if(str==""||str==null){
        var tempsearchresult = document.getElementById("searchresult");
        tempsearchresult.style.display="none";
   }
   else{
      $.ajax({
        url:'./?c=ajaxsearch',
        type:'post',
        data: "key="+str,  //这是传递参数的方式
        dataType:'json',
        success:searchresulthandle, //对应正确情况下处理的函数
      });
   }
   
}


//鼠标离开输入框的操作
function hideresult(str){
    if(str==""){
        $("#searchresult").hide(0);
    }
}


//搜索结果的处理
function searchresulthandle(json){

    var datanum = json.number; //json传递获取的搜索结果的数目
    var startstr="";

    //判断如果没有找到数据
    if(datanum==0){
         startstr = "<strong>没有找到你需要的信息，请再次输入</strong>";
    }
    else{
      //默认显示8条
      //如果搜索结果超过8条
        var shownum = datanum>8?8:datanum;
        for(var j=0;j<shownum;j++){
          //新闻内容的ajax,标题，编号，时间
          var str_tilte = ""+json[j].subject;
          var str_addat = ""+json[j].addat;
          var str_newscome = ""+json[j].newscome;
          var newsurl = "./?c=default&a=pernews&id="+json[j].index;
          startstr +="<a href='"+newsurl+"'>"+str_tilte+"</a>("+str_addat+")(来自"+str_newscome+")<br>";
        }
        if(datanum>8){
        }
    }

    //结果输出到结果区域中，同时设置相对位置
    var tempdiv = document.getElementById("searchresult");
    var tempsearchbox = document.getElementById("navSearchInput");
    var resultx = tempsearchbox.getBoundingClientRect().left;
    resultx += 5;
    tempdiv.style.left = resultx+"px"; 
    tempdiv.innerHTML= startstr;
    tempdiv.style.display = "block"; //block为显示的意思
    $("#searchresult").show(2000);//设为不操作，2秒内显示出来
}


//写的替换代码，将那些无用的都去掉
function deletehtml(content){ 
        content = content.replace(/<p> <\/p>/gi,"")
        content = content.replace(/<p><\/p>/gi,"<p>")
        content = content.replace(/<div><\/\1>/gi,"")
        content = content.replace(/<p>/,"<br>")
        content = content.replace(/(<(meta|iframe|frame|span|tbody|layer)[^>]*>|<\/(iframe|frame|meta|span|tbody|layer)>)/gi, "");
        content = content.replace(/<\\?\?xml[^>]*>/gi, "") ;
        content = content.replace(/o:/gi, "");
        content = content.replace(/ /gi, " ");
        if(Dvbbs_bTextMode!=1){
           content = content.replace(/<img([^>]*) (src\s*=\s*([^\s|>])*)([^>]*)>/gi,"<img $2>");
        }
       return content;
}


//清理多余HTML代码
function Dvbbs_cleanHtml(content)
{
        content = content.replace(/<p> <\/p>/gi,"")
        content = content.replace(/<p><\/p>/gi,"<p>")
        content = content.replace(/<div><\/\1>/gi,"")
        content = content.replace(/<p>/,"<br>")
        content = content.replace(/(<(meta|iframe|frame|span|tbody|layer)[^>]*>|<\/(iframe|frame|meta|span|tbody|layer)>)/gi, "");
        content = content.replace(/<\\?\?xml[^>]*>/gi, "") ;
        content = content.replace(/o:/gi, "");
        content = content.replace(/ /gi, " ");
       
        if(Dvbbs_bTextMode!=1){
             content = content.replace(/<img([^>]*) (src\s*=\s*([^\s|>])*)([^>]*)>/gi,"<img $2>");
        }
        return content;
}


