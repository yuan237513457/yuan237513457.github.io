
var personArr = [
    {name: '王港', src: './images/3.png', des: '颈椎不好', sex: 'm', age: 18}, 
    {name: '刘莹', src: './images/5.png',des: '我是谁', sex: 'f', age: 23}, 
    {name: '王秀莹', src: './images/4.png', des: '我很好看', sex: 'f', age: 25}, 
    {name: '刘金雷', src: './images/1.png', des: '你没有见过陌生的脸', sex: 'm', age: 15}, 
    {name: '刘飞翔', src: './images/2.png', des: '瓜皮刘', sex: 'm', age: 20}
];

    var oUl = document.getElementsByClassName('lie')[0];
    var oInput = document.getElementsByTagName('input')[0];
    var filterText = '';
    var filterSex = 'a';
    
    //渲染
    function renderPage(data){
        var htmlStr = '';
        oUl.innerHTML = '';
        data.forEach(function(ele,index,self){
            htmlStr += '<li><img src="' + ele.src + '"><p class="name">' + ele.name + '</p><p class="dis">' + ele.des + '</p></li>'
        });
        oUl.innerHTML = htmlStr;
    }
    renderPage(personArr);


    // 输入行为  

// filter folder 处理行为 

oInput.oninput = debounce(function () {
//     var filterText = this.value;
//     //根据过滤条件 过滤之后的数组
//    var newArr = filterArrByText(personArr,filterText);
//    renderPage(newArr);

    //根据过滤条件 过滤之后的数组
    filterText = this.value;
  var newArr =  filterArrByText(personArr,filterText);
  var newArr2 =  filterArrBySex(newArr,filterSex);
   renderPage(newArr2);
},500)

function filterArrByText(data,text){
    if(!text){
        return data;
    }else{
        return data.filter(function(ele,index){
            // 王港 王 存在 != -1
            return ele.name.indexOf(text) != -1;
        });
    }
}
    // 按钮

    var oBtn = [].slice.call(document.getElementsByClassName('btn'),0);
    var lastActiveBtn = oBtn[2];
    oBtn.forEach(function(ele,index,self){
        ele.onclick = function(){
            changeActive(this);     
            filterSex = this.getAttribute('sex');
           var newArr = filterArrBySex(personArr,filterSex);
          var newArr2 = filterArrByText(newArr,filterText);
           renderPage(newArr2);
        }
    })
    function changeActive(curActiveBtn){
        curActiveBtn.className = 'btn active';
        lastActiveBtn.className = 'btn';
        lastActiveBtn = curActiveBtn;
    }
    
    // sex
function filterArrBySex (data, sex) {
    if (sex == 'a') {
        return data;
    }else {
        return data.filter(function (ele, index, self) {
            return ele.sex == sex;
        })
    }
}

