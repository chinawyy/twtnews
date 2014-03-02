<?php
     
    //加载新闻的模块
    load_model('news.func');
    
     //获取搜索的参数，并且进行优化
     $key = $_POST['key'];
     $key = base_nulltest($key);

     
     //基于模块中函数，获取相应的搜索结果
     $onenews = news_searchkey($key);
     
     //sizeof()判断出新闻的数目
     $onenews['number'] = sizeof($onenews);
     //将获取的数据以json的格式输出
     $changeresult = json_encode($onenews);
    
     echo $changeresult;
     exit;
?>