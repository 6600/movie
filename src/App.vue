<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<style lang="scss">
.zz {
    position: absolute;
    top: 3%;
    left: 3%;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    width: 94%;
    height: 94%;
    z-index: 999;
}
.focus {
  transform: scale(1.13);
  border: 1px solid #00bd55 !important;
  border-radius: 10px;
}

.tnl {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tnl::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}
.typer::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}
.active {
  // color: #fff !important;
  // background: linear-gradient(140deg, #FE9D3E, #FF4330) !important;
  // padding: 7px 15px;
  // border-radius: 40px;
  // border: none !important;
}

.accs {
  outline: 4px solid #ef4604b5 !important;
  border-radius: 10px !important;
  transform: scale(1.13); 
  z-index: 999;
  // box-shadow:0px 20px 15px 0px rgb(0 0 0 / 13%), -1px 1px 20px 19px rgb(0 0 0 / 40%), 0 50px 35px -40px rgb(243 2 2 / 20%)
}

body {
  margin: 0;
  min-height: 100vh;
  // background: url("./assets/background.png") no-repeat center;
  background-position: 0 0;
  background-size: cover;
  ;
}

p {
  margin-block-start: 0em;
  margin-block-end: 0em;
}

.el-row {
  margin: 0 !important;
  font-family: 'sc';
}

#app {
  font-family: 'sc';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14pt;
}
html, body {
  overflow: hidden;
}
.accs p {
  background-color: rgba(255, 255, 255, 0.9) !important;
  color: black !important;
  border-radius: 10px !important;
  font-weight: bold;
}

.accs p.introducemy {
  background-color: transparent !important;
  color: white !important;
  font-weight: normal !important;
}

.accs p.introduce:after {
  content: '';
  width: 45px;
  background-image: url(https://cunchu.site/work/script/%E8%A7%86%E9%A2%91%E6%93%8D%E4%BD%9C%E6%8E%A7%E5%88%B6/play.png);
  background-size: 45px 45px;
  height: 45px;
  bottom: 16px;
  right: 3px;
  position: absolute;
}

.accs p span {
  color: black !important;
  font-weight: bold;
}

.accs {
  transform: scale(1.13) !important;
}

span.accs {
  background-color: #ff9a57 !important;
  color: white !important;
  outline-color: #ff9a57 !important;
}
</style>
