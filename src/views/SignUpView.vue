<template>

<form class="row g-3" id="signup">
  <p>회원 가입 신청</p>
 <div class="mb-3 row">
    <label for="inputId" class="col-sm-2 col-form-label">ID *</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="inputID">
    </div>
     <span id="idCheck" class="form-text">
      * 사용 가능한 아이디 입니다.
    </span>
  </div>

     <div class="mb-3 row">
    <label for="inputPass" class="col-sm-2 col-form-label">비밀번호</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPass">
    </div>
  </div>
   <div class="mb-3 row">
    <label for="inputPass" class="col-sm-2 col-form-label">비밀번호 확인</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassCheck">
    </div>
    <span id="passCheck" class="form-text">
      * 비밀 번호가 틀렸습니다.
    </span>
  </div>
     <div class="mb-3 row">
    <label for="inputName" class="col-sm-2 col-form-label">이름</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="inputName">
    </div>
  </div>
     <div class="mb-3 row">
    <label for="inputEmail" class="col-sm-2 col-form-label">E-Mail</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="inputEmail">
    </div>
  </div>

   <div class="mb-3 row">
    <label for="inputPhoneNumber" class="col-sm-2 col-form-label">전화번호</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" id="inputPhoneNumber">
    </div>
  </div>

     <div class="mb-3 row">
    <label for="inputAddress" class="col-sm-2 col-form-label">주소</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="inputAddress">
    </div>
  </div>

  <div class="col-12">
    <div class="form-check">
      <input type="checkbox" id="gridCheck">
      <label class="form-check-label" for="gridCheck">
        약관에 동의 하며 가입을 신청 합니다.
      </label>
    </div>
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">가입하기</button>
  </div>
</form>
</template>

<style>
      #signup {
        width: 800px;
        margin: auto;
      }
      label {
        text-align: left;
      }
      #idCheck {
        color: red;
        text-align: left;
        margin-left: 130px;
      }
      #passCheck {
        color: red;
        text-align: left;
        margin-left: 130px;
      }
 </style>