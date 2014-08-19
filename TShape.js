/**
 * TShape.js
 *
 * Copyright (c) v416 http://twitter.com/v416
 * This source is The MIT License.
 * TShape.drawPoly is forked from phi's code. http://jsdo.it/phi/ihTJ
 *
 * @version 1.03 (2013/10/07)
 * @requires enchant.js v0.5.0 or later
 *
 * @description
 * enchant.js extension plugin
 *
 * enchant.js:
 * http://enchantjs.com
 *
 * @example
 * Please read main.js that are enclosed in TShape.js
 */
TShape = enchant.Class.create({});
//描画タイプ
TShape.FILL   = 'fill';     //塗りつぶし
TShape.STROKE = 'stroke';   //枠
TShape.PENT   = '5';        //五芒星
TShape.HEXA   = '6';        //六芒星
TShape.EIGHT  = '8';        //八芒星
/**
 * xとyを中心座標とした半径radiusの円/円弧をsurfaceに描画する。
 * @param surface 描画先Surface
 * @param x 円の中心座標
 * @param y 円の中心座標
 * @param radius 半径
 * @param color 描画色
 * @param drawType 描画タイプ
 */
TShape.drawCircle = function(surface, x, y, radius, color, drawType) {
    //with(surface.context) {
    surface.context.fillStyle = surface.context.strokeStyle = color;
    surface.context.beginPath();
    surface.context.arc(x, y, radius, 0, Math.PI*2, false);
    surface.context.closePath();
    drawType == TShape.FILL ? surface.context.fill() : surface.context.stroke();
    //}
};
/**
 * xとyを中心座標とした半径radiusの円をsurfaceに描画する。
 * @param surface 描画先Surface
 * @param color 描画色
 * @param x 円の中心座標（省略時はsurface幅の中心）
 * @param y 円の中心座標（省略時はsurface高の中心）
 * @param radius 半径（省略時はsurface幅、もしくは高の中心）
 */
TShape.fillCircle = function(surface, color, x, y, radius) {
    x = x == undefined ? surface.width / 2 : x;
    y = y == undefined ? surface.height / 2 : y;
    radius = radius == undefined ? (surface.width < surface.height ? surface.width / 2 : surface.height / 2) : radius;
    TShape.drawCircle(surface, x, y, radius, color, TShape.FILL);
};
/**
 * xとyを中心座標とした半径radiusの円弧をsurfaceに描画する。
 * @param surface 描画先Surface
 * @param color 描画色
 * @param x 円の中心座標（省略時はsurface幅の中心）
 * @param y 円の中心座標（省略時はsurface高の中心）
 * @param radius 半径（省略時はsurface幅、もしくは高の中心）
 */
TShape.strokeCircle = function(surface, color, x, y, radius) {
    x = x == undefined ? surface.width / 2 : x;
    y = y == undefined ? surface.height / 2 : y;
    radius = radius == undefined ? (surface.width < surface.height ? surface.width / 2 : surface.height / 2) : radius;
    TShape.drawCircle(surface, x, y, radius-1, color, TShape.STROKE);
};
/**
 * xとyを中心座標とした半径radiusの円に内接した多角形/多角形枠をsurfaceに描画する。
 *  forked from phi's code http://jsdo.it/phi/ihTJ
 * @param surface 描画先Surface
 * @param x 円の中心座標
 * @param y 円の中心座標
 * @param radius 半径
 * @param sides 辺の数
 * @param color 描画色
 * @param drawType 描画タイプ
 * @param offsetAngle 角度(省略時は270°)
 */
