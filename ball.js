"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var server = require("./app");
var leftPaddle;
var rightPaddle;
;
var Direction;
(function (Direction) {
    Direction[Direction["top"] = 0] = "top";
    Direction[Direction["right"] = 1] = "right";
    Direction[Direction["bottom"] = 2] = "bottom";
    Direction[Direction["left"] = 3] = "left";
    Direction[Direction["leftPaddle"] = 4] = "leftPaddle";
    Direction[Direction["rightPaddle"] = 5] = "rightPaddle";
})(Direction || (Direction = {}));
;
var ballFunction = function (clientHeight, clientWidth, balHeight, ballWidth, paddleWidth, paddleHeight, paddleLeft) {
    var ballSize = { width: ballWidth, height: balHeight };
    var ballHalfSize = splitSize(ballSize, 2);
    var clientSize = { width: clientWidth, height: clientHeight };
    var clientHalfSize = splitSize(clientSize, 2);
    var leftPoint = 0;
    var rightPoint = 0;
    game();
    function reset() {
        return { x: clientHalfSize.width, y: clientHalfSize.height };
    }
    function game() {
        return __awaiter(this, void 0, void 0, function () {
            var running, ballCurrentPosition, angle, quadrant, outside, targetX, targetBallPosition, borderTouch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        running = true;
                        console.log('reset ball');
                        ballCurrentPosition = reset();
                        moveBall(ballCurrentPosition);
                        angle = Math.PI / 8 + Math.random() * Math.PI / 8;
                        quadrant = Math.floor(Math.random() * 4);
                        outside = false;
                        _a.label = 1;
                    case 1:
                        targetX = (quadrant === 0 || quadrant === 1) ? clientSize.width - ballSize.width : 0;
                        targetBallPosition = {
                            x: targetX,
                            y: ballCurrentPosition.y + Math.tan(angle) * Math.abs(targetX - ballCurrentPosition.x) * ((quadrant === 0 || quadrant === 3) ? -1 : 1)
                        };
                        return [4 /*yield*/, animateBall(ballCurrentPosition, targetBallPosition)];
                    case 2:
                        borderTouch = _a.sent();
                        // Based on where the ball touched the browser window, we change the new target quadrant.
                        // Note that in this solution the angle stays the same.
                        outside = false;
                        switch (borderTouch.touchDirection) {
                            case Direction.left:
                                rightPoint++;
                                running = server.sendRightPoints(rightPoint);
                                outside = true;
                                break;
                            case Direction.right:
                                leftPoint++;
                                running = server.sendLeftPoints(leftPoint);
                                outside = true;
                                break;
                            case Direction.top:
                                quadrant = (quadrant === 0) ? 1 : 2;
                                break;
                            case Direction.bottom:
                                quadrant = (quadrant === 2) ? 3 : 0;
                                break;
                            case Direction.leftPaddle:
                                quadrant = (quadrant === 2) ? 1 : 0;
                                break;
                            case Direction.rightPaddle:
                                quadrant = (quadrant === 0) ? 3 : 2;
                                break;
                            default:
                                throw new Error('Invalid direction, should never happen');
                        }
                        // The touch position is the new current position of the ball.
                        // Note that we fix the position here slightly in case a small piece of the ball has reached an area
                        // outside of the visible browser window.
                        ballCurrentPosition.x = Math.min(Math.max(borderTouch.touchPosition.x - ballHalfSize.width, 0) + ballHalfSize.width, clientSize.width);
                        ballCurrentPosition.y = Math.min(Math.max(borderTouch.touchPosition.y - ballHalfSize.height, 0) + ballHalfSize.height, clientSize.height);
                        _a.label = 3;
                    case 3:
                        if (!outside) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        if (running) {
                            game();
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    function animateBall(currentBallPosition, targetBallPosition) {
        // Calculate x and y distances from current to target position
        var distanceToTarget = subtractPoints(targetBallPosition, currentBallPosition);
        // Use Pythagoras to calculate distance from current to target position
        var distance = Math.sqrt(distanceToTarget.width * distanceToTarget.width + distanceToTarget.height * distanceToTarget.height);
        // Variable defining the speed of the animation (pixels that the ball travels per interval)
        var pixelsPerInterval = 1;
        // Calculate distance per interval
        var distancePerInterval = splitSize(distanceToTarget, distance * pixelsPerInterval);
        // Return a promise that will resolve when animation is done
        return new Promise(function (res) {
            // Start at current ball position
            var animatedPosition = currentBallPosition;
            // Move point every 4ms
            var interval = setInterval(function () {
                // Move animated position by the distance it has to travel per interval
                animatedPosition = movePoint(animatedPosition, distancePerInterval);
                // Move the ball to the new position
                moveBall(animatedPosition);
                // Check if the ball touches the browser window's border
                var touchDirection;
                if (overlaps(leftPaddle, animatedPosition, paddleWidth, paddleHeight, paddleLeft, ballSize)) {
                    console.log('left');
                    touchDirection = Direction.leftPaddle;
                }
                if (overlaps(rightPaddle, animatedPosition, paddleWidth, paddleHeight, (clientWidth - paddleLeft), ballSize)) {
                    console.log('right');
                    touchDirection = Direction.rightPaddle;
                }
                if ((animatedPosition.x - ballHalfSize.width) < 0) {
                    touchDirection = Direction.left;
                }
                if ((animatedPosition.y - ballHalfSize.height) < 0) {
                    touchDirection = Direction.top;
                }
                if ((animatedPosition.x + ballHalfSize.width) > clientSize.width) {
                    touchDirection = Direction.right;
                }
                if ((animatedPosition.y + ballHalfSize.height) > clientSize.height) {
                    touchDirection = Direction.bottom;
                }
                if (touchDirection !== undefined) {
                    // Ball touches border -> stop animation
                    clearInterval(interval);
                    res({ touchPosition: animatedPosition, touchDirection: touchDirection });
                }
            }, 4);
        });
    }
    /** Move the center of the ball to given position **/
    function moveBall(targetPosition) {
        // Note the 'px' at the end of the coordinates for CSS. Don't
        // forget it. Without the 'px', it doesn't work.
        var leftPos = targetPosition.x - ballHalfSize.width;
        var topPos = targetPosition.y - ballHalfSize.height;
        server.sendBallPosition(leftPos, topPos);
    }
    /** Subtracts two points and returns the size between them */
    function subtractPoints(a, b) {
        return {
            width: a.x - b.x,
            height: a.y - b.y
        };
    }
    /** Moves a point by the given size */
    function movePoint(p, s) {
        return {
            x: p.x + s.width,
            y: p.y + s.height
        };
    }
    /** Divides the width and height of the given size by the given divider */
    function splitSize(s, divider) {
        return {
            width: s.width / divider,
            height: s.height / divider
        };
    }
};
exports.ballFunction = ballFunction;
var overlaps = (function () {
    function getPositions(top, width, height, left) {
        return [[left, left + width], [top, top + height]];
    }
    function comparePositions(p1, p2) {
        var r1, r2;
        r1 = p1[0] < p2[0] ? p1 : p2;
        r2 = p1[0] < p2[0] ? p2 : p1;
        return r1[1] > r2[0] || r1[0] === r2[0];
    }
    return function (a, b, width, height, left, ballSize) {
        var pos1 = getPositions(a, width, height, left);
        var pos2 = getPositions(b.y, ballSize.width, ballSize.height, b.x);
        return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
    };
})();
function setLeftPaddle(code) {
    leftPaddle = code;
}
exports.setLeftPaddle = setLeftPaddle;
function setRightPaddle(code) {
    rightPaddle = code;
}
exports.setRightPaddle = setRightPaddle;
