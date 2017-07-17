var MainLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var size = cc.winSize;

        var background = new cc.Sprite(res.background_png);
        background.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(background, z_index_background);

        var logo = new cc.Sprite(res.game_name_png);
        logo.attr({
            x: size.width / 2,
            y: size.height / 2 + 150
        });
        this.addChild(logo, z_index_label);

        var play_button = new cc.Sprite(res.play_button_png);
        play_button.attr({
            x: size.width / 2,
            y: size.height / 2 - 150
        });
        this.addChild(play_button, z_index_button);

        this._floor = new cc.Sprite(res.road_base_png);
        this._floor.setPosition(0, 0);
        this._floor.setAnchorPoint(0, 0);
        this.addChild(this._floor, z_index_floor);

        this._bird = new BirdSprite(res.bird1_png);
        this._bird.x = bird_startX;
        this._bird.y = size.height / 2;
        this._bird.topOfScreen = size.height;
        this._bird.Reset();
        this.addChild(this._bird, z_index_bird);

        return true;
    },

    onEnter: function () {
        this._super();
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMove: this.onTouchMove,
            onTouchEnded: this.onTouchEnded,
        }, this);

        this.schedule(this.onTick);
    },

    onTick: function (dt) {
        if (this._bird.y < this._floor.height) {
            this._bird.Reset();
            this._bird.y = cc.winSize.height / 2;
        }
        this._bird.UpdateBird(dt);
    },

    onTouchBegan: function (touch, event) {
        var tp = touch.getLocation();
        var tar = event.getCurrentTarget();
        console.log('onTouchBegan : ' + tp.x.toFixed(2) + ' , ' + tp.y.toFixed(2));

        if (tar._bird.state == bird_state_stopped) {
            tar._bird.state = bird_state_moving;
        }
        tar._bird.SetStartSpeed();

        return false;
    },

    onTouchMove: function (touch, event) {
        var tp = touch.getLocation();
        console.log('onTouchMove : ' + tp.x.toFixed(2) + ' , ' + tp.y.toFixed(2));
        return true;
    },

    onTouchEnded: function (touch, event) {
        var tp = touch.getLocation();
        console.log('onTouchEnded : ' + tp.x.toFixed(2) + ' , ' + tp.y.toFixed(2));
        return true;
    }
});

MainLayer.create = function () {
    var sg = new MainLayer();
    if (sg && sg.init(cc.c4b(255, 255, 255, 255))) {
        return sg;
    }
    return null;
};

MainLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = MainLayer.create();
    scene.addChild(layer);
    return scene;
};