TShape.drawPoly = function(surface, x, y, radius, sides, color, drawType, offsetAngle) {
    // 内角
    var radDiv = (Math.PI*2)/sides;
    // 回転オフセット(省略時は270°)
    var radOffset = (offsetAngle!=undefined) ? offsetAngle*Math.PI/180 : -Math.PI/2;
    // パス描画
//    with(surface.context) {
    surface.context.fillStyle = surface.context.strokeStyle = color;
    surface.context.moveTo(x + Math.cos(radOffset)*radius, y + Math.sin(radOffset)*radius);
    for (var i=1; i<sides; ++i) {
        var rad = radDiv*i+radOffset;
        surface.context.lineTo(
            x + Math.cos(rad)*radius,
            y + Math.sin(rad)*radius
        );
    }
    surface.context.closePath();
    drawType == TShape.FILL ? surface.context.fill() : surface.context.stroke();
//    }
};
/**
 * xとyを中心座標とした半径radiusの円に内接した多角形をsurfaceに描画する。
 * @param surface 描画先Surface
 * @param color 描画色
 * @param sides 辺の数
 * @param x 円の中心座標（省略時はsurface幅の中心）
 * @param y 円の中心座標（省略時はsurface高の中心）
 * @param radius 半径（省略時はsurface幅、もしくは高の中心）
 */
TShape.fillPoly = function(surface, color, sides, x, y, radius) {
    x = x == undefined ? surface.width / 2 : x;
    y = y == undefined ? surface.height / 2 : y;
    radius = radius == undefined ? (surface.width < surface.height ? surface.width / 2 : surface.height / 2) : radius;
    TShape.drawPoly(surface, x, y, radius, sides, color, TShape.FILL);
};
/**
 * xとyを中心座標とした半径radiusの円に内接した多角形枠をsurfaceに描画する。
 * @param surface 描画先Surface
 * @param color 描画色
 * @param sides 辺の数
 * @param x 円の中心座標（省略時はsurface幅の中心）
 * @param y 円の中心座標（省略時はsurface高の中心）
 * @param radius 半径（省略時はsurface幅、もしくは高の中心）
 */
TShape.strokePoly = function(surface, color, sides, x, y, radius) {
    x = x == undefined ? surface.width / 2 : x;
    y = y == undefined ? surface.height / 2 : y;
    radius = radius == undefined ? (surface.width < surface.height ? surface.width / 2 : surface.height / 2) : radius;
    TShape.drawPoly(surface, x, y, radius-1, sides, color, TShape.STROKE);
};
/**
 * pathで指定した図形/図形枠をsurfaceに描画する。
 * @param surface 描画先Surface
 * @param path 図形のパス
 * @param color 描画色
 * @param drawType 描画タイプ
 */
TShape.drawPath = function(surface, path, color, drawType) {
    //with(surface.context) {
    surface.context.fillStyle = surface.context.strokeStyle = color;
    var p = path.shift();
    surface.context.beginPath();
    surface.context.moveTo(p.x, p.y);
    while (0 < path.length) {
        p = path.shift();
        surface.context.lineTo(p.x, p.y);
    }
    surface.context.closePath();
    drawType == TShape.FILL ? surface.context.fill() : surface.context.stroke();
    //}
};
/**
 * xとyを左上端の座標とし、幅width、高さheightの四角形/四角形枠をsurfaceに描画する。
 * @param surface 描画先Surface
 * @param x 描画開始座標
 * @param y 描画開始座標
 * @param width 描画幅
 * @param height 描画高
 * @param color 描画色
 * @param drawType 描画タイプ
 */
TShape.drawRect = function(surface, x, y, width, height, color, drawType) {
    var path = [
        {x:x, y:y},
        {x:x+width, y:y},
        {x:x+width, y:y+height},
        {x:x, y:y+height}
    ];
    TShape.drawPath(surface, path, color, drawType);
};
/**
 * xとyを左上端の座標とし、幅width、高さheightの四角形をsurfaceに描画する。
 * @param surface 描画先Surface
 * @param x 描画開始座標
 * @param y 描画開始座標
 * @param width 描画幅
 * @param height 描画高
 * @param color 描画色
 */
TShape.fillRect = function(surface, color, x, y, width, height) {
    TShape.drawRect(surface, x, y, width, height, color, TShape.FILL);
};
/**
 * xとyを左上端の座標とし、幅width、高さheightの四角形枠をsurfaceに描画する。
 * @param surface 描画先Surface
 * @param x 描画開始座標
 * @param y 描画開始座標
 * @param width 描画幅
 * @param height 描画高
 * @param color 描画色
 */
