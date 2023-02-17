<template>
  <div class="contain home">
    <!-- <navbar :userinfo="userInfo" /> -->
    <!-- xs小 xl大 -->
    <el-row :gutter="10">
      <el-col :xs="24" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
        <div class="typeNavBar">
          <!-- <div class="tnr" @click="gosearch" id="1">
            <el-input placeholder="搜索" prefix-icon="el-icon-search" readonly>
            </el-input>
          </div> -->
          <div class="tnl" id="tnl">
            <span :class="{ active: index == 1 }" @click="changeIndex(1)" id="2">筛选</span>
            <span :class="{ active: index == 0 }" @click="changeIndex(0)" id="1">搜索</span>
            <span :class="{ active: index == 2 }" @click="changeIndex(2)" id="3">我的</span>
            <span :class="{ active: index == 3 }" @click="changeIndex(3)" id="4">推荐</span>
            <span :class="{ active: index == 4 }" @click="changeIndex(4)" id="5">专辑</span>
            <span :class="{ active: index == 5 }" @click="changeIndex(5)" id="6">电视剧</span>
            <span :class="{ active: index == 6 }" @click="changeIndex(6)" id="7">电影</span>
            <span :class="{ active: index == 7 }" @click="changeIndex(7)" id="8">综艺</span>
            <span :class="{ active: index == 8 }" @click="changeIndex(8)" id="9">动漫</span>
            <span :class="{ active: index == 9 }" @click="index = 9" id="10">纪录片</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 我的 -->
    <el-row :gutter="10">
      <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
        <transition name="el-fade-in-linear">
          <div class="retui" v-if="index == 2">
            <div class="user">
              <div class="useri" v-if="userInfo.username">
                <div class="ut">
                  <el-image style="width: 180px; height: 180px;border-radius: 50%;" fit="cover"
                    :src="userInfo.headUrl"></el-image>
                </div>
                <div class="um">{{ userInfo.username }}</div>
                <div class="dlan" style="display:inline-block" @click="goquit" id="111">
                  退出登录
                </div>
              </div>
              <div class="useri" v-else>
                <div class="ut">
                  <el-image style="width: 180px; height: 180px;border-radius: 50%;" fit="cover"
                    :src="require('../assets/avatarr.png')"></el-image>
                </div>
                <div class="um">未登录</div>
                <div class="dlan" style="display:inline-block" @click="gologin" id="111">
                  登录
                </div>
              </div>
              <div class="userb">
              </div>
            </div>
            <div class="htpt">
              <p class="htptt">历史记录</p>
              <div class="nmovieList" style="min-height:274px">
                <div class="nmovie" v-for="(item, index) in history" v-if="history.length > 0 && index < 5"
                  :id="12 + Number(index)" @click="goDetail(item)">
                  <el-image :src="item.videoCover" fit="cover">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <p class="introduce">
                    <span class="i1">{{ item.videoName }}</span>
                  </p>
                </div>
                <div class="nmovie mymovie" @click="gohis(0)" :id="12 + history.length">
                  <div>
                    <el-image :src="require('../assets/myhis.png')" mode="contain">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                    <p class="introducemy">
                      历史记录
                    </p>
                  </div>
                </div>
              </div>
              <p class="htptt">我的收藏</p>
              <div class="nmovieList" style="min-height:274px">
                <div class="nmovie" v-for="(item, index) in collectList" :id="13 + history.length + Number(index)"
                  v-if="collectList.length > 0 && index < 5" @click="goDetail(item)">
                  <el-image :src="item.cover" mode="contain">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <p class="introduce">
                    <span class="i1">{{ item.name }}</span>
                  </p>
                </div>
                <div class="nmovie mymovie mymovie2" @click="gohis(1)" :id="13 + history.length + collectList.length">
                  <div>
                    <el-image :src="require('../assets/mysc.png')" mode="contain">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                    <p class="introducemy">
                      更多收藏
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </el-col>
    </el-row>
    <!-- 推荐 -->
    <el-row :gutter="10">
      <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
        <transition name="el-fade-in-linear">
          <div class="retui" v-if="index == 3">
            <div class="hotput">
              <div class="history">
                <div class="hist" id="11" v-if="token != undefined && token != ''" @click="goDetail(history[0])">
                  <el-image v-if="history.length > 0" style="width: 100%;height: 100%;" :src="history[0].videoCover"
                    fit="cover">
                    <div slot="placeholder" class="image-slot">
                      <el-image :src="require('../assets/his.png')"></el-image>
                    </div>
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <div class="introduce4" v-if="history.length == 0"></div>
                  <p class="introduce">上次观看·<span v-if="history.length > 0">{{ history[0].videoName }}</span></p>
                </div>
                <div class="hist" v-else>
                  <div class="introduce4">
                    <div>
                      <span style="text-align:left">上次观看</span>
                      <span>·</span>
                      <span>未登录</span>
                    </div>
                    <div>
                      <span class="indl" id="111" @click="gologin">登陆</span>
                    </div>
                  </div>
                </div>
                <div class="hitlist" id="112">
                  <p>更多历史</p>
                  <p style="border-top:1px solid rgb(228,227,227)" v-for="(item, index) in history" :id="11 + index"
                    v-if="index != 0 && index < 5" @click="goDetail(item)">{{ item.videoName }}</p>
                </div>
                <!-- <div class="hisbg" v-if="history.length == 0">
                  <i class="el-icon-time"></i>
                </div> -->
              </div>
              <div class="swiper" id="113">
                <el-carousel indicator-position="none" arrow="never" ref="carousel" @change="changeItem"
                  direction="vertical">
                  <el-carousel-item v-for="item in topList.rotationList" :label="item.name">
                    <el-image :src="item.cover" mode="contain" fit="cover">
                      <div slot="placeholder" class="image-slot">
                        <el-image :src="require('../assets/his.png')"></el-image>
                      </div>
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="swiperbox">
                <div class="swiperr" :id="11 + history.length + index" @mouseover="swiperChange(index)"
                  @click="swiperClick(item)" v-for="(item, index) in topList.rotationList">
                  <div class="swiperrbox" :class="{ 'activesswiper': actives == index }">
                    <p class="swiperrt">{{ item.name }}</p>
                    <p class="swiperrp">{{ item.remark }}</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- 列表 -->
            <div class="movieList">
              <div class="movieList">
                <!-- <div class="movie moviefirst" @click="goMore" id="16">
                  <p class="mft">更多推荐</p>
                  <p class="mfst">推荐遇见更多优秀动漫</p>
                </div> -->
                <div class="movie" v-for="(item, index) in topList.frList"
                  :id="11 + history.length + topList.rotationList.length + index" @click="goDetails(item)">
                  <el-image v-if="item.cover != ''" :src="item.cover" mode="contain">
                    <div slot="placeholder" class="image-slot">
                      <el-image :src="require('../assets/his.png')"></el-image>
                    </div>
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <el-image v-else :src="require('../assets/his.png')" mode="none"></el-image>
                  <p class="introduce">
                    <span class="i1">{{ item.name }}</span>
                  </p>
                </div>
              </div>
            </div>
            <!-- 热门推荐 -->
            <div class="htpt">
              <p class="htptt">热门推荐</p>
              <div class="hotputBox">
                <div class="hotputBox-list" v-for="(item, index) in topList.hotList"
                  :id="11 + history.length + topList.frList.length + topList.rotationList.length + index"
                  @click="goDetails(item)">
                  <el-image :src="item.cover">
                    <div slot="placeholder" class="image-slot">
                      <el-image :src="require('../assets/his.png')"></el-image>
                    </div>
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <p>{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </el-col>
    </el-row>
    <!-- 专辑 -->
    <el-row :gutter="10">
      <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
        <transition name="el-fade-in-linear">
          <div class="guoman" v-if="index == 4">
            <div class="zjtop">
              <div class="topb" style="height:50vh" @click="goAlbum(item)" :id="11 + index"
                v-for="(item, index) in albumList.fsList" :key="item.albumId">
                <el-image :src="item.albumCover" fit="cover">
                  <div slot="placeholder" class="image-slot">
                    <el-image :src="require('../assets/his.png')"></el-image>
                  </div>
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <p>{{ item.albumName }}</p>
              </div>
            </div>
            <div class="nmovieList">
              <div class="nmovie nmovie2" v-for="(item, index) in albumList.scList" @click="goAlbum(item)"
                style="margin: 10px 0 ;height:36vh" :id="11 + albumList.fsList.length + index">
                <el-image :src="item.albumCover" fit="none">
                  <div slot="placeholder" class="image-slot">
                    <el-image :src="require('../assets/his.png')"></el-image>
                  </div>
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <p class="introduce2">
                  <span class="i1">{{ item.albumName }}</span>
                </p>
                </p>
              </div>
            </div>
            <!-- 列表 -->
            <!-- <div class="movieList">
              <div class="movie" v-for="(item, index) in albumList.scList" style="margin: 10px 0 ;height:26vh"
                @click="goAlbum(item)" :id="11 + albumList.fsList.length + index">
                <el-image :src="item.albumCover" mode="contain">
                  <div slot="placeholder" class="image-slot">
                    <el-image :src="require('../assets/his.png')"></el-image>
                  </div>
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
            </div> -->
          </div>
        </transition>

      </el-col>
    </el-row>
    <!-- 电视剧 -->
    <el-row :gutter="10">
      <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
        <transition name="el-fade-in-linear">
          <div class="guoman" v-if="index == 5">
            <!-- 列表 -->
            <div class="tvtop">
              <div class="tvtopbox" @click="goDetail(item)" v-for="(item, index) in dataList.frList" :id="11 + index">
                <el-image :src="item.videoCove" fit="none">
                  <div slot="placeholder" class="image-slot">
                    <el-image :src="require('../assets/his.png')"></el-image>
                  </div>
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <p class="introduce"><span style="color:#fff">{{ item.videoName }}</span>
                </p>
              </div>
            </div>
            <div class="nmovieList">
              <div class="nmovie h33" v-for="(item, index) in dataList.seList" @click="goDetail(item)"
                :id="11 + dataList.frList.length + index">
                <el-image :src="item.videoCove" fit="none">
                  <div slot="placeholder" class="image-slot">
                    <el-image :src="require('../assets/his.png')"></el-image>
                  </div>
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <p class="introduce"><span style="color:#fff">{{ item.videoName }}</span>
                </p>
              </div>
            </div>
            <div class="typeList">
              <p v-for="(item, index) in dataList.videoTypeList" @click="goAll('电视剧', item.typeId)"
                :id="11 + dataList.frList.length + dataList.seList.length + index">{{ item.typeName }}</p>
            </div>
            <div class="htpt">
              <p class="htptt">最新推荐</p>
              <div class="nmovieList">
                <div class="nmovie" v-for="(item, index) in dataList.hotList" @click="goDetail(item)"
                  :id="11 + dataList.frList.length + dataList.seList.length + dataList.videoTypeList.length + index">
                  <el-image :src="item.videoCove" fit="none">
                    <div slot="placeholder" class="image-slot">
                      <el-image :src="require('../assets/his.png')"></el-image>
                    </div>
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <p class="introduce"><span style="color:#fff">{{ item.videoName }}</span>
                  </p>
                </div>
              </div>
              <p class="htptt">高分推荐</p>
              <div class="nmovieList">
                <div class="nmovie" v-for="(item, index) in dataList.highScoreList" @click="goDetail(item)"
                  :id="11 + dataList.frList.length + dataList.seList.length + dataList.videoTypeList.length + dataList.hotList.length + index">
                  <el-image :src="item.videoCove" fit="none">
                    <div slot="placeholder" class="image-slot">
                      <el-image :src="require('../assets/his.png')"></el-image>
                    </div>
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <p class="introduce"><span style="color:#fff">{{ item.videoName }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </transition>

      </el-col>
    </el-row>
    <!-- 电影 -->
    <el-row :gutter="10">
      <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
        <transition name="el-fade-in-linear">
          <div class="guoman" v-if="index == 6">
            <div class="tvtop">
              <div class="tvtopbox" @click="goDetail(item)" v-for="(item, index) in dataList.frList" :id="11 + index">
                <el-image :src="item.videoCove">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <p class="introduce"><span style="color:#fff">{{ item.videoName }}</span>
                </p>
              </div>
            </div>
            <div class="nmovieList">
              <div class="nmovie h33" v-for="(item, index) in dataList.seList" @click="goDetail(item)"
                :id="11 + dataList.frList.length + index">
                <el-image :src="item.videoCove" fit="none">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <p class="introduce"><span style="color:#fff">{{ item.videoName }}</span>
                </p>
              </div>
            </div>
            <div class="typeList">
              <p v-for="(item, index) in dataList.videoTypeList" @click="goAll('电影', item.typeId)"
                :id="11 + dataList.frList.length + dataList.seList.length + index">{{ item.typeName }}</p>
            </div>
            <div class="htpt">
              <p class="htptt">最新推荐</p>
              <div class="nmovieList">
                <div class="nmovie" v-for="(item, index) in dataList.hotList" @click="goDetail(item)"
                  :id="11 + dataList.frList.length + dataList.seList.length + dataList.videoTypeList.length + index">
                  <el-image :src="item.videoCove" fit="none">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <p class="introduce"><span style="color:#fff">{{ item.videoName }}</span>
                  </p>
                </div>
              </div>
              <p>高分推荐</p>
              <div class="nmovieList">
                <div class="nmovie" v-for="(item, index) in dataList.highScoreList" @click="goDetail(item)"
                  :id="11 + dataList.frList.length + dataList.seList.length + dataList.videoTypeList.length + dataList.hotList.length + index">
                  <el-image :src="item.videoCove" fit="none">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <p class="introduce"><span style="color:#fff">{{ item.videoName }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </el-col>
    </el-row>
    <!-- 综艺 -->
    <el-row :gutter="10">
      <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
        <transition name="el-fade-in-linear">
          <div class="guoman" v-if="index == 7">
            <div class="tvtop">
              <div class="tvtopbox" @click="goDetail(item)" v-for="(item, index) in dataList.frList" :id="11 + index">
                <el-image :src="item.videoCove">
                  <div slot="placeholder" class="image-slot">
                    <el-image :src="require('../assets/his.png')"></el-image>
                  </div>
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <p class="introduce"><span style="color:#fff">{{ item.videoName }}</span>
                </p>
              </div>
            </div>
            <div class="nmovieList">
              <div class="nmovie h33" v-for="(item, index) in dataList.seList" @click="goDetail(item)"
                :id="11 + dataList.frList.length + index">
                <el-image :src="item.videoCove" fit="none">
                  <div slot="placeholder" class="image-slot">
                    <el-image :src="require('../assets/his.png')"></el-image>
                  </div>
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <p class="introduce"><span style="color:#fff">{{ item.videoName }}</span>
                </p>
              </div>
            </div>
            <div class="typeList">
              <p v-for="(item, index) in dataList.videoTypeList" @click="goAll('综艺', item.typeId)"
                :id="11 + dataList.frList.length + dataList.seList.length + index">{{ item.typeName }}</p>
            </div>
            <div class="htpt">
              <p class="htptt">最新推荐</p>
              <div class="nmovieList">
                <div class="nmovie" v-for="(item, index) in dataList.hotList" @click="goDetail(item)"
                  :id="11 + dataList.frList.length + dataList.seList.length + dataList.videoTypeList.length + index">
                  <el-image :src="item.videoCove" fit="none">
                    <div slot="placeholder" class="image-slot">
                      <el-image :src="require('../assets/his.png')"></el-image>
                    </div>
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <p class="introduce"><span style="color:#fff">{{ item.videoName }}</span>
                  </p>
                </div>
              </div>
              <p class="htptt">高分推荐</p>
              <div class="nmovieList">
                <div class="nmovie" v-for="(item, index) in dataList.highScoreList" @click="goDetail(item)"
                  :id="11 + dataList.frList.length + dataList.seList.length + dataList.videoTypeList.length + dataList.hotList.length + index">
                  <el-image :src="item.videoCove" fit="none">
                    <div slot="placeholder" class="image-slot">
                      <el-image :src="require('../assets/his.png')"></el-image>
                    </div>
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <p class="introduce"><span style="color:#fff">{{ item.videoName }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </el-col>
    </el-row>
    <!-- 动漫 -->
    <el-row :gutter="10">
      <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
        <transition name="el-fade-in-linear">
          <div class="guoman" v-if="index == 8">
            <div class="tvtop">
              <div class="tvtopbox" @click="goDetail(item)" v-for="(item, index) in dataList.frList" :id="11 + index">
                <el-image :src="item.videoCove">
                  <div slot="placeholder" class="image-slot">
                    <el-image :src="require('../assets/his.png')"></el-image>
                  </div>
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <p class="introduce"><span style="color:#fff">{{ item.videoName }}</span>
                </p>
              </div>
            </div>
            <div class="nmovieList">
              <div class="nmovie h33" v-for="(item, index) in dataList.seList" @click="goDetail(item)"
                :id="11 + dataList.frList.length + index">
                <el-image :src="item.videoCove" fit="none">
                  <div slot="placeholder" class="image-slot">
                    <el-image :src="require('../assets/his.png')"></el-image>
                  </div>
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <p class="introduce"><span style="color:#fff">{{ item.videoName }}</span>
                </p>
              </div>
            </div>
            <div class="typeList">
              <p v-for="(item, index) in dataList.videoTypeList" @click="goAll('动漫', item.typeId)"
                :id="11 + dataList.frList.length + dataList.seList.length + index">{{ item.typeName }}</p>
            </div>
            <div class="htpt">
              <p class="htptt">最新推荐</p>
              <div class="nmovieList">
                <div class="nmovie" v-for="(item, index) in dataList.hotList" @click="goDetail(item)"
                  :id="11 + dataList.frList.length + dataList.seList.length + dataList.videoTypeList.length + index">
                  <el-image :src="item.videoCove" fit="none">
                    <div slot="placeholder" class="image-slot">
                      <el-image :src="require('../assets/his.png')"></el-image>
                    </div>
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <p class="introduce"><span style="color:#fff">{{ item.videoName }}</span>
                  </p>
                </div>
              </div>
              <p class="htptt">高分推荐</p>
              <div class="nmovieList">
                <div class="nmovie" v-for="(item, index) in dataList.highScoreList" @click="goDetail(item)"
                  :id="11 + dataList.frList.length + dataList.seList.length + dataList.videoTypeList.length + dataList.hotList.length + index">
                  <el-image :src="item.videoCove" fit="none">
                    <div slot="placeholder" class="image-slot">
                      <el-image :src="require('../assets/his.png')"></el-image>
                    </div>
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <p class="introduce"><span style="color:#fff">{{ item.videoName }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </el-col>
    </el-row>
    <!-- 纪录片 -->
    <el-row :gutter="10">
      <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
        <transition name="el-fade-in-linear">
          <div class="guoman" v-if="index == 9">
            <div class="tvtop">
              <div class="tvtopbox" @click="goDetail(item)" v-for="(item, index) in dataList.frList" :id="11 + index">
                <el-image :src="item.videoCove">
                  <div slot="placeholder" class="image-slot">
                    <el-image :src="require('../assets/his.png')"></el-image>
                  </div>
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <p class="introduce"><span style="color:#fff">{{ item.videoName }}</span>
                </p>
              </div>
            </div>
            <div class="nmovieList">
              <div class="nmovie h33" v-for="(item, index) in dataList.seList" @click="goDetail(item)"
                :id="11 + dataList.frList.length + index">
                <el-image :src="item.videoCove" fit="none">
                  <div slot="placeholder" class="image-slot">
                    <el-image :src="require('../assets/his.png')"></el-image>
                  </div>
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <p class="introduce"><span style="color:#fff">{{ item.videoName }}</span>
                </p>
              </div>
            </div>
            <div class="typeList">
              <p v-for="(item, index) in dataList.videoTypeList" @click="goAll('纪录片', item.typeId)"
                :id="11 + dataList.frList.length + dataList.seList.length + index">{{ item.typeName }}</p>
            </div>
            <div class="htpt">
              <p class="htptt">最新推荐</p>
              <div class="nmovieList">
                <div class="nmovie" v-for="(item, index) in dataList.hotList" @click="goDetail(item)"
                  :id="11 + dataList.frList.length + dataList.seList.length + dataList.videoTypeList.length + index">
                  <el-image :src="item.videoCove" fit="none">
                    <div slot="placeholder" class="image-slot">
                      <el-image :src="require('../assets/his.png')"></el-image>
                    </div>
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <p class="introduce"><span style="color:#fff">{{ item.videoName }}</span>
                  </p>
                </div>
              </div>
              <p class="htptt">高分推荐</p>
              <div class="nmovieList">
                <div class="nmovie" v-for="(item, index) in dataList.highScoreList" @click="goDetail(item)"
                  :id="11 + dataList.frList.length + dataList.seList.length + dataList.videoTypeList.length + dataList.hotList.length + index">
                  <el-image :src="item.videoCove" fit="none">
                    <div slot="placeholder" class="image-slot">
                      <el-image :src="require('../assets/his.png')"></el-image>
                    </div>
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <p class="introduce"><span style="color:#fff">{{ item.videoName }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </el-col>
    </el-row>
    <!-- <audio controls="controls" hidden :src="require('../assets/music/point.mp3')" ref="ado"></audio> -->
  </div>
</template>

<script>
import navbar from "@/views/components/navbar";
import Cookies from "js-cookie";
export default {
  components: {
    navbar,
  },
  data() {
    return {
      actives: 0,
      topList: [],
      search: "",
      index: 3,
      width: "",
      height: "",
      tv: [],
      film: [],
      variety: [],
      comic: [],
      userInfo: {},
      kd: 4,
      history: [],
      albumList: [],
      dataList: [],
      collectList: [],
      token: '',
    };
  },

  activated() {
    this.getinfo();
    this.getUserInfo();
    this.getvisit()
    this.gethistory()
    this.token = Cookies.get('token')
  },
  mounted() {
    window.activeItem=this
    this.token = Cookies.get('token')
    this.getinfo();
    this.getUserInfo();
    this.getvisit()
    this.gethistory()
    this.height = document.body.clientHeight
    this.width = document.body.clientWidth
    let _this = this;
    if (this.$route.query.album) {
      _this.changeIndex(this.$route.query.album)
    }
    let d = Cookies.get('randomId')
    if (d == undefined) {
      Cookies.set('randomId', this.GetsingleId())
    }

    document.onkeyup = function (event) {
      if (_this.$route.name == 'home') {
        if (event.keyCode == 37) {
          _this.moveLeft();
          _this.up()
        } else if (event.keyCode == 38) {
          _this.moveUp();
          _this.up()
        } else if (event.keyCode == 39) {
          _this.moveRight();
          _this.down()
        } else if (event.keyCode == 8) {
          _this.$router.go(-1);
        } else if (event.keyCode == 40) {
          _this.moveDown();
          _this.down()
        } else if (event.keyCode == 13) {
          _this.activeClick();
        }
      }
    };
    this.c = document.getElementById(this.kd);
    this.c.classList.add("accs");
  },
  methods: {
    gohis(val) {
      this.$router.push({ path: '/user', query: { id: val } })
    },
    up() {
      var el = document.getElementById(this.kd);
      const viewPortHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      const offsetTop = el.offsetTop;
      const scrollTop = document.documentElement.scrollTop;
      const top = offsetTop - scrollTop;
      const intop = el.offsetHeight;
      let d = top >= 0;
      if (d == false) {
        document.documentElement.scrollTop = document.getElementById(
          this.kd
        ).offsetTop - intop;
      }
    },
    down() {
      var el = document.getElementById(this.kd);
      const viewPortHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      const offsetTop = el.offsetTop;
      const scrollTop = document.documentElement.scrollTop;
      const top = offsetTop - scrollTop;
      const intop = el.offsetHeight;
      let d = top + intop <= viewPortHeight;
      if (d == false) {
        document.documentElement.scrollTop = document.getElementById(
          this.kd
        ).offsetTop;
      }
    },
    getList(val) {
      this.$http.get(`recommend/other?categoryName=${val}`).then(res => {
        this.dataList = res.data.data
        this.$forceUpdate()
        this.dataList.videoTypeList.unshift({ typeId: "", typeName: "全部" })
      })
    },
    getcoll() {
      this.$http.get('collect/video/page?page=1&limit=5').then(res => {
        if (res.data.code == 0) {
          this.collectList = res.data.data.list
        }
      })
    },
    goAlbum(val) {
      this.$router.push({ path: '/album', query: { id: val.albumId, fm: val.albumTopCover, name: val.albumName } })
    },
    getzj() {
      this.$http.get('video/album/getList').then(res => {
        this.albumList = res.data.data
      })
    },
    gethistory() {
      this.$http.get('browse/records/page?page=1&limit=5').then(res => {
        if (res.data.code == 0) {
          this.history = res.data.data.list
        } else if (res.data.code == 10021) {
          this.$store.commit("setUserinfo", {});
          this.$store.commit("setToken", "");
          Cookies.remove("userid");
          Cookies.remove("membership");
          Cookies.remove("username");
          Cookies.remove("token");
        }
      })
    },
    activeClick() {
      document.getElementById(this.kd).click();
      return;
    },
    goDetail(val) {
      this.$router.push({ path: "/details", query: { id: val.videoId } });
    },
    activeActive(num) {
      this.kd = num
      if (document.querySelector('.accs')) {
        document.querySelector('.accs').classList.remove("accs")
      }
      setTimeout(() => {
        this.c = document.getElementById(num);
        this.c.classList.add("accs");
      }, 0);
      return;
    },
    moveLeft() {
      // this.$refs.ado.currentTime = 0
      // this.$refs.ado.play(); //播放
      var el = document.getElementById(this.kd);
      const viewPortHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      const offsetTop = el.offsetTop;
      const scrollTop = document.documentElement.scrollTop;
      const top = offsetTop - scrollTop;
      const intop = el.offsetHeight;
      let d = top + intop <= viewPortHeight;
      if (d == false) {
        document.documentElement.scrollTop = document.getElementById(
          this.kd
        ).offsetTop;
      }
      if (this.kd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
      } else if (this.kd == 113) {
        this.activeActive(111)
        return
      } else if (this.kd == 112) {
        return
      } else if (this.kd > 10 && this.kd < 15) {
        this.activeActive(113)
        return
      } else if (this.kd > 0) {
        if (this.index == 3 && this.kd == 11) {
          this.c.classList.remove("accs");
          this.kd = 4
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        this.c.classList.remove("accs");
        this.kd--;
        if (this.kd > 0 && this.kd < 11) {
          this.activeClick()
        }
        // if (this.kd == 2) {
        //   this.index = 2
        // }
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
        var el2 = document.getElementById(this.kd);
        var viewPortWidth2 = document.getElementById("tnl").clientWidth;
        var offsetLeft2 = el2.offsetLeft;
        var scrollLeft2 = document.getElementById("tnl").scrollLeft;
        var intop2 = el2.offsetWidth;
        let dd = offsetLeft2 + intop2 > scrollLeft2 && offsetLeft2 + intop2 < scrollLeft2 + viewPortWidth2;
        if (dd == false) {
          document.getElementById("tnl").scrollLeft = offsetLeft2;
        }
      }
    },
    moveRight() {
      // this.$refs.ado.currentTime = 0
      // this.$refs.ado.play(); //播放
      var el = document.getElementById(this.kd);
      const viewPortHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      const offsetTop = el.offsetTop;
      const scrollTop = document.documentElement.scrollTop;
      const top = offsetTop - scrollTop;
      const intop = el.offsetHeight;
      let d = top + intop <= viewPortHeight;
      if (d == false) {
        document.documentElement.scrollTop = document.getElementById(
          this.kd
        ).offsetTop;
      }
      if (this.kd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
      } else if (this.kd == 112) {
        
        this.activeActive(113)
        return
      } else if (this.kd == 111) {
        this.activeActive(113)
        return
      } else if (this.kd == 113) {
        this.activeActive(11)
        return
      } else if (this.kd > 0) {
        if (this.index == 3 && this.kd >= 10 + this.topList.frList.length + this.history.length + this.topList.rotationList.length + this.topList.hotList.length) {
          return
        }
        if (this.index == 4 && this.kd >= 10 + this.albumList.fsList.length + this.albumList.scList.length) {
          return
        }
        if (this.index >= 5 && this.index < 10 && this.kd >= 10 + this.dataList.frList.length + this.dataList.highScoreList.length + this.dataList.hotList.length + this.dataList.seList.length + this.dataList.videoTypeList.length) {
          return
        }
        if (this.index == 2 && this.kd >= 11 + this.history.length + 1 + this.collectList.length + 1) {
          return
        }
        if (this.index == 3 && this.kd > 10 && this.kd < 10 + this.history.length) {
          this.c.classList.remove("accs");
          this.kd = 11 + this.history.length
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        this.c.classList.remove("accs");
        this.kd++;

        if (this.kd > 2 && this.kd < 11) {
          this.activeClick()
          var el2 = document.getElementById(this.kd);
          var viewPortWidth2 = document.getElementById("tnl").clientWidth;
          var offsetLeft2 = el2.offsetLeft;
          var scrollLeft2 = document.getElementById("tnl").scrollLeft;
          var intop2 = el2.offsetWidth;
          let dd = offsetLeft2 + intop2 > scrollLeft2 && offsetLeft2 + intop2 < scrollLeft2 + viewPortWidth2 - intop2;
          if (dd == false) {
            document.getElementById("tnl").scrollLeft = offsetLeft2;
          }
        }
        // if (this.kd == 2) {
        //   this.index = 2
        // }
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      }
    },
    moveUp() {
      // this.$refs.ado.currentTime = 0
      // this.$refs.ado.play(); //播放
      if (this.index == 3) {
        if (this.kd == 11) {
          this.c.classList.remove("accs");
          this.kd = 4
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd == 15) {
          this.activeActive(112)
          return
        }
        
        if (this.history.length != 0 && this.kd < 10 + this.history.length) {
          this.c.classList.remove("accs");
          this.kd--
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        } else if (this.kd == 112) {
          this.activeActive(111)
          return
        } else if (this.kd == 16 || this.kd == 17) {
          this.activeActive(113)
          return
        } else if (this.history.length != 0 && this.kd == 11 + this.history.length) {
          this.c.classList.remove("accs");
          this.kd = 4
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        } else if (this.history.length != 0 && this.kd > 10 + this.history.length && this.kd <= 10 + this.history.length + this.topList.frList.length) {
          this.c.classList.remove("accs");
          this.kd--
          if (this.kd == 10 + this.history.length + 1) {
            this.swiperChange(0)
          }
          if (this.kd == 10 + this.history.length + 2) {
            this.swiperChange(1)
          }
          if (this.kd == 10 + this.history.length + 3) {
            this.swiperChange(2)
          }
          if (this.kd == 10 + this.history.length + 4) {
            this.swiperChange(3)
          }
          if (this.kd == 10 + this.history.length) {
            this.kd = 4
          }
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        } else if (this.history.length != 0 && this.kd == 11 + this.history.length + this.topList.frList.length) {
          this.c.classList.remove("accs");
          this.kd = 10 + this.history.length;
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        } else if (this.history.length != 0 && this.kd == 11 + this.history.length + this.topList.frList.length + this.topList.rotationList.length) {
          this.c.classList.remove("accs");
          this.kd = 11 + this.history.length + this.topList.frList.length;
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        } else if (this.history.length != 0 && this.kd > 10 + this.history.length + this.topList.rotationList.length + this.topList.frList.length) {
          this.c.classList.remove("accs");
          this.kd = 11 + this.topList.frList.length + this.history.length
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.history.length == 0 && this.kd <= 10 + this.topList.rotationList.length) {
          this.c.classList.remove("accs");
          this.kd--
          if (this.kd == 11) {
            this.swiperChange(0)
          }
          if (this.kd == 12) {
            this.swiperChange(1)
          }
          if (this.kd == 13) {
            this.swiperChange(2)
          }
          if (this.kd == 14) {
            this.swiperChange(3)
          }
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd > 10 + this.topList.rotationList.length && this.kd <= 10 + this.topList.rotationList.length + this.topList.frList.length) {
          this.c.classList.remove("accs");
          this.kd = 10 + this.topList.frList.length
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd > 10 + this.topList.rotationList.length + this.topList.frList.length) {
          this.c.classList.remove("accs");
          this.kd = 11 + this.topList.frList.length
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.index == 3 && this.kd >= 10 + this.topList.frList.length + this.history.length + this.topList.rotationList.length && this.kd >= 10 + this.topList.frList.length + this.history.length + this.topList.rotationList.length + this.topList.hotList.length) {
          return
        }
      }
      if (this.index == 4) {
        if (this.kd == 11 || this.kd == 12) {
          this.c.classList.remove("accs");
          this.kd = 5
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd == 13 || this.kd == 14) {
          this.c.classList.remove("accs");
          this.kd = 11
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd == 15 || this.kd == 16) {
          this.c.classList.remove("accs");
          this.kd = 12
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd > 10 + this.albumList.fsList.length && this.kd <= 10 + this.albumList.fsList.length + this.albumList.scList.length) {

          this.c.classList.remove("accs");
          if (this.kd > 10 + this.albumList.fsList.length + 4) {
            this.kd = this.kd - 4
            this.c = document.getElementById(this.kd);
            this.c.classList.add("accs");
            return
          }
          this.kd = 11
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd > 14 + this.albumList.fsList.length) {
          this.c.classList.remove("accs");
          this.kd = this.kd - 4
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
      }
      if (this.index >= 5 && this.index < 10) {
        if (this.kd > 10 && this.kd <= 10 + this.dataList.frList.length) {
          this.c.classList.remove("accs");
          this.kd = this.index + 1
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd > 10 + this.dataList.frList.length && this.kd < 10 + this.dataList.frList.length + this.dataList.seList.length) {
          this.c.classList.remove("accs");
          if (this.kd == 14 || this.kd == 15) {
            this.kd = 11
          }
          if (this.kd == 16 || this.kd == 17) {
            this.kd = 12
          }
          if (this.kd == 18 || this.kd == 19) {
            this.kd = 13
          }
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd > 10 + this.dataList.frList.length + this.dataList.seList.length &&
          this.kd <=
          10 + this.dataList.frList.length + this.dataList.seList.length + this.dataList.videoTypeList.length) {
          this.c.classList.remove("accs");
          this.kd = 11 + this.dataList.frList.length
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd > 10 + this.dataList.frList.length + this.dataList.seList.length + this.dataList.videoTypeList.length
          && this.kd <=
          10 + this.dataList.frList.length + this.dataList.seList.length + this.dataList.videoTypeList.length + this.dataList.hotList.length) {
          this.c.classList.remove("accs");
          this.kd = 11 + this.dataList.frList.length + this.dataList.seList.length
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd > 10 + this.dataList.frList.length + this.dataList.seList.length + this.dataList.videoTypeList.length + this.dataList.hotList.length) {
          this.c.classList.remove("accs");
          this.kd = 11 + this.dataList.frList.length + this.dataList.seList.length + this.dataList.videoTypeList.length
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
      }

      if (this.index == 2) {
        if (this.kd == 11) {
          this.c.classList.remove("accs");
          this.kd = 3;
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd > 11 && this.kd <= 11 + this.history.length + 1) {
          this.c.classList.remove("accs");
          this.kd = 11;
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        } else if (this.kd > 11 + this.history.length + 1) {
          this.c.classList.remove("accs");
          this.kd = 12;
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
      }
    },
    moveDown() {
      // this.$refs.ado.currentTime = 0
      // this.$refs.ado.play(); //播放
      if (this.index == 3) {
        // history.length+topList.frList.length+topList.rotationList.length
        if (this.kd == 4) {
          this.activeActive(111)
          return
        }
        if (this.kd <= 10) {
          this.c.classList.remove("accs");
          this.kd = 11
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.history.length != 0 && this.kd < 10 + this.history.length) {
          this.c.classList.remove("accs");
          this.kd++
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        } else if (this.kd == 113) {
          this.activeActive(116)
          return
        } else if (this.kd == 111) {
          this.activeActive(112)
          return
        } else if (this.kd == 112) {
          this.activeActive(15)
          return
        } else if (this.history.length != 0 && this.kd == 10 + this.history.length) {
          this.c.classList.remove("accs");
          this.kd = 11 + this.history.length + this.topList.frList.length
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        } else if (this.history.length != 0 && this.kd > 10 + this.history.length && this.kd < 10 + this.history.length + this.topList.frList.length) {
          this.c.classList.remove("accs");
          this.kd++
          if (this.kd == 10 + this.history.length + 1) {
            this.swiperChange(0)
          }
          if (this.kd == 10 + this.history.length + 2) {
            this.swiperChange(1)
          }
          if (this.kd == 10 + this.history.length + 3) {
            this.swiperChange(2)
          }
          if (this.kd == 10 + this.history.length + 4) {
            this.swiperChange(3)
          }
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        } else if (this.history.length != 0 && this.kd == 10 + this.history.length + this.topList.frList.length) {
          this.c.classList.remove("accs");
          this.kd = 11 + this.history.length + this.topList.frList.length
          // + this.topList.rotationList.length;
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.history.length == 0 && this.kd <= 10 + this.topList.frList.length) {
          this.c.classList.remove("accs");
          this.kd++
          if (this.kd == 11) {
            this.swiperChange(0)
          }
          if (this.kd == 12) {
            this.swiperChange(1)
          }
          if (this.kd == 13) {
            this.swiperChange(2)
          }
          if (this.kd == 14) {
            this.swiperChange(3)
          }
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd >= 11 + this.topList.frList.length + this.history.length) {
          this.c.classList.remove("accs");
          this.kd = 11 + this.topList.frList.length + this.history.length + this.topList.rotationList.length
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd >= 10 + this.topList.frList.length + this.history.length + this.topList.rotationList.length + this.topList.hotList.length) {
          return
        }
      }
      if (this.index == 4) {
        if (this.kd < 10) {
          this.c.classList.remove("accs");
          this.kd = 11
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd > 10 && this.kd < 12) {
          this.c.classList.remove("accs");
          this.kd = 13
          if (this.kd > 10 + this.albumList.fsList.length + this.albumList.scList.length) {
            this.kd = 10 + this.albumList.fsList.length + this.albumList.scList.length
          }
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd > 11 && this.kd < 13) {
          this.c.classList.remove("accs");
          this.kd = 15
          if (this.kd > 10 + this.albumList.fsList.length + this.albumList.scList.length) {
            this.kd = 10 + this.albumList.fsList.length + this.albumList.scList.length
          }
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd > 12) {
          this.c.classList.remove("accs");
          this.kd += 4
          if (this.kd > 10 + this.albumList.fsList.length + this.albumList.scList.length) {
            this.kd = 10 + this.albumList.fsList.length + this.albumList.scList.length
          }
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
      }
      if (this.index >= 5 && this.index < 10) {
        if (this.kd <= 10) {
          this.activeActive(11)
          return
        }
        if (this.kd > 10 && this.kd <= 10 + this.dataList.frList.length) {
          this.c.classList.remove("accs");
          if (this.kd == 11) {
            this.kd = 11 + this.dataList.frList.length
          }
          if (this.kd == 12) {
            this.kd = 13 + this.dataList.frList.length
          }
          if (this.kd == 13) {
            this.kd = 15 + this.dataList.frList.length
          }
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd > 10 + this.dataList.frList.length && this.kd <= 10 + this.dataList.frList.length + this.dataList.seList.length) {
          this.c.classList.remove("accs");
          this.kd = 11 + this.dataList.frList.length + this.dataList.seList.length
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd > 10 + this.dataList.frList.length + this.dataList.seList.length &&
          this.kd <
          10 + this.dataList.frList.length + this.dataList.seList.length + this.dataList.videoTypeList.length) {
          this.c.classList.remove("accs");
          this.kd = 11 + this.dataList.frList.length + this.dataList.seList.length + this.dataList.videoTypeList.length
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd > 10 + this.dataList.frList.length + this.dataList.seList.length + this.dataList.videoTypeList.length
          && this.kd <=
          10 + this.dataList.frList.length + this.dataList.seList.length + this.dataList.videoTypeList.length + this.dataList.hotList.length) {
          this.c.classList.remove("accs");
          this.kd = 11 + this.dataList.frList.length + this.dataList.seList.length + this.dataList.videoTypeList.length + this.dataList.hotList.length
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd > 10 + this.dataList.frList.length + this.dataList.highScoreList.length +
          this.dataList.hotList.length + this.dataList.seList.length + this.dataList.videoTypeList.length) {
          return
        }
      }
      if (this.index == 2) {
        if (this.kd <= 10) {
          this.c.classList.remove("accs");
          this.kd = 11
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd == 11) {
          this.c.classList.remove("accs");
          this.kd++;
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
        if (this.kd > 11 && this.kd < 11 + this.history.length + 1) {
          if (this.history.length > 0) {
            this.c.classList.remove("accs");
            this.kd = 13 + this.history.length;
            this.c = document.getElementById(this.kd);
            this.c.classList.add("accs");
            return
          }
          this.c.classList.remove("accs");
          this.kd = 12 + this.history.length;
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        } else if (this.kd >= 11 + this.history.length + 1) {
          this.c.classList.remove("accs");
          this.kd = 13 + this.history.length;
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return
        }
      }
    },
    gologin() {
      this.$router.push({ path: "/loginPhone" });
    },
    gosearch() {
      this.$router.push({ path: "/search" });
    },
    _S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    },

    // 获取广告请求唯一ID 方式是当前时间戳+13位随机吗
    GetsingleId() {
      var _res = (this._S4() + this._S4() + '-' + this._S4() + '-' + this._S4() + '-' + this._S4() + '-' + this._S4() + this._S4() + this._S4())
      return _res
    },
    getvisit() {
      this.$http.post('visit')
    },
    getUserInfo() {
      let c = Cookies.get("token");
      if (c != undefined) {
        this.$http.get(`/user?token=${c}`).then((res) => {
          this.userInfo = res.data.data;
        });
      }
    },
    goMore() {
      this.$router.push({ path: "/moreSuggest" });
    },
    goAll(lb, id) {
      this.$router.push({ path: "/classify", query: { lb: lb, id: id } });
    },
    getinfo() {
      this.$http.get("/recommend/homePage").then((res) => {
        this.topList = res.data.data
      });
    },
    goquit() {
      this.$store.commit("setUserinfo", {});
      this.$store.commit("setToken", "");
      Cookies.remove("userid");
      Cookies.remove("membership");
      Cookies.remove("username");
      Cookies.remove("token");
      // this.$refs.child.quit();
      // this.$router.replace("/");
      location.reload()
    },
    gosx() {
      this.index = 2;
      this.goAll()
    },
    gettv() {
      this.$http.get("/recommend/tv").then((res) => {
        this.tv = res.data.data;
      });
    },
    getfilm() {
      this.$http.get("/recommend/film").then((res) => {
        this.film = res.data.data;
      });
    },
    getvariety() {
      this.$http.get("/recommend/variety").then((res) => {
        this.variety = res.data.data;
      });
    },
    getcomic() {
      this.$http.get("/recommend/comic").then((res) => {
        this.comic = res.data.data;
      });
    },

    changeIndex(val) {
      let d = Number(val)
      this.index = d
      switch (d) {
        case 0: this.$router.push({ path: '/myPage' }); break;
        case 1: this.index = 1; break;
        // case 1: this.gosx(); break;
        // case 2: this.getcoll(); break;
        case 2: this.gomy(); break;
        case 3: break;
        // case 4: this.getzj(); break;
        case 4: this.gozj(); break;
        case 5: this.getList('电视剧'); break;
        case 6: this.getList('电影'); break;
        case 7: this.getList('综艺'); break;
        case 8: this.getList('动漫'); break;
        case 9: this.getList('纪录片'); break;
      }
    },
    gomy() {
      this.$router.push({ path: '/myPage' })
    },
    gozj() {
      this.$router.push({ path: '/albumPage' })
    },
    swiperClick(val) {
      if (val.type == 2) {
        window.location.href = val.url;
      } else {
        // this.$router.push({path:'/details',query:val})
      }
    },
    swiperChange(val) {
      this.actives = val;
      this.$refs.carousel.setActiveItem(val); // 将tab的下标指定为走马灯的下标
    },
    changeItem(e) {
      this.actives = e; // 将走马灯的 下标 指定为 tab 的下标
    },
    goDetails(val) {
      if (val.type == 2) {
        window.location.href = val.url;
      } else {
        this.$router.push({ path: "/details", query: { id: val.videoId } });
      }
      // this.$router.push({ path: "/details" });
    },
  },
};
</script>
<style lang="scss">
.home {

  .el-input--prefix .el-input__inner {
    padding-left: 43px;
  }

  .el-input__icon {
    font-size: 30px;
    line-height: 55px;
  }

  .el-input__inner {
    border-radius: 30px;
    background: #efefef;
    border: none;
    color: #303030;
    font-size: 24px;
    height: 55px;
  }

  .el-input__inner {
    border-radius: 20px;
    background: #efefef;
  }

  .el-image {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .el-carousel,
  .el-carousel__container {
    height: 100%;
  }

  .el-carousel__indicators--labels li {
    height: 66px;
    line-height: 66px;
    text-align: left;
    background: url("../assets/swbg.png") no-repeat center;
  }

  .el-carousel__indicators--labels li button {
    display: inline-block;
    background: transparent;
    font-size: 28px;
    color: #fff;
  }

  .el-carousel__indicators--vertical {
    bottom: 0%;
    top: auto;

    .el-carousel__button {
      width: auto;
      height: auto;
    }
  }
}
</style>
<style lang="scss" scoped>
.contain {
  width: 100%;
}

.el-col {
  border-radius: 4px;
}

.login {
  color: #8989ae;
  margin-top: 10px;
  background: #1d1d45;
  width: 90px;
  height: 40px;
  line-height: 40px;
  letter-spacing: 2px;
  border-radius: 20px;
  text-align: center;
  font-size: 14px;

  img {
    width: 17px;
    height: 17px;
    vertical-align: text-bottom;
    margin-right: 2px;
  }
}

.typeNavBar {
  display: flex;
  // padding: 15px 0 30px 0;
  padding: 15px 0 10px 0;

  .tnr {
    margin-right: 39px;
  }

  .tnl {
    // align-items: center;
    display: flex;
    // width: 68%;
    width: 100%;
    overflow-x: scroll;
    position: relative;
    height: 40px;
    padding: 6px 5px;
    margin-top: 2px;
  }

  .arrowdown {
    width: 28px;
    height: 28px;
  }

  span:not(:first-of-type) {
    margin-left: 21px;
  }

  span {
    padding: 0px 20px;
    text-align: center;
    cursor: pointer;
    color: #333;
    font-size: 28px;
    white-space: nowrap;
    border-radius: 40px !important;
    // padding: 0 !important;
    box-shadow: none;
  }

  img {
    width: 40px;
    height: 37px;
  }
}

.top-suggest {
  display: flex;
  flex-wrap: wrap;
  // justify-content: center;
  justify-content: space-between;
}

.max-suggest {
  position: relative;
  // width: 855px;
  width: 48%;
  // height: 494px;
  margin-left: 20px;

  img {
    height: 100%;
  }
}

.mid-suggest {
  position: relative;
  width: 24%;

  // height: 494px;
  // margin: 0 30px;
  img {
    height: 100%;
  }
}

.right-box {
  width: 23.7%;
}

.right-suggest {
  position: relative;
  // width: 24%;
  // height: 232px;
}

.right-suggest2 {
  margin-top: 30px;
}

.active {
  color: #fff !important;
  background: linear-gradient(140deg, #FE9D3E, #FF4330) !important;
  padding: 7px 15px;
  outline: none !important;
  border-radius: 40px;
  // border: none !important;
}

.movieList {
  display: flex;
  flex-wrap: wrap;
  // justify-content: center;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;

  .movie {
    position: relative;
    // height: 232px;
    width: 24.66%;
    // margin-left: 20px;
  }
}

.imgvip {
  width: 76px;
  height: 36px;
  position: absolute;
  top: 0;
  right: 0;
}

.introduce {
  position: absolute;
  bottom: 0%;

  // background: linear-gradient(0deg, rgba(#000, 0.5), rgba(#333, 0));
  // span {
  //   font-size: 12px;
  // }

  background: rgba($color: #202020, $alpha: 0.7);
  text-align: center;
  height: 4vh;
  line-height: 4vh;
  left: 0;
  width: 100%;
  border-radius: 0 0 10px 10px;

  .i1 {
    font-size: 18px;
    color: #fff;
    padding: 18pt;
  }

  .i2 {
    font-size: 24px;
    color: #fff;
  }
}

.guomanbox {
  display: flex;
  justify-content: center;
}

.moviefirst {
  background: url("../assets/sybg.png") no-repeat center;
  background-size: cover;
  border-radius: 10px;
  margin-left: 20px;

  .mft {
    color: #fff;
    font-size: 28px;
    padding: 35px 0 16px 30px;
  }

  .mfst {
    font-size: 24px;
    color: #9a96bc;
    padding: 0 30px;
  }
}

.swiperTitleBox {
  position: absolute;
  bottom: 0;
  z-index: 999;
  width: 100%;
}

.swiperTitle {
  height: 66px;
  line-height: 66px;
  text-align: left;
  background: url("../assets/swbg.png") no-repeat center;
  background-size: 100% 100%;
  font-size: 28px;
  color: #9a96bc;
  padding-left: 25px;
  cursor: pointer;
}

.activeSwiper {
  color: #fff;
}

.s1,
.s2,
.s3 {
  font-size: 40px;
  padding-right: 1%;
  vertical-align: middle;
}

.s1 {
  color: #ffde05;
}

.s2 {
  color: #33cd9c;
}

.s3 {
  color: #ffffff;
}

.ml20 {
  margin-left: 20px;
}

.spimg {
  width: 49%;

  .el-image {
    border-radius: 10px 0 0 10px;
  }
}

.spimg2 {
  width: 49%;

  .el-image {
    border-radius: 0 10px 10px 0;
  }
}

.hotput {
  display: flex;
  justify-content: space-between;

  .history {
    width: 23%;
    position: relative;
    margin-right: 2%;
    display: flex;
    flex-flow: column nowrap;

    .hisbg {
      position: absolute;
      right: 0;
      bottom: 0;

      .el-icon-time {
        color: #fff;
        font-size: 250px;
      }
    }

    .hist {
      position: relative;
      min-height: 180px;
      background: #FDE7CA;
      border-radius: 5px;
      margin-bottom: 1vh;
      height: 18vh;

      .introduce {
        bottom: 0%;
        color: #fff;
        // padding-left: 10%;
        width: 100%;
      }
    }

    .hitlist {
      flex: 1;
      font-size: 17px;
      background: #f3f3f3;
      border-radius: 5px;

      p {
        padding: 8px 13px;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //用省略号显示
        white-space: nowrap; //不换行
        font-size: 22px;
      }
    }
  }

  .swiper {

    width: 50%;
  }

  .swiperbox {
    width: 25%;
  }

  .swiperr {
    background: #f3f3f3;

    .swiperrt {
      padding: 5% 0 0 7%;
      // padding: 3% 0 0 5%;
      color: #464646;
      font-size: 24px;
    }

    .swiperrp {
      font-size: 20px;
      // padding: 0% 2% 5% 7%;
      padding: 1% 2% 3% 7%;
    }
  }
}

.swiperrbox {
  // background: #FBF0E5;
}

.activesswiper {
  background: #FBF0E5;

  .swiperrt {
    color: #FE9D3E !important;
    font-size: 15px;
  }

  .swiperrp {
    color: #FE9D3E !important;
    font-size: 12px;
  }
}

.hotputBox {
  display: flex;
  display: flex;
  flex-wrap: wrap;

  .hotputBox-list {
    position: relative;
    width: 15.58%;
    margin: 6px 0.5%;

    .el-image {
      border-radius: 10px;
    }

    p {
      position: absolute;
      bottom: 0%;
      border-radius: 0 0 10px 10px;
      left: 0;
      font-size: 1rem;
      color: #fff;
      background: rgba(32, 32, 32, 0.7);
      text-align: center;
      height: 4vh;
      line-height: 4vh;
      width: 100%;
    }
  }
}

.zjtop {
  display: flex;
  justify-content: space-between;
  position: relative;

  .topb {
    width: 49.3%;
    position: relative;

    p {
      position: absolute;
      bottom: 0%;
      height: 4vh;
      background: rgba($color: #202020, $alpha: 0.7);
      text-align: center;
      width: 98.9%;
      padding-left: 1.1%;
      color: #fff;
      line-height: 4vh;
      border-radius: 0px 0px 6px 6px;
      font-size: 20px;
    }
  }
}

.introduce2 {
  position: absolute;
  bottom: 0%;
  height: 4vh;
  background: rgba($color: #202020, $alpha: 0.7);
  text-align: center;
  width: 95%;
  color: #fff;
  padding-left: 5%;
  line-height: 4vh;
  border-radius: 0px 0px 10px 10px;
  font-size: 20px;
}

.htpt {
  .htptt {
    font-size: 32px;
    padding: 27px 0 12px 5px;
  }
}

.tvtop {
  display: flex;
  justify-content: space-between;

  .tvtopbox {
    position: relative;
    width: 32%;
    height: 36vh;
  }
}

.nmovie:not(:nth-child(6n+1)) {
  margin-left: 2%;
}

.nmovieList {
  display: flex;
  flex-wrap: wrap;
  margin-top: 17px;
  width: 100%;

  p {
    font-size: 14pt;
  }
}

.h33 {
  height: 33vh;
}

.nmovie {
  position: relative;
  // height: 232px;
  // width: 14.86%;
  width: 15%;

  .introduce {
    bottom: 0%;
  }
}

.nmovie2:not(:nth-child(4n+1)) {
  margin-left: 1% !important;
}

.nmovie2 {
  position: relative;
  // height: 232px;
  width: 24.25%;

  .introduce {
    bottom: 0%;
  }
}

.typeList p:not(:nth-child(6n+1)) {
  margin-left: 22px;
}

.typeList {
  display: flex;
  justify-content: space-between;
  margin: 23px 0 0 0;
  // font-size: 14px;
  cursor: pointer;

  p {
    font-weight: bold;
    width: 15.19%;
    padding: 20px 0;
    text-align: center;
    background: #F3F3F3;
    border-radius: 10px;
  }
}

.user {
  width: 35%;
  position: relative;

  .useri {
    position: relative;
    z-index: 10;
    text-align: center;

    .ut {
      width: 180px;
      height: 180px;
      margin: auto;
    }

    .um {
      padding: 12px 0 22px 0;
      font-size: 28px;
    }

    .dlan {
      font-size: 28px;
      padding: 6px 27px;
      margin-bottom: 21px;
      background: linear-gradient(140deg, #FE9D3E, #FF4330) !important;
      border-radius: 20px;
      width: 105px;
      height: 26px;
      color: #fff;
      line-height: 26px;
    }
  }

  .userb {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 256px;
    width: 100%;
    border-radius: 10px;
    background: #FDE7CA;
  }
}

.mymovie,
.mymovie2 {
  text-align: center;
  // width: 170px !important;
}

.introducemy {
  color: #FFFFFF;
  font-size: 15px !important;
  padding-top: 0 !important;
}

.mymovie {
  background: linear-gradient(-44deg, #4F93F9, #3E7AD1);
  border-radius: 10px;

  .el-image {
    padding-top: 50%;
    width: 60px;
    height: 60px;
  }
}

.mymovie2 {
  background: linear-gradient(-44deg, #37CC68, #199B51);
  border-radius: 10px;

  .el-image {
    width: 63px;
    height: 61px;
  }
}

.introduce4 {
  position: absolute;
  background: rgb(235, 224, 214);
  height: 4vh;
  line-height: 4vh;
  left: 0;
  border-radius: 0 0 10px 10px;
  bottom: 0%;
  color: #303030;
  padding: 0 4%;
  width: 92%;
  font-size: 20px;
  display: flex;
  justify-content: space-between;

  .indl {
    color: #e42121;
    padding: 5px 20px;
    border-radius: 20px;
    background: #fff;
  }
}

@media screen and (max-width: 1280px) {
  .introduce4 {
    font-size: 12px;
  }

  .hotput {
    .history {
      .hist {
        min-height: 90px;
        height: 9vh;
      }
    }
  }

  .hotput {
    .swiperr {
      .swiperrt {
        font-size: 1rem;
      }

      .swiperrp {
        font-size: 14px;
      }
    }
  }
}

@media screen and (min-width: 1921px) {
  .introduce4{
    font-size: 26px!important;
    height: 6vh;
    line-height: 6vh;
  }
  .hotput .swiperr .swiperrt{
    padding: 5% 0 0 7%;
    color: #464646;
    font-size: 28px;
}
.hotput .swiperr .swiperrp {
    font-size: 24px;
    padding: 1% 2% 3% 7%;
}
}
</style>