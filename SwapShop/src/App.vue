<template>
  <div id="logo">
    <img src="png/main_logo.png">
  </div>
  <div>
    <div class="login_but">
      <a href="sign_up.html">STARTED</a>

    </div>
    <div class="login_but">ALREADY HAVE AN ACCOUNT</div>
  </div>
  <div>
    <p id="social_text">Or login with social account</p>
  </div>
  <div class="social_container">
    <div class="social_box">KAKAO</div>
    <div class="social_box">GOOGLE</div>
  </div>
</template>

<style>
body {
  width: 390px;
  height: 844px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

#logo {
  margin-top: 217px;
}

#logo img {
  width: 344px;
  height: 193px;
}

.login_but {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 282px;
  height: 50px;
  border-radius: 50px;
  margin-top: 106px;
  border: 2px solid;
  background-color: #6CB7F8;
  color: white;
  font-size: 14px;
}

.login_but:last-child {
  background-color: white;
  color: #6CB7F8;
  margin-top: 15px;
}

#social_text {
  margin-top: 56px;
  color: #ADAAAA;
  font-size: 14px;
}

.social_container {
  display: flex;
  margin-top: 24px;
  justify-content: center;
  align-items: center;

}

.social_box {
  display: flex;
  width: 138px;
  height: 50px;
  border: 1px solid #6CB7F8;
  border-radius: 50px;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  color: #6CB7F8;
  margin: 0 6px;
}
</style>