TShape.strokeRect = function(surface, color, x, y, width, height) {
    TShape.drawRect(surface, x+1, y+1, width-2, height-2, color, TShape.STROKE);
};
/**
 * surfaceを描画色colorで塗りつぶす
 * @param surface 描画先Surface
 * @param color 描画色
 */
TShape.fill = function(surface, color) {
    TShape.fillRect(surface, color, 0, 0, surface.width, surface.height);
};
/**
 * surfaceを描画色colorで縁取る
 * @param surface 描画先Surface
 * @param color 描画色
 */
TShape.stroke = function(surface, color) {
    TShape.strokeRect(surface, color, 0, 0, surface.width, surface.height);
};
/**
 * xとyを中心座標とした半径radiusの円に内接した星形/星形枠をsurfaceに描画する。
 * @param surface 描画先Surface
 * @param x 円の中心座標
 * @param y 円の中心座標
 * @param radius 半径
 * @param sides 辺の数
 * @param color 描画色
 * @param drawType 描画タイプ
 */
TShape.drawStar = function(surface, x, y, radius, sides, color, drawType) {
    switch (sides) {
        case TShape.PENT:
            var _path = [
                {x:x + Math.cos(-Math.PI/2)*radius, y:y + Math.sin(-Math.PI/2)*radius}
            ];
            for (var i=1; i<5; ++i) {
                var rad = (Math.PI*2)/5*i+(-Math.PI/2);
                _path.push({
                    x:x + Math.cos(rad)*radius,
                    y:y + Math.sin(rad)*radius
                });
            };
            var path = [
                _path[0], _path[2], _path[4], _path[1], _path[3]
            ];
            TShape.drawPath(surface, path, color, drawType);
            break;
        case TShape.HEXA:
            TShape.drawPoly(surface, x, y, radius, 3, color, drawType);
            surface.context.transform(
                1.0,
                0.0,
                0.0,
                -1.0,
                0,
                surface.height
            );
            TShape.drawPoly(surface, x, y, radius, 3, color, drawType);
            break;
        case TShape.EIGHT:
            TShape.drawPoly(surface, x, y, radius, 4, color, drawType);
            surface.context.translate(surface.width/2, surface.height/2);
            surface.context.rotate(45/180*Math.PI);
            surface.context.translate(-radius, -radius);
            TShape.drawPoly(surface, x, y, radius, 4, color, drawType);
            break;
    }
};
/**
 * xとyを中心座標とした半径radiusの円に内接した星形をsurfaceに描画する。
 * @param surface 描画先Surface
 * @param color 描画色
 * @param sides 辺の数
 * @param x 円の中心座標（省略時はsurface幅の中心）
 * @param y 円の中心座標（省略時はsurface高の中心）
 * @param radius 半径（省略時はsurface幅、もしくは高の中心）
 */
TShape.fillStar = function(surface, color, sides, x, y, radius) {
    x = x == undefined ? surface.width / 2 : x;
    y = y == undefined ? surface.height / 2 : y;
    radius = radius == undefined ? (surface.width < surface.height ? surface.width / 2 : surface.height / 2) : radius;
    TShape.drawStar(surface, x, y, radius, sides, color, TShape.FILL);
};
/**
 * xとyを中心座標とした半径radiusの円に内接した星形枠をsurfaceに描画する。
 * @param surface 描画先Surface
 * @param color 描画色
 * @param sides 辺の数
 * @param x 円の中心座標（省略時はsurface幅の中心）
 * @param y 円の中心座標（省略時はsurface高の中心）
 * @param radius 半径（省略時はsurface幅、もしくは高の中心）
 */
TShape.strokeStar = function(surface, color, sides, x, y, radius) {
    x = x == undefined ? surface.width / 2 : x;
    y = y == undefined ? surface.height / 2 : y;
    radius = radius == undefined ? (surface.width < surface.height ? surface.width / 2 : surface.height / 2) : radius;
    TShape.drawStar(surface, x, y, radius, sides, color, TShape.STROKE);
};
