
//↓ 口座番号の取り扱いのためのヒント 
let accountId;
let token;
let amount;
let url;

$(function(){
    $(".menuItem").on("click", function(){
        switchingShowContent(this);
        console.log(this.getAttribute('id'));
        if(this.getAttribute('id') == 'checkBalance'){
            let xhr = new XMLHttpRequest();
            xhr.open('GET','http://localhost:8888/atm/public/balanceReference/'+accountId);
            xhr.responseType = 'json';
            xhr.setRequestHeader('Content-type','application/json');
            xhr.setRequestHeader('X-CSRF-Token', token);
            xhr.onload = function(){
                let span1 = document.querySelector('#checkBalanceErea span');
                span1.textContent = this.response.deposit_balance;
                console.log(this.response);
            }
            xhr.send();
        }
    })

    $("#accountOpning").on("click", function(){
        $("#accountOpningErea").addClass("none");
        $("#accountMenu").removeClass("none");
        
        let xhr = new XMLHttpRequest();
        xhr.open('GET','http://localhost:8888/atm/public/create/');
        xhr.send();
        xhr.onload = function(){

            console.log($(this.response));
            console.log($(this.response)[0]);
            token = $(this.response)[0].value ;
            console.log(this.response.value);
            xhr.open("POST", "http://localhost:8888/atm/public/accountOpening");
            xhr.responseType = 'json';
            xhr.setRequestHeader('Content-type','application/json');
            xhr.setRequestHeader('X-CSRF-Token', token);
            xhr.send();
            xhr.onload = function(){
                //console.log(this.response);
                accountId = this.response.id;
            }
        }
    })
});
// メニューを選択した時の画面表示の切り替え
// 引数はクリックされたDOM自身が入ってくるのを想定しておく
function switchingShowContent(targetElement)
{
    classInit();
    // id名を自身から取得して、removeClassする対象を決定する
    var idName = $(targetElement).attr("id");
    $("#" + idName + "Erea").removeClass("none");
}

// classがあるので、それを利用して一括でcss反映
function classInit(){
    $(".content").addClass("none");
}



    $(".btn-primary").on("click",function(){
        if(this.textContent == '預け入れ'){
            url = 'http://localhost:8888/atm/public/depositMoney/';
            amount = document.querySelector("#depositErea input").value;
        }
        if(this.textContent == '引き出し'){
            url = 'http://localhost:8888/atm/public/withdrawal/';
            amount = document.querySelector("#withdrawalErea input").value;
        }
        if(amount<0){
            alert("0円以上で入力してください");
            return;
        }
        //console.log(amount);
        let xhr = new XMLHttpRequest();
        let send_amount = JSON.stringify({
            amount:amount
        });
        xhr.open("POST",url+accountId,true);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-type','application/json');
        xhr.setRequestHeader('X-CSRF-Token', token);
        xhr.onload = function(){
            document.querySelector("#depositErea input").value = "";
            document.querySelector("#withdrawalErea input").value = "";
        }
        xhr.send(send_amount);
    })
