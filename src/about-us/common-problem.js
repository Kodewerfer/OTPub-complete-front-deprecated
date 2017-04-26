;(function(){
   var $ = require('jquery');
    $(document).ready(function() {
        $('.question1').find('span').hide(); 
        $('.question1').on('click',function(){
            var a=$(this).height();
            if(a>40){ 
                $(this).find('span').hide();                
                $(this).find('img').attr('src',require('../../images/about-us/common-problem/tri-down.png'));            
            }else{  
                $(this).find('span').show();             
                $(this).find('img').attr('src',require('../../images/about-us/common-problem/tri-up.png'));
            }            
        })
         
        $('.question2').find('span').hide(); 
        $('.question2').on('click',function(){
            var a=$(this).height();
            if(a>40){ 
                $(this).find('span').hide();                
                $(this).find('img').attr('src',require('../../images/about-us/common-problem/tri-down.png'));            
            }else{  
                $(this).find('span').show();             
                $(this).find('img').attr('src',require('../../images/about-us/common-problem/tri-up.png'));
            }            
        })





    })
    
})()