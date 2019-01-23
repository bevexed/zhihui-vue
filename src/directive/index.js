import Vue from 'vue'

Vue.directive('anchor', {
  inserted: function (el, binding) {
    el.onclick = function () {
      clearInterval(T1)
      let top = document.querySelector('#anchor-' + binding.value).offsetTop;
      let scroll = document.documentElement.scrollTop;
      let T1 = setInterval(() => {
        if (top > scroll) {
          scrollToBottom()
        }
        if (scroll < top) {
          scrollToTop()
        }
      }, 10);

      function scrollToTop() {
        scroll -= (top - scroll) / 20
        document.documentElement.scrollTop = scroll;
        console.log(top);
        console.log(scroll);
        if (scroll <= top - 100) {
          document.documentElement.scrollTop = top
          clearInterval(T1)
        }
      }

      function scrollToBottom() {
        scroll += (top - scroll) / 20
        document.documentElement.scrollTop = scroll;
        console.log(top);
        console.log(scroll);
        if (scroll >= top - 100) {
          document.documentElement.scrollTop = top
          clearInterval(T1)
        }

      }
    }
  }
});
