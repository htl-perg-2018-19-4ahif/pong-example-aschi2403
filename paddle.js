/**************************************************************************
  Demo for controlling the paddle with cursor keys and touch

  NOTE: This code has not been optimized for size or speed. It was written
        with ease of understanding in mind.
**************************************************************************/
/* export function move(paddle) {
 };
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
window.addEventListener('load', function () { return __awaiter(_this, void 0, void 0, function () {
    /** Helper function that starts movement when keydown happens */
    function startMoving(paddle) {
        // Move paddle every 4ms
        interval = setInterval(function () { return movePaddle(currentPaddlePosition + direction, paddle); }, 4);
    }
    /** Helper function that stops movement when keyup happens */
    function stopMoving() {
        clearInterval(interval);
        interval = direction = undefined;
    }
    /**
     * Helper function that moves the paddle to a given position
     * @param targetPosition Target position. No movement is done if target position is invalid
     */
    function movePaddle(targetPosition, paddle) {
        if (targetPosition >= 0 && (targetPosition + paddleHeight) <= document.documentElement.clientHeight) {
            currentPaddlePosition = targetPosition;
            // Note the 'px' at the end of the coordinates for CSS. Don't
            // forget it. Without the 'px', it doesn't work.
            paddle.style.setProperty('top', currentPaddlePosition + "px");
            console.log(window.playerName);
            window.mysocket.emit('ArrowKey', $('.paddleLeft').position().top, window.playerName);
        }
    }
    var paddle, paddleHeight, paddleHalfHeight, currentPaddlePosition, speed, interval, direction, hammertime;
    return __generator(this, function (_a) {
        paddle = document.getElementsByClassName('paddleLeft')[0];
        paddleHeight = paddle.clientHeight;
        paddleHalfHeight = paddleHeight / 2;
        currentPaddlePosition = paddle.clientTop;
        speed = 1;
        // Listen to keydown event
        document.addEventListener('keydown', function (event) {
            // We have to check whether a movement is already in progress. This is
            // necessary because keydown events arrive often when key is
            // continuously pressed.
            if (!interval) {
                switch (event.code) {
                    case 'ArrowDown':
                        direction = speed;
                        startMoving(paddle);
                        break;
                    case 'ArrowUp':
                        direction = speed * -1;
                        startMoving(paddle);
                        break;
                }
            }
        });
        // Listen to keyup event
        document.addEventListener('keyup', function (event) {
            switch (event.code) {
                case 'ArrowDown':
                case 'ArrowUp':
                    stopMoving();
                    break;
            }
        });
        hammertime = new Hammer(paddle);
        hammertime.get('pan').set({ direction: Hammer.DIRECTION_DOWN | Hammer.DIRECTION_UP });
        hammertime.on('pan', function (ev) {
            // Put center of paddle to the center of the user's finger
            return movePaddle(ev.center.y - paddleHalfHeight, paddle);
        });
        return [2 /*return*/];
    });
}); });
