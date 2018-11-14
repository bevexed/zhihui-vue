<template>
  <div class="list-container">
    <dl class="list" id="J-feedback-list">
      <dd class="dd-padding">
        <div class="feedbackCard">

          <div class="user-wrapper">
            <div class="user-pic">
              <div class="imgbox" style="background: none;">
                <img src="//p1.meituan.net/122.74/mmc/e663563d638f3f2c56274e28ac949a143761.png" style="height: 100%;">
              </div>
            </div>
            <div class="user-info-text">
              <div class="userInfo">
                <span class="username">lRW726618042</span>
              </div>
              <div class="score">
                <span class="stars">
                  <i class="text-icon icon-star"></i>
                  <i class="text-icon icon-star"></i>
                  <i class="text-icon icon-star"></i>
                  <i class="text-icon icon-star"></i>
                  <i class="text-icon icon-star"></i>
                </span>
                <span class="time">2018-11-10</span>
              </div>
            </div>
          </div>
          <div class="comment">
            <div class="toggleContent">
              <p>
                来杭州第一次吃的自助餐，很惊喜，居然有烤的大鸡翅膀还有牛排，生蚝和大虾很新鲜，肉类也很棒棒，强烈推荐生蚝，新鲜又好吃，还有冰淇淋球！！！冰淇凌球！！！冰淇凌球！
                <i class="text-icon icon-ell"></i>
                <span class="feedbackmore">
                ！！重要的事情说三遍！！！白色的香草牛奶味，巨好吃巨好吃巨好吃，emmm……我一个人也就吃了四五碗吧，大桶的底子都被我掏干净了(⁎⁍̴̛ᴗ⁍̴̛⁎)牛排也好吃～黑椒酱很棒棒，还有那个梅子肉还是啥的，甜甜的也好吃～还会再来的哈哈哈哈，对了，咖啡味道很浓很良心 #生鱼片# #巧克力冰淇淋# #牛排# #羊肉卷# #咖啡#
                </span>
              </p>
            </div>
          </div>
          <div class="pics">
            <span class="pic-container imgbox" style="background: none;">
              <img src="//p0.meituan.net/60.0/shaitu/8fc4d00d28e91efb41b30cf128f899631304546.jpg" style="width: 100%;">
            </span>
            <span class="pic-container imgbox" style="background: none;">
              <img src="//p0.meituan.net/60.0/shaitu/60f333b51400a0e072846df10692d0be2188537.jpg" style="height: 100%;">
            </span>
            <span class="pic-container imgbox" style="background: none;">
              <img src="//p0.meituan.net/60.0/shaitu/2ac6288d3f66749be64d1340fa7f4ff32074505.jpg" style="height: 100%;">
            </span>
            <span class="pic-container imgbox" style="background: none;">
              <img src="//p0.meituan.net/60.0/shaitu/c6911e4f62eb894dbc198aac780bb40f2245428.jpg" style="width: 100%;">
            </span>
            <span class="pic-container imgbox" style="background: none;">
              <img src="//p0.meituan.net/60.0/shaitu/bba9b31b64b086bd60c5c293e0170eb72308239.jpg" style="width: 100%;">
            </span>
          </div>
          <div>
            <a href="//i.meituan.com/poi/98800120" style="color:#666;font-size: .16rem">高温派对·海鲜烤肉火锅自助</a>
          </div>
          <div class="block-reply">
            <div class="block-reply-head">商家回复：
              <span class="reply-time">2018-11-12</span>
            </div>
            <p>亲爱的顾客您好，首先感谢您选择我们餐厅用餐，再次感谢您的评价，期待您的再次光临，祝您生活愉快.</p>
          </div>
        </div>
      </dd>
    </dl>
    <div class="loading hide">
      <div class="loading-spin"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "evaluation"
  }
</script>

<style scoped>
  .block-reply {
    color: #666;
    margin-top: .1rem;
    background-color: #F7F7F6;
    padding: .1rem;
    position: relative;
    border-radius: .06rem;
  }
  .block-reply-head {
    border-bottom: 1px solid #E0DDD7;
    font-size: .14rem;
    padding-bottom: .1rem;
  }
  .block-reply .reply-time {
    float: right;
    color: #999;
  }
  .block-reply p {
    margin-top: .1rem;
    font-size: .16rem;
    color: #ED852C;
  }
  p, h6 {
    line-height: 1.41;
    text-align: justify;
    margin: -.2em 0;
    word-break: break-all;
    font-size: .16rem;
  }
  .imgbox img {
    max-height: .5rem;
  }

  .list-container {
    position: relative;
  }

  dl.list:first-child {
    margin: 0;
    border-top: 0;
  }

  dl.list .dd-padding, dl.list dt, dl.list dd > .react {
    padding: .14rem .1rem;
  }

  dl.list dt, dl.list dd {
    margin: 0;
    border-bottom: 1px solid #DDD8CE;
    overflow: hidden;
    font-size: inherit;
    font-weight: 400;
    position: relative;
  }

  .feedbackCard .user-wrapper {
    position: relative;
  }

  .feedbackCard .user-pic {
    position: absolute;
    width: .37rem;
    height: .37rem;
    vertical-align: top;
  }

  .feedbackCard .user-info-text {
    margin-left: .8rem;
    font-size: .12rem;
    color: #999;
    vertical-align: top;
    height: .54rem;
    overflow: hidden;
  }

  .feedbackCard .userInfo {
    margin-bottom: .06rem;
    font-size: .12rem;
  }

  .text-icon.icon-star:after {
    content: '★';
  }

  .feedbackCard .score {
    margin-bottom: .2rem;
    font-size: .12rem;
  }

  .feedbackCard .stars {
    font-size: .14rem;
    margin-right: .2rem;
    vertical-align: bottom;
  }

  .stars {
    display: inline-block;
    color: #f90;
  }

  .stars i {
    margin-right: .1em;
    vertical-align: 0rem;
  }

  .text-icon {
    font-family: base_icon;
    display: inline-block;
    vertical-align: middle;
    font-style: normal;
  }

  .feedbackCard .time {
    color: #999;
  }

  .feedbackCard .serious-evaluation {
    position: absolute;
    width: .5rem;
    height: .5rem;
    top: -.09rem;
    right: .12rem;
  }

  .feedbackCard .comment {
    margin-top: .15rem;
  }

  .feedbackCard .comment {
    margin-bottom: .11rem;
    font-size: .15rem;
  }

  .text-icon {
    font-family: base_icon;
    display: inline-block;
    vertical-align: middle;
    font-style: normal;
  }

  .icon-ell:after {
    content: "...";
    display: inline;
  }

  .icon-toggle-arrow:after {
    content: '';
    display: inline-block;
    position: relative;
    top: -.2em;
    width: .5em;
    height: .5em;
    border-bottom: .015rem solid #C3C5C9;
    border-left: .015rem solid #C3C5C9;
    -webkit-transform: rotateZ(-45deg);
    -moz-transform: rotateZ(-45deg);
    -ms-transform: rotateZ(-45deg);
  }

  .icon-toggle-arrow {
    position: relative;
  }

  .feedbackCard .pics {
    margin-bottom: .13rem;
  }

  .feedbackCard .pics .pic-container {
    display: inline-block;
    width: .55rem;
    height: .55rem;
    margin-bottom: .14rem;
    overflow: hidden;
    text-align: center;
    vertical-align: top;
  }


</style>
