new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Suicide Year",
          artist: "Weedmane",
          cover: "https://raw.githubusercontent.com/R1SH4BH81/music.player/master/img/7.jpg",
          source: "https://raw.githubusercontent.com/R1SH4BH81/music.player/master/mp3/7.mp3",
          url: "https://youtu.be/WHj7WPeooCo",
          favorited: false
        },
        {
          name: "Burn Out",
          artist: "Martin Garrix",
          cover: "https://raw.githubusercontent.com/R1SH4BH81/music.player/master/img/2.jpg",
          source: "https://raw.githubusercontent.com/R1SH4BH81/music.player/master/mp3/2.mp3",
          url: "https://youtu.be/DylzGXE_ibU",
          favorited: false
        },
        {
          name: "Right Night Feeling",
          artist: "Atthar",
          cover: "https://raw.githubusercontent.com/R1SH4BH81/music.player/master/img/3.jpg",
          source: "https://raw.githubusercontent.com/R1SH4BH81/music.player/master/mp3/10.mp3",
          url: "https://youtu.be/P8uqtTOXoYE",
          favorited: false
        },
        {
          name: "Blow your Mind",
          artist: "Dua Lipa",
          cover: "https://raw.githubusercontent.com/R1SH4BH81/music.player/master/img/4.jpg",
          source: "https://raw.githubusercontent.com/R1SH4BH81/music.player/master/mp3/11.mp3",
          url: "https://youtu.be/1nydxbGhgv8",
          favorited: false
        },
        {
          name: "Scared To Be Lonenly",
          artist: "Martin Garrix , Dua Lipa",
          cover: "https://raw.githubusercontent.com/R1SH4BH81/music.player/master/img/5.jpg",
          source: "https://raw.githubusercontent.com/R1SH4BH81/music.player/master/mp3/5.mp3",
          url: "https://youtu.be/e2vBLd5Egnk",
          favorited: false
        },
        {
          name: "Rain Over Me",
          artist: "Pitbull , Marc Anthony",
          cover: "https://raw.githubusercontent.com/R1SH4BH81/music.player/master/img/6.jpg",
          source: "https://raw.githubusercontent.com/R1SH4BH81/music.player/master/mp3/6.mp3",
          url: "https://youtu.be/SmM0653YvXU",
          favorited: false
        },
        {
          name: "Mekanın Sahibi",
          artist: "Norm Ender",
          cover: "https://raw.githubusercontent.com/R1SH4BH81/music.player/master/img/13.jpg",
          source: "https://raw.githubusercontent.com/R1SH4BH81/music.player/master/mp3/1.mp3",
          url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
          favorited: false
        },
        {
          name: "Party Monster",
          artist: "Weeknd",
          cover: "https://raw.githubusercontent.com/R1SH4BH81/music.player/master/img/8.jpg",
          source: "https://raw.githubusercontent.com/R1SH4BH81/music.player/master/mp3/8.mp3",
          url: "https://youtu.be/diW6jXhLE0E",
          favorited: false
        },
        {
          name: "To U",
          artist: "Shrillex & Diplo",
          cover: "https://raw.githubusercontent.com/R1SH4BH81/music.player/master/img/9.jpg",
          source: "https://raw.githubusercontent.com/R1SH4BH81/music.player/master/mp3/9.mp3",
          url: "https://youtu.be/EqCLSqwRevc",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
