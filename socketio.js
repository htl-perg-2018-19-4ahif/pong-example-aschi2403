$(function () {
    var $window = $(window);
    var $usernameInput = $('.usernameInput');
    var $loginPage = $('.login.page');
    var $startPage = $('.start.page');
    var $pongPage = $('.pong.gameboard');
    var $startButton = $('.button');
    var $startTitle = $('.starttitle');
    var $playerName = $('.playername');
    var $won = $('.won');
    var $lost = $('.lost');
    var $gameRounds = $('.gameRounds');
    var $gameOverPage = $('.gameover');
    var $victoryPage = $('.victory');
    var $return = $('.return');
    var ballRevert = 1;
    var leftpaddle = $('.paddleLeft').offset().left;
    $startPage.hide();
    $pongPage.hide();
    $gameOverPage.hide();
    $victoryPage.hide();
    var player;
    // Establish connection with socket.io server. Note that this just works
    // because `<script src="/socket.io/socket.io.js"></script>` is in index.html
    var socket = io();
    window.mysocket = socket;
    var keys = document.getElementById('keys');
    var ball = document.getElementById('ball');
    $window.keydown(function (event) {
        if (event.which === 13 && !player) {
            setPlayer();
        }
    });
    $startButton.click(function () {
        socket.emit('start game', document.documentElement.clientHeight, document.documentElement.clientWidth, $('#ball').outerHeight(true), $('#ball').outerWidth(true), $('.paddleLeft').width(), $('.paddleLeft').height(), leftpaddle, $gameRounds.val());
    });
    $return.click(function () {
        $victoryPage.hide();
        $gameOverPage.hide();
        $startPage.show();
    });
    function setPlayer() {
        player = { name: $usernameInput.val().toString().trim(), score: 0, won: 0, lost: 0 };
        if (player.name) {
            window.playerName = player.name;
            socket.emit('login', player);
        }
    }
    // Listeners --------------------------------------------------------
    socket.on('login success', function (code) {
        if (code == 2) {
            ballRevert = -1;
        }
        $loginPage.hide();
        $playerName.text(player.name.toString());
        $startPage.show();
    });
    socket.on('game started', function () {
        $startPage.hide();
        $pongPage.show();
    });
    socket.on('ArrowKey', function (code) {
        $('.paddleRight')[0].style.top = code + "px";
    });
    socket.on('ball', function (x, y) {
        $('#ball')[0].style.top = y + "px";
        if (-1 === ballRevert) {
            $('#ball')[0].style.right = x + "px";
        }
        else {
            $('#ball')[0].style.left = x + "px";
        }
    });
    socket.on('leftPoint', function (code) {
        if (-1 === ballRevert) {
            $('#pointsLeft').text(code);
        }
        else {
            $('#pointsRight').text(code);
        }
    });
    socket.on('rightPoint', function (code) {
        if (-1 === ballRevert) {
            $('#pointsRight').text(code);
        }
        else {
            $('#pointsLeft').text(code);
        }
    });
    socket.on('gameover', function (val) {
        var players = val;
        $pongPage.hide();
        if (players[0].name === player.name) {
            if (players[0].score > players[1].score) {
                $victoryPage.show();
                player.won++;
                $won.text(player.won);
            }
            else {
                $gameOverPage.show();
                player.lost++;
                $lost.text(player.lost);
            }
        }
        else {
            if (players[1].score > players[0].score) {
                $victoryPage.show();
                player.won++;
                $won.text(player.won);
            }
            else {
                $gameOverPage.show();
                player.lost++;
                $lost.text(player.lost);
            }
        }
        player.score = 0;
    });
});
