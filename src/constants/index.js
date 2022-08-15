export const PUBLIC_LAYOUT = "default";

export const MUSIC_GENRE = [
  {
    title: "Classic Hits",
    desc: "30 songs for an acoustic afternoon",
    thumb: require("@/assets/images/ImageContainer.svg"),
    genre: "classic",
    route: {
      name: "classic",
      coverImage: require("@/assets/images/TheBandTorso.svg"),
      color: "yellow",
    },
  },
  {
    title: "Chill Hits",
    desc: "30 songs to sing in the shower",
    thumb: require("@/assets/images/ImageContainerChill.svg"),
    genre: "chill",
    route: {
      name: "chill",
      coverImage: require("@/assets/images/TheBandBandPractice.svg"),
      color: "primary",
    },
  },
];
export const shuffled = (arr) => arr.sort(() => Math.random() - 0.5);
export const LIST_MUSIC = [
  {
    thumb: "https://i.ytimg.com/vi/GxldQ9eX2wo/maxresdefault.jpg",
    name: "Until I Found You",
    src: require("@/assets/music/•UNTIL I FOUND YOU x I WOULD RATHER DIE•.mp3"),
    artist: "Stephen Sanchez",
    genre: "classic",
    id: "classic1",
  },
  {
    thumb:
      "https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_topic/thumbnail_title__2_-247eb2dd4709-1619607316243-znbVMnbc.png?v=0",
    name: "Muộn Rồi Mà Sao Còn",
    src: require("@/assets/music/Muộn rồi mà sao còn.mp3"),
    artist: "Sơn Tùng M-TP",
    genre: "chill",
    id: "chill1",
  },
  {
    thumb:
      "https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/90/a7/8c/90a78cd7-a25a-2bcc-ef6b-990f81bed968/3615938742013.jpg/1200x1200bf-60.jpg",
    name: "Anh Là Ai",
    src: require("@/assets/music/Anh la ai - Phuong Ly.mp3"),
    artist: "Phương Ly",
    genre: "chill",
    id: "chill2",
  },
  {
    thumb: "https://i.scdn.co/image/ab67616d0000b27358c621ac04d82fd9338ac35c",
    name: "2AM",
    src: require("@/assets/music/2AM - JustaTee ft  BigDaddy.mp3"),
    artist: "JustaTee ft BigDaddy",
    genre: "chill",
    id: "chill3",
  },
  {
    thumb: "https://i.scdn.co/image/ab67616d0000b2739bac1f8be12fae6d17b3662a",
    name: "Bên Trái",
    src: require("@/assets/music/BenTrai-KienTrinh-6892669.mp3"),
    artist: "Kiên Trịnh",
    genre: "chill",
    id: "chill4",
  },
  {
    thumb:
      "https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/f6/01/5f/f6015fbb-5773-e593-62cf-314f6aaa07ee/cover.jpg/600x600bf-60.jpg",
    name: "Bồ Em",
    src: require("@/assets/music/BoEm-DINH-6820879.mp3"),
    artist: "Dính",
    genre: "chill",
    id: "chill5",
  },
  {
    thumb:
      "https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/48/0c/ac/480cac05-2737-6bd3-6fa9-5beaa2d8003c/190296445279.jpg/600x600bf-60.jpg",
    name: "Cháu Xin Lỗi Chú",
    src: require("@/assets/music/CHÁU XIN LỖI CHÚ - LINH THỘN X JAYBACH Ft. GIA NGHI.mp3"),
    artist: "Linh Thộn x JAYBACH Ft. Gia Nghi",
    genre: "chill",
    id: "chill6",
  },
  {
    thumb:
      "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/50/a0/13/50a01313-240e-23a0-1ca2-628714c7652c/cover.jpg/230x230bb.jpg",
    name: "Chạy Khỏi Thế Giới Này",
    src: require("@/assets/music/Chay Khoi The Gioi Nay - Da LAB_ Phuong.mp3"),
    artist: " Da LAB Ft. Phương Ly",
    genre: "chill",
    id: "chill7",
  },
  {
    thumb:
      "https://i1.sndcdn.com/artworks-7qKuF8jBODAEddlH-rJnbpw-t500x500.jpg",
    name: "QUERRY",
    src: require("@/assets/music/QUERRY - QNT x TRUNG TRẦN ft RPT MCK (Prod By RASTZ).mp3"),
    artist: "QNT x Trung Trần ft RPT MCK",
    genre: "chill",
    id: "chill8",
  },
  {
    thumb:
      "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/4/4/d/0/44d01c32b4251ffae6dd1b0f3ee3a352.jpg",
    name: "Thích Thích",
    src: require("@/assets/music/THÍCH THÍCH - PHƯƠNG LY.mp3"),
    artist: "Phương Ly",
    genre: "chill",
    id: "chill9",
  },
  {
    thumb:
      "https://kenh14cdn.com/thumb_w/660/2018/10/12/g50ea-2n-15393551173621858095924.jpeg",
    name: "Thằng Điên",
    src: require("@/assets/music/Thang Dien - JustaTee_ Phuong Ly.mp3"),
    artist: "JustaTee Ft. Phương Ly",
    genre: "chill",
    id: "chill10",
  },
];

export const WISH_LIST = {
  album: [],
  songs: [],
};
