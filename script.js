/** MODAL */
var modal = document.getElementById("myModal");
var btn = document.getElementById("openModal");
var span = document.getElementsByClassName("close")[0];

// Khi người dùng nhấn vào thiệp (icon), mở modal
btn.onclick = function() {
    modal.style.display = "block";
    playSong();
}

// Khi người dùng nhấn vào dấu "×", đóng modal
span.onclick = function() {
    modal.style.display = "none";
}

// Khi người dùng nhấn ra ngoài modal, đóng modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/** MUSIC */
const musicContainer = document.getElementById("musicContainer");
const playBtn = document.getElementById("play");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

function loadSong(src) {
    audio.src = src || "https://www.bensound.com/bensound-music/bensound-sunny.mp3";
}

// Play song
function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");

    audio.play();
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");

    audio.pause();
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Lắng nghe sự kiện
playBtn.addEventListener("click", () => {
    // Kiểm tra xem musicContainer có chứa class "play" hay không?
    const isPlaying = musicContainer.classList.contains("play");

    // Nếu có thì thực hiện pause
    // Nếu không thì thực hiện play
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Chuyển đổi màu hex sang RGB
function hexToRgb(hex) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, 0.5)`; // Giảm độ trong suốt
}

function initStyle() {
    document.getElementById('progressTitle').innerText = 'Dương Hồng Hiếu';
    document.getElementById('titleHeader').innerText = 'Chúc mừng ngày Quốc tế phụ nữ 8/3';
    document.getElementById('contentHeader').innerText = '🌸 Gửi bà kính yêu: Bà ơi, con chúc bà luôn khỏe mạnh, sống lâu trăm tuổi để bên cạnh con cháu. Bà là người đã truyền cho con bao bài học quý giá, con luôn yêu thương và kính trọng bà thật nhiều!🌹 Gửi mẹ yêu dấu: Mẹ là người tuyệt vời nhất trong cuộc đời con. Con chúc mẹ luôn vui vẻ, mạnh khỏe và mãi hạnh phúc bên gia đình. Cảm ơn mẹ đã hy sinh và yêu thương con vô điều kiện! Con yêu mẹ nhiều lắm!💐 Gửi cô kính yêu: Con chúc cô luôn xinh đẹp, hạnh phúc và thành công trong công việc cũng như cuộc sống. Cảm ơn cô đã luôn yêu thương, dạy dỗ và dành tình cảm đặc biệt cho con. Chúc cô một ngày 8/3 thật nhiều niềm vui!🌸 Gửi dì thân thương: Dì ơi, con chúc dì luôn khỏe mạnh, vui vẻ và hạnh phúc bên gia đình. Dì lúc nào cũng quan tâm, lo lắng cho con như một người mẹ thứ hai. Con biết ơn và yêu thương dì rất nhiều! Chúc dì có một ngày 8/3 thật rạng rỡ!🌹 Gửi bác đáng kính: Con chúc bác luôn vui vẻ, mạnh khỏe và thật nhiều may mắn trong cuộc sống. Cảm ơn bác đã luôn quan tâm và dành cho con những tình cảm ấm áp như người thân ruột thịt. Chúc bác một ngày 8/3 tràn đầy yêu thương và hạnh phúc!Cảm ơn tất cả vì những yêu thương, những hy sinh thầm lặng và những điều tốt đẹp mà mọi người đã dành cho con. Chúc tất cả những người phụ nữ yêu quý của con luôn hạnh phúc, bình an và có thật nhiều niềm vui trong cuộc sống! ❤️. Con yêu mọi người rất nhiều!Chúc mừng ngày Quốc tế Phụ nữ 8/3! 💐💖';
    loadSong();
}

window.onload = async function() {
    const headerContainer = document.getElementById('headerContainer');
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) {
        initStyle();
    }
    else {
        try {
            const response = await fetch(`https://us-central1-webai-54992.cloudfunctions.net/women_day_ai?id=${id}`);
            
            if (!response.ok) {
                throw new Error('Không tìm thấy dữ liệu cho ID này.');
            }
            
            const {data} = await response.json();
            document.getElementById('progressTitle').innerText = data?.musicName || 'Dương Hồng Hiếu';
            document.getElementById('titleHeader').innerText = data?.tieuDe || 'Chúc mừng ngày Quốc tế Phụ nữ 8/3';
            document.getElementById('contentHeader').innerText = data?.message || 'Dương';
            document.documentElement.style.setProperty('--primary-color', data?.color || '#ee5286');
            document.documentElement.style.setProperty('--secondary-color', hexToRgb(data?.color ||"#ee5286"));
            loadSong(data?.musicLink);
        } catch (error) {
            initStyle();
        }
    }
    headerContainer.style.display = 'block';   
     
};

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);