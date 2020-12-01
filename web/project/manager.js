
window.onload = function(){
    //alert('외부 스크립트 파일에서 로드');
    
}

/*function load(){    
   alert('외부 스크립트 파일에서 로드'); 
}*/


var members = [];

// 생성자 함수 Member

function Member(id, pw, name){
    this.userid = id;
    this.userpw = pw;
    this.username = name;
}

Member.prototype.makeHtml = function(index){
    
    console.log(this.userid+' : ' + this.userpw+' : ' + this.username);
    
    var memberHtml = '';
    memberHtml += '<tr>';
    memberHtml += ' <td>'+index+'</td>';
    memberHtml += ' <td>'+this.userid+'</td>';
    memberHtml += ' <td>'+this.userpw+'</td>';
    memberHtml += ' <td>'+this.username+'</td>';
    memberHtml += ' <td><a href="javascript:editMember('+index+')">수정</a> <a href="javascript:delmember('+index+')">삭제</a></td>';
    memberHtml += '</tr>';
    
    return memberHtml;
    
}




function regmember(){
    
    // 사용자가 입력한 데이터를 확인
    // 유효성 검사
    // 사용자 정보를 저장하는 객체를 생성
    
    // 아이디
    var userid = document.querySelector('#userid');
    // 비밀번호
    var pw = document.getElementById('pw');
    // 비밀번호 확인
    var repw = document.getElementById('repw');
    // 이름
    var username = document.querySelector('#username');
    
    var check = false; // 문제 없다
    
    // 공백문자를 검사 : trim()을 이용해서 공백 제거 후 문자열 비교
    if(userid.value.trim().length<1){
        document.querySelector('#userid+div.msg').style.display='block';
        check=true;
    }
    if(pw.value.trim().length<1){
        document.querySelector('#pw+div.msg').style.display='block';
        check=true;
    }    
    if(repw.value.trim().length<1 || pw.value!=repw.value){
        document.querySelector('#repw+div.msg').style.display='block';
        check=true;
    }
    if(username.value.trim().length<1){
        document.querySelector('#username+div.msg').style.display='block';
        check=true;
    }
    
    
    /*userid.onfocus = function(){
        document.querySelector('#userid+div.msg').style.display='none';
    }*/
    
    userid.addEventListener('focus',function(){
        document.querySelector('#userid+div.msg').style.display='none';
        userid.value='';
    });
    
    pw.addEventListener('focus',function(){
        document.querySelector('#pw+div.msg').style.display='none';
        pw.value='';
    });
    
    repw.addEventListener('focus',function(){
        document.querySelector('#repw+div.msg').style.display='none';
        repw.value='';
    });
    
    username.addEventListener('focus',function(){
        document.querySelector('#username+div.msg').style.display='none';
        username.value='';
    });
    
    console.log(check);
    
    if(check){
        return false;
    }
    
    
    /*var member = {
        memberid: userid.value,
        pw: pw.value,
        membername: username.value
    };*/
    
    var member = new Member(userid.value, pw.value, username.value);
    
    //console.log('member', member);
    member.makeHtml()
    
    // 배열에 회원 정보를 저장
    members.push(member);
    
    console.log('members', members);
    
    // 리스트 갱신
    setlist();
    
    
    
    return false;
}


// 리스테이블의 정렬
function setlist(){
    
    // table tbody 캐스팅
    var listrow = document.querySelector('#listrow');
    
    var tbody = '<tr>';
    tbody += '<th>순번(index)</th>';
    tbody += '<th>아이디</th>';
    tbody += '<th>비밀번호</th>';
    tbody += '<th>이름</th>';
    tbody += '<th>관리</th>';
    tbody += '</tr>';
    
    for(var i=0; i<members.length; i++){
        tbody += members[i].makeHtml(i) ;
    }
    
    listrow.innerHTML=tbody;
}


// 배열의 데이터를 삭제
function delmember(index){
    
    var delChk = confirm('삭제하시겠습니까?');
    
    if(delChk){
        
        // 삭제 -> 배열에서 요소를 삭제
        members.splice(index, 1);
        
        alert('삭제되었습니다.');
        
        // 배열의 변경된 내용으로 리스트 출력
        setlist();
        
    }
    
}

function editMember(index){
    console.log(members[index]);
    
    // 수정 화면 캐스팅
    var editDiv = document.querySelector('div.edit_div');
    editDiv.style.display='block';
    
    // form 안에 있는 input 캐스팅
    // id    
    var eid = document.querySelector('#editid');
    // name
    var ename = document.querySelector('#editname');
    // pw
    var epw = document.querySelector('#editpw');
    // repw
    var erepw = document.querySelector('#editrepw');
    // index
    var idx = document.querySelector('#index');
    
    idx.value= index;
    eid.value= members[index].userid;
    ename.value= members[index].username;
    epw.value= members[index].userpw;
    erepw.value= members[index].userpw;
    
}

function editMemberData(){
    
    // index
    // id
    // pw
    // repw
    // name
        
    // members[index] -> pw, name 수정
    
    // 회원 리스트 갱신
    
    
}


function editMemberClose(){
    // 수정 화면 캐스팅
    var editDiv = document.querySelector('div.edit_div');
    editDiv.style.display='none';
}



