<template>
<form class="row g-3" id="login">
  <h2>Login</h2>
   <div class="mb-3 row">
    <label for="inputID" class="col-sm-2 col-form-label">ID</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" id="inputID">
    </div>
  </div>

     <div class="mb-3 row">
    <label for="inputPass" class="col-sm-2 col-form-label">비밀번호</label>
    <div class="col-sm-10">
      <input type="passWord" class="form-control" id="inputPass">
    </div>
  </div>

  <div class="col-12">
    <button type="submit" class="btn btn-primary">로그인</button>
  </div>

</form>
</template>

<style>
      #login {
        width: 600px;
        margin: auto;
      }
</style